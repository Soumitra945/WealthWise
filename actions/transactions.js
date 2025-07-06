"use server"

import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const serializeAmount = (obj) => ({
  ...obj,
  amount: obj.amount.toNumber(),
});


export async function updateTransaction(id, data) {
  try {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const originalTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId: user.id,
      },
      include: {
        account: true,
      }
    });

    if (!originalTransaction) throw new Error("Transaction not found");

    // Calculate the old balance change
    const oldBalanceChange = 
      originalTransaction.type === "EXPENSE" 
        ? -originalTransaction.amount.toNumber() 
        : originalTransaction.amount.toNumber();

    // Calculate the new balance change
    const newBalanceChange = 
      data.type === "EXPENSE" ? -data.amount : data.amount;
      
    // Calculate the net change needed
    const netBalanceChange = newBalanceChange - oldBalanceChange;

    // Calculate the new account balance
    const newAccountBalance = originalTransaction.account.balance.toNumber() + netBalanceChange;

    const transaction = await db.$transaction(async (tx) => {
      // UPDATE the existing transaction instead of creating a new one
      const updatedTransaction = await tx.transaction.update({
        where: { id },
        data: {
          ...data,
          userId: user.id,
          nextRecurringDate: data.isRecurring && data.recurringInterval 
            ? calculateNextRecurringDate(data.date, data.recurringInterval) 
            : null,
        },
      });

      // Update the account balance
      await tx.account.update({
        where: { id: data.accountId },
        data: { balance: newAccountBalance },
      });

      return updatedTransaction;
    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    return { success: true, data: serializeAmount(transaction) };

  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createTransaction(data){

    try{
        const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const req=await request();

    const decision=await aj.protect(req, {
      userId,
      requested:1,
    });

    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        const {remaining,reset}=decision.reason;
        console.error({
          code:"RATE_LIMIT_EXCEEDED",
          details:{
            remaining,
            resetInSeconds:reset,
          },
        });
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      throw new Error("Too many requests. Please try again later.");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const account=await db.account.findUnique({
        where:{
            id:data.accountId,
            userId:user.id,
        },
    });

    if(!account) throw new Error("Account not found");

    const balanceChange=data.type==="EXPENSE" ? -data.amount : data.amount;
    const newBalance=account.balance.toNumber()+balanceChange;

    const transaction=await db.$transaction(async(tx)=>{
        const newTransaction=await tx.transaction.create({
            data:{
                ...data,
                userId:user.id,
                nextRecurringDate:data.isRecurring && data.recurringInterval?calculateNextRecurringDate(data.date,data.recurringInterval):null,

            },
        });

        await tx.account.update({
            where: {id:data.accountId},
            data:{balance:newBalance},
        })

        return newTransaction;

    });

    revalidatePath("/dashboard");
    revalidatePath(`/account/${transaction.accountId}`);

    return {success:true, data: serializeAmount(transaction)};
        
    }catch(error){
        throw new Error(error.message);
    }

}


function calculateNextRecurringDate(startDate, interval) {
    const date = new Date(startDate);
  
    switch (interval) {
      case "DAILY":
        date.setDate(date.getDate() + 1);
        break;
      case "WEEKLY":
        date.setDate(date.getDate() + 7);
        break;
      case "MONTHLY":
        date.setMonth(date.getMonth() + 1);
        break;
      case "YEARLY":
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
  
    return date;
}

export async function scanReceipt(file) {
  try {
      console.log("scanReceipt function called with file:", file);        
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const arrayBuffer = await file.arrayBuffer();
      const base64string = Buffer.from(arrayBuffer).toString("base64");

      const prompt = `
        Analyze this receipt image and extract the following information in JSON format:
        - Total amount (just the number)
        - Date (in ISO format)
        - Description or items purchased (brief summary)
        - Merchant/store name
        - Category ID that matches one of these categories: housing, transportation, groceries, utilities, entertainment, food, shopping, healthcare, education, personal, travel, insurance, gifts, bills, other-expense
        
        Only respond with valid JSON in this exact format:
        {
          "amount": number,
          "date": "ISO date string",
          "description": "string",
          "merchantName": "string",
          "category": "string"
        }

        If it's not a receipt, return an empty object: {}
      `;

      const result = await model.generateContent([
          {
              inlineData: {
                  data: base64string,
                  mimeType: file.type,
              },
          },
          prompt,
      ]);

      const response = await result.response;
      const text = response.text();

      console.log("Raw AI Response:", text);

      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      try {
          const data = JSON.parse(cleanedText);
          
          // Check if it's an empty object (not a receipt)
          if (Object.keys(data).length === 0) {
              throw new Error("No receipt detected in the image. Please upload a clear receipt image.");
          }

          // Validate required fields
          if (!data.amount || !data.date) {
              throw new Error("Unable to extract required information from receipt. Please try again with a clearer image.");
          }

          const result = {
              amount: parseFloat(data.amount),
              date: new Date(data.date),
              description: data.description || "Receipt purchase",
              category: data.category || null,
              merchantName: data.merchantName || "Unknown merchant",
          };

          console.log("Processed receipt data:", result);
          return result;

      } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError);
          throw new Error("Failed to parse AI response. Please ensure the receipt is clear and try again.");
      }
      
  } catch (error) {
      console.error("Receipt scan error:", error);
      throw new Error("Failed to scan receipt: " + error.message);
  }
}

export async function getTransaction(id) {
  try {
    console.log("getTransaction called with ID:", id, "Type:", typeof id);
    
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Validate ID exists and is not empty
    if (!id || id === 'undefined' || id === 'null' || id === '') {
      throw new Error("Invalid transaction ID");
    }

    // Convert to string and trim whitespace (for string IDs like UUIDs)
    const transactionId = String(id).trim();
    
    if (!transactionId) {
      throw new Error("Invalid transaction ID format");
    }

    console.log("Searching for transaction with ID:", transactionId, "User ID:", user.id);

    // Find the transaction using string ID
    const transaction = await db.transaction.findUnique({
      where: { 
        id: transactionId, // Use string ID directly
      },
      include: {
        account: true,
      }
    });

    console.log("Transaction found:", transaction);

    if (!transaction) throw new Error("Transaction not found");

    // Check if it belongs to the user
    if (transaction.userId !== user.id) {
      throw new Error("Transaction not found"); // Don't reveal it exists for security
    }

    return serializeAmount(transaction);
  } catch (error) {
    console.error("getTransaction error:", error);
    throw new Error(error.message);
  }
}

