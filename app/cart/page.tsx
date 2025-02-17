'use client';

import { useCart } from '@/components/CartContext';
import Container from '@/components/ui/Container';
import CartItem from './components/cart-items';
import Currency from '@/components/ui/Currency';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomButton from '@/components/ui/CustomButton';

const CartPage: React.FC = () => {
  const { cart, removeItemFromCart, removeAllItemsFromCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAllItemsFromCart();
      router.push('/');
    }
  }, [searchParams, removeAllItemsFromCart]);

  const totalPrice = cart.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  );

  const onCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart.map((item: any) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout', error);
    }
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart?.length === 0 && (
                <p className="text-neutral-500">No items added to cart</p>
              )}
              <ul>
                {cart?.map((item: any) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-x-gray-200 pt-4">
                  <div className="text-base font-medium text-gray-900">
                    Order Total
                  </div>
                  <Currency value={totalPrice} />
                </div>
              </div>
              <CustomButton
                disabled={cart?.length === 0}
                onClick={onCheckout}
                className="w-full mt-6"
              >
                Checkout
              </CustomButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
