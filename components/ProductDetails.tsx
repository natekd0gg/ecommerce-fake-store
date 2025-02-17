'use client';

import Container from '@/components/ui/Container';
import Currency from '@/components/ui/Currency';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

import { useCart } from './CartContext';
import CustomButton from './ui/CustomButton';
import { useEffect, useState } from 'react';
import type { CartItem } from './CartContext';
import { useRouter } from 'next/navigation';

interface ProductDetailsProps {
  product: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={product.image}
                alt="Image"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>
                <div className="mt-3 flex items-end justify-between">
                  <p className="text-2xl text-gray-950">
                    <Currency value={product.price} />
                  </p>
                </div>
                <hr className="my-4" />
                <div className="flex items-center gap-x-4">
                  <h3>{product.description}</h3>
                </div>

                <div className="mt-6 flex items-center gap-x-4">
                  <label htmlFor="quantity">Quantity</label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20 p-2 border border-gray-300 rounded"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-10 flex items-center gap-x-3">
                  <CustomButton
                    onClick={() => {
                      addItemToCart(product, quantity);
                      router.push('/cart');
                    }}
                    className="flex items-center gap-x-2 rounded"
                  >
                    Add to Cart
                    <ShoppingCart />
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-10" />
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
