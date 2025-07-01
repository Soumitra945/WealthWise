
import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { sendEmail } from "@/actions/send-email";
import EmailTemplate from "@/emails/template";

export const checkBudgetAlert = inngest.createFunction(
  { id: "Check Budget Alerts" },
  { cron:"0 */6 * * *" },
  async ({ step }) => {
    const budgets=await step.run("fetch-Budgets",async()=>{
        return await db.budget.findMany({
            include:{
                user:{
                    include:{
                        accounts:{
                            where:{
                                isDefault:true,
                            },
                        },
                    },
                },
            },
        });
    });

    for(const budget of budgets){
        const defaultAccount=budget.user.accounts[0];
        if(!defaultAccount) continue;

        await step.run(`check-budget-${budget.id}`,async()=>{
            const startDate=new Date();
            startDate.setDate(1);

            const expenses=await db.transaction.aggregate({
                where:{
                    userId:budget.userId,
                    accountId:defaultAccount.id,
                    type:"EXPENSE",
                    date:{
                        gte:startDate,
                    },
                },
                _sum:{
                    amount:true,
                },
            });

            const totalExpenses = expenses._sum.amount?.toNumber() || 0; 
            const budgetAmount=budget.amount;
            const percentageUsed = (totalExpenses / budgetAmount) * 100;
            //console.log(`Budget ID: ${budget.id}, Percentage Used: ${percentageUsed}%`);

            if(percentageUsed>=80 && (!budget.lastAlertSent || isNewMonth(new Date(budget.lastAlertSent), new Date())))
            {
                await step.log("✅ Condition met. Sending email and updating lastAlertSent...");
                await sendEmail({
                    to: budget.user.email,
                    subject: `Budget Alert for ${defaultAccount.name}`,
                    react: EmailTemplate({
                      userName: budget.user.name,
                      type: "budget-alert",
                      data: {
                        percentageUsed,
                        budgetAmount: parseInt(budgetAmount).toFixed(1),
                        totalExpenses: parseInt(totalExpenses).toFixed(1),
                        accountName: defaultAccount.name,
                      },
                    }),
                  });
        
                  // Update last alert sent
                  await db.budget.update({
                    where: { id: budget.id },
                    data: { lastAlertSent: new Date()},
                  });
            }
        });
    }

  }
);

function isNewMonth(lastAlertDate, currentDate) {
  return (
    lastAlertDate.getFullYear() !== currentDate.getFullYear() ||
    lastAlertDate.getMonth() !== currentDate.getMonth()
  );
}
