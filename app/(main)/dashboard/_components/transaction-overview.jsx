"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react'

const DashboardOverview = ({accounts,transactions}) => {

    const [selectedAccountId,setSelectedAccountId] = useState(accounts.find((a)=>a.isDefault)?.id || accounts[0]?.id);
    
    const accountTransactions = transactions.filter(
        (t) => t.accountId === selectedAccountId
      );

    const recentTransctions=accountTransactions.sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);



  return (
    <div className='grid gap-4 md:grid-cols-2'>
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-normal">
                    Transaction Overview
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>

    </div>
  )
}

export default DashboardOverview
