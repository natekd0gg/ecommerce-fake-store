import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products: Product[] = await response.json();

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
