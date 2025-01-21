import { NextResponse } from 'next/server';

// In-memory storage (for development only)
let transactions: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTransaction = {
      id: Date.now().toString(),
      ...body,
      date: new Date(body.date),
      amount: parseFloat(body.amount)
    };
    
    transactions.push(newTransaction);
    return NextResponse.json(newTransaction);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(transactions);
}