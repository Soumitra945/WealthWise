import { defaultCategories } from '@/data/categories'
import React from 'react'
import AddTransactionForm from '../_components/transaction-form'
import { getUserAccounts } from '@/actions/dashboard'

export default async function AddTransactionPage({searchParams}){

  const accounts=await getUserAccounts();

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
      <h1 className="text-6xl font-bold gradient-title">Add Transaction</h1>
      </div>

      <AddTransactionForm accounts={accounts} categories={defaultCategories}/>

    </div>
  )
}
