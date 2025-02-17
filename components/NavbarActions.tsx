'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from './CartContext';
import CustomButton from '@/components/ui/CustomButton';
import { useState, useEffect } from 'react';

const NavbarActions = () => {
  /* Mount Fix for navbar?
  Use cart will use local storage to preserve amount of items user has in cart
  Cause problems with hydration
  */
  const { cart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Link href="/cart">
        <CustomButton className="flex items-center rounded-full bg-black px-4 py-2">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {totalQuantity}
          </span>
        </CustomButton>
      </Link>
    </div>
  );
};

export default NavbarActions;
