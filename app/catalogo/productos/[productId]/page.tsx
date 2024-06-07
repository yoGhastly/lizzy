"use client";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div>
      <h1>Product {params.productId}</h1>
    </div>
  );
}
