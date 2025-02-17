import getProduct from '@/actions/GetProduct';
import ProductDetails from '@/components/ProductDetails';

export type paramsType = Promise<{ productId: string }>;

const ProductPage = async (props: { params: paramsType }) => {
  const { productId } = await props.params;
  const product = await getProduct(productId);

  return <ProductDetails product={product} />;
};

export default ProductPage;
