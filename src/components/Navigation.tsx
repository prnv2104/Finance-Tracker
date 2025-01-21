import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className="text-xl font-bold">
          FinanceTracker
        </Link>
        
        <div className="space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/transactions">Transactions</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/budgets">Budgets</Link>
        </div>
      </div>
    </nav>
  );
}