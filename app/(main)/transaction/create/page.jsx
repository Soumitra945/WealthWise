import { defaultCategories } from '@/data/categories'
import React from 'react'
import { getUserAccounts } from '@/actions/dashboard'
import { AddTransactionForm } from '../_components/transaction-form';
import { getTransaction } from '@/actions/transactions';

const AddTransactionPage=async ({searchParams})=>{

  const accounts = await getUserAccounts();
  const editId = await searchParams?.edit;

  console.log('Edit ID:', editId);

  let initialData = null;
if (editId) {
  try {
    const transaction = await getTransaction(editId);

    initialData = {
      ...transaction,
      account: {
        ...transaction.account,
        balance: transaction.account.balance ? parseFloat(transaction.account.balance.toString()) : 0, // Convert Decimal to plain number
      },
    };
  } catch (error) {
    console.error('Error fetching transaction:', error.message);
    initialData = null;
  }
}

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">Add Transaction</h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  )
}

export default AddTransactionPage;