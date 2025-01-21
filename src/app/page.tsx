import DashboardSummary from '@/components/DashboardSummary';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardSummary />
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <TransactionForm />
        </div>
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionList />
        </div>
      </div>
    </main>
  );
}