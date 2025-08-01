import { getUserAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from './_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from './_components/account-chart';

const AccountsPage=async ({params})=>{

  const accountData=await getUserAccountWithTransactions(params.id);

  if(!accountData){
    notFound();
  }

    const {transactions,...account}=accountData;
    
    const formattedType = account.type
    ? account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase()
    : 'Unknown';

  return (
    <div>
        <div className="mt-25 ml-25 font-sm text-red-500">
            <div className="space-y-8 px-5">
                <div className="flex gap-4 items-end justify-between">
                    <div>
                        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
                            {account.name}
                        </h1>
                        <p className="text-white mt-2 mb-2">
                            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
                                Account
                        </p>
                    </div>

                    <div className="text-right pb-2 mr-25 mt-2 mb-2">
                        <div className="text-xl sm:text-2xl font-bold">
                            ${parseFloat(account.balance).toFixed(2)}
                        </div>
                        <p className="text-sm text-white">
                            {account._count.transactions} Transactions
                        </p>
                    </div>
                </div>
            </div>  
        </div>

        {/*Chart section*/}

        <Suspense
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
            <AccountChart className="m-25" transactions={transactions} />
        </Suspense>

        {/* Transactions Table */}
        <Suspense
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
            <TransactionTable transactions={transactions} />
        </Suspense>

    </div>
    
  )
}

export default AccountsPage;
    