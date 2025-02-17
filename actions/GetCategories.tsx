const getCategories = async (): Promise<[]> => {
  const res = await fetch('https://fakestoreapi.com/products/categories');

  return res.json();
};

export default getCategories;
