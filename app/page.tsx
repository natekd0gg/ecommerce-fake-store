'use client';

import ProductList from '@/components/ProductList';
import Container from '@/components/ui/Container';
import { PaginationWithLinks } from '@/components/ui/PaginationWithLinks';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/CartContext';

const HomePage = () => {
  const { products, loading } = useCart();
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get('page')) || 1;
  const productsPerPage = 4;

  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {loading ? (
          <div className="flex items-center justify-center h-full w-full text-neutral-500">
            Loading Products...
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductList items={paginatedProducts} />
          </div>
        )}
        <PaginationWithLinks
          page={page}
          pageSize={productsPerPage}
          totalCount={products?.length}
        />
      </div>
    </Container>
  );
};

export default HomePage;
