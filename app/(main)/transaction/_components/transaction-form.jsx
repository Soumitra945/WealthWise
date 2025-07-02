"use client"

import { createTransaction } from '@/actions/transactions'
import { transactionSchema } from '@/app/lib/schema'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CreateAccountDrawer } from '@/components/ui/create-account-drawer'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import useFetch from '@/hooks/use-fetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const AddTransactionForm = ({accounts,categories}) => {

  const router=useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState:{errors},
    watch,
    getValues,
    reset,
  }=useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'EXPENSE',
      amount: '',
      description: '',
      accountId: accounts.find((ac)=>ac.isDefault)?.id,
      date: new Date(),
      isRecurring: false,
    },
  });

  const{
    loading:transactionLoading,
    fn:transactionFn,
    data:transactionResult,
  }=useFetch(createTransaction);

  const type=watch("type");
  const isRecurring=watch("isRecurring");
  const date=watch("date");
  
  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  const onSubmit=async (date)=>{
    const formData={
      ...data,
      amount: parseFloat(data.amount),
    };
    transactionFn(FormData);
  };

  useEffect(()=>{
    if(transactionResult?.success && !transactionLoading){
      toast.success("Transaction created successfully");
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* AI Receipt Scanner */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={type}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">Expense</SelectItem>
            <SelectItem value="INCOME">Income</SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount</label>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("amount")}
            className="w-full"
          />
          {errors.type &&(
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Account</label>
          <Select onValueChange={(value)=>setValue("accountId",value)} 
          defaultValue={getValues("accountId")}  
          >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
              {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} (${parseFloat(account.balance).toFixed(2)})
                    </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button variant="ghost" className="w-full items-center select-none text-sm outline-none">Create Account</Button>
              </CreateAccountDrawer>
              </SelectContent> 
          </Select>
          {errors.accountId &&(
            <p className="text-sm text-red-500">{errors.accountId.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue={getValues("category")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent position='bottom'>
          {filteredCategories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
          <Input placeholder="Enter description" {...register("description")} />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between rounded-lg border p-3">
          <div className="space-y-0.5">
            <label
              htmlFor="isDefault"
              className="text-base font-medium cursor-pointer"
            >
              Recurring Transaction
            </label>
            <p className="text-sm text-muted-foreground">
              Set up a recurring schedule for this transaction
            </p>
          </div>
          <Switch
            id="isRecurring"
            checked={watch("isRecurring")}
            onCheckedChange={(checked) => setValue("isRecurring", checked)}
          />
      </div>
      
      {isRecurring && (<div className="space-y-2">
        <label className="text-sm font-medium">Recurring Interval</label>
        <Select
          onValueChange={(value) => setValue("recurringInterval", value)}
          defaultValue={getValues("recurringInterval")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select interval" />
          </SelectTrigger>
          <SelectContent position='bottom'>
            <SelectItem value="DAILY">Daily</SelectItem>
            <SelectItem value="WEEKLY">Weekly</SelectItem>
            <SelectItem value="MONTHLY">Monthly</SelectItem>
            <SelectItem value="YEARLY">Yearly</SelectItem>
          </SelectContent>
        </Select>
        {errors.recurringInterval && (
          <p className="text-sm text-red-500">{errors.recurringInterval.message}</p>
        )}
      </div> 
      )}

      <div className="flex gap-4">
        <Button 
          type="Button"
          variant="outline"
          className="w-full"
          onClick={()=>router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full" disabled={transactionLoading}
        >Create transaction</Button>
      </div>

    </form>
  );
};

export default AddTransactionForm
