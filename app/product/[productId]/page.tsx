import getProduct from '@/actions/GetProduct';
import ProductDetails from '@/components/ProductDetails';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);

  return <ProductDetails product={product} />;
};

export default ProductPage;
