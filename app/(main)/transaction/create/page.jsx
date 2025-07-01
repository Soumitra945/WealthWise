import { defaultCategories } from '@/data/categories'
import React from 'react'
import AddTransactionForm from '../_components/transaction-form'

const AddTransactionPage = () => {
  return (
    <div className="mt-24 ml-11">
      <div className="text-5xl gradient-title mb-8">
        Add transactions
      </div>

      <AddTransactionForm acconts={accounts} categories={defaultCategories}/>

    </div>
  )
}

export default AddTransactionPage
