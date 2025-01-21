'use client';

import { useState } from 'react';

export default function TransactionForm() {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'EXPENSE',
    description: '',
    date: new Date().toISOString().split('T')[0],
    categoryId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`Server error: ${JSON.stringify(data)}`);
      }

      console.log('Success:', data);
      setFormData({
        amount: '',
        type: 'EXPENSE',
        description: '',
        date: new Date().toISOString().split('T')[0],
        categoryId: '',
      });
      window.location.reload(); // Temporary solution to refresh the page
      // For a better solution, you could use React state management or props

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full p-2 border rounded bg-white text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded bg-white text-gray-900"
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded bg-white text-gray-900"
          required
        />
      </div>

      <div>
        <label className="block mb-2">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full p-2 border rounded bg-white text-gray-900"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-medium"
      >
        Add Transaction
      </button>
    </form>
  );
}