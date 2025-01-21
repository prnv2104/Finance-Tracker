import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Transaction } from '@prisma/client';

interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    
    const summary: Summary = transactions.reduce((acc: Summary, transaction: Transaction) => {
      if (transaction.type === 'INCOME') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    }, {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
    });

    summary.balance = summary.totalIncome - summary.totalExpenses;
    
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}