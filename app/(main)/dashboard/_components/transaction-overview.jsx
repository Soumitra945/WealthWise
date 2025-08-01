"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import React, { useState } from 'react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';


const colors=[
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#ffbb28",
    "#00C49F",
    "#FF8042",
    "#FFBB28",
]

const DashboardOverview = ({accounts,transactions}) => {

    const [selectedAccountId,setSelectedAccountId] = useState(accounts.find((a)=>a.isDefault)?.id || accounts[0]?.id);
    
    const accountTransactions = transactions.filter(
        (t) => t.accountId === selectedAccountId
      );

    const recentTransactions=accountTransactions.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);

    const currentDate=new Date();
    const currentMonthExpenses=accountTransactions.filter((t)=>{
        const transactionDate=new Date(t.date);
        return(
            t.type==="EXPENSE" &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
        );
    });

    const expensesByCategory=currentMonthExpenses.reduce((acc,transaction)=>{
        const category=transaction.category;
        if(!acc[category]){
            acc[category]=0;
        }
        acc[category]+=transaction.amount;
        return acc;
    },{});

    const piechartData=Object.entries(expensesByCategory).map(([category,amount])=>({
            name:category,
            value:amount,
    }));
    console.log(piechartData);
        
  return (
    <div className='grid gap-4 md:grid-cols-2'>
        <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
                <CardTitle className="text-base font-normal">
                    Recent Transactions
                </CardTitle>
                <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                        {accounts.map((account)=>(
                            <SelectItem key={account.id} value={account.id}>
                                {account.name.charAt(0).toUpperCase() + account.name.slice(1)} ({account._count.transactions})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div>
                    {
                        recentTransactions.map((transaction)=>{
                            return (<div
                                key={transaction.id}
                                className="flex items-center justify-between"
                            >
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {transaction.description || "Untitled Transaction"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(transaction.date),"PP")}
                                </p>
                            </div>
                                <div className={cn("flex items-center",
                                    transaction.type==="EXPENSE"
                                    ? "text-red-500"
                                    : "text-green-500"
                                )}
                                >
                                    {transaction.type==="EXPENSE"?(
                                        <ArrowDownRight className="mr-1 h-4 w-4" />
                                    ):(
                                        <ArrowUpRight className="mr-1 h-4 w-4" />
                                    )}
                                    ${transaction.amount.toFixed(2)}
                                </div>
                            </div>)
                        })
                    }
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Monthly Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    piechartData.length===0 ? (
                        <p className="text-center text-muted-foreground py-4">
                            No expenses recorded for this month.
                        </p>
                    ):(
                        <div style={{ width: '100%', height: '200px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={piechartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label={({name,value})=>`${name}:$${value.toFixed(2)}`}>
                                    {
                                        piechartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
                                        ))
                                    }
                                    </Pie>
                                    <Legend></Legend>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )
                }
            </CardContent>
        </Card>

    </div>
  )
}

export default DashboardOverview
