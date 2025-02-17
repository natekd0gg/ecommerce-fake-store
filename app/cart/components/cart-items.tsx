'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import Currency from '@/components/ui/Currency';
import { useCart } from '@/components/CartContext';
import IconButton from '@/components/ui/IconButton';
import type { CartItem } from '@/components/CartContext';

type CartItemProps = {
  data: CartItem;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { removeItemFromCart, addItemToCart, updateCartItemQuantity } =
    useCart();

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.image}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton
            onClick={() => {
              removeItemFromCart(data.id);
            }}
            icon={<X size={15} />}
          />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.title}</p>
          </div>
          <Currency value={data.price} />
        </div>

        <div className="flex items-center gap-x-2 mt-2">
          <IconButton
            onClick={() => {
              if (data.quantity > 1) {
                updateCartItemQuantity(data.id, data.quantity - 1);
              } else {
                removeItemFromCart(data.id);
              }
            }}
            icon={<Minus size={15} />}
          />
          <span className="text-lg font-semibold">{data.quantity}</span>
          <IconButton
            onClick={() => addItemToCart(data, 1)}
            icon={<Plus size={15} />}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
