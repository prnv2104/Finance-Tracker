'use client';
import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  date: Date;
  categoryId?: string; // Optional if not always provided
}

export default function DashboardSummary() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []); // Initial fetch

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  if (loading) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-emerald-100 border border-emerald-200 rounded shadow-sm">
        <h3 className="font-semibold text-emerald-900">Total Income</h3>
        <p className="text-xl text-emerald-700">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-rose-100 border border-rose-200 rounded shadow-sm">
        <h3 className="font-semibold text-rose-900">Total Expenses</h3>
        <p className="text-xl text-rose-700">${totalExpense.toFixed(2)}</p>
      </div>
      <div className="p-4 bg-sky-100 border border-sky-200 rounded shadow-sm">
        <h3 className="font-semibold text-sky-900">Balance</h3>
        <p className="text-xl text-sky-700">${balance.toFixed(2)}</p>
      </div>
    </div>
  );
}