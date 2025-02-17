const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  return response.json();
};

export default getProduct;
