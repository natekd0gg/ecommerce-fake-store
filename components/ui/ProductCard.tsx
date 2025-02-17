'use client';

import Image from 'next/image';
import IconButton from '@/components/ui/IconButton';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from '@/components/ui/Currency';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartContext';

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const { addItemToCart } = useCart();

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data?.image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt="image"
          className="aspect-square object-cover rounded-md duration-700 ease-in-out group-hover:opacity-75 scale-100 blur-0 grayscale-0"
          priority
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={() => {}}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={() => {
                addItemToCart(data, 1);
              }}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">{data?.title}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
