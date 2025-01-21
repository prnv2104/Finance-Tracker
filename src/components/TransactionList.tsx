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

export default function TransactionList() {
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
    <div className="border rounded-lg bg-white shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 text-left font-semibold text-gray-900">Date</th>
            <th className="p-4 text-left font-semibold text-gray-900">Description</th>
            <th className="p-4 text-left font-semibold text-gray-900">Category</th>
            <th className="p-4 text-right font-semibold text-gray-900">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-700 bg-white">
                No transactions yet
              </td>
            </tr>
          ) : (
            transactions.slice(0, 10).map((transaction) => (
              <tr key={transaction.id} className="border-t bg-white hover:bg-gray-50">
                <td className="p-4 text-gray-900">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="p-4 text-gray-900">{transaction.description}</td>
                <td className="p-4 text-gray-900">{transaction.categoryId}</td>
                <td className={`p-4 text-right font-medium ${
                  transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
  // return (
  //   <div>
  //     <div>
  //       <h3>Balance: ${balance.toFixed(2)}</h3>
  //       <p>Income: ${totalIncome.toFixed(2)}</p>
  //       <p>Expenses: ${totalExpense.toFixed(2)}</p>
  //     </div>
  //     <h3>Recent Transactions</h3>
  //     <ul>
  //       {transactions.map((transaction) => (
  //         <li key={transaction.id}>
  //           {transaction.description} - ${transaction.amount}
  //           ({transaction.type})
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}