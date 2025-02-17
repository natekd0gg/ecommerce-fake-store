import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import type { CartItem } from '@/components/CartContext';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const { cartItems } = await req.json();

  if (!cartItems || cartItems.length === 0) {
    return new NextResponse('Cart items are required', { status: 400 });
  }

  const products: CartItem[] = await Promise.all(
    cartItems.map(async (item: { id: string; quantity: number }) => {
      const res = await fetch(`https://fakestoreapi.com/products/${item.id}`);
      const product = await res.json();
      return { ...product, quantity: item.quantity };
    })
  );

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    products.map((product) => ({
      quantity: product.quantity,
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
    }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
