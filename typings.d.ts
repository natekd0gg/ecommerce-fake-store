type Product = {
  id: number;
  title: string;
  price: number;
  cateogry: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
