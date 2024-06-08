"use client";
import { Product } from "../../products/types";
import { ProductCard } from "../../products/components/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  products: Product[];
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const ProductsCarousel: React.FC<Props> = ({ products }) => {
  return (
    <Carousel
      responsive={responsive}
      sliderClass="gap-4"
      centerMode
      slidesToSlide={2}
      infinite
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};
