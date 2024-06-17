"use client";
import { ProductCard } from "../../products/components/card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Product } from "../../products/domain/Product";

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
    items: 3,
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
      itemClass="max-w-[200px]"
      sliderClass="gap-4"
      slidesToSlide={2}
      infinite
      centerMode
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
};
