/* import { notFound } from "next/navigation"; */

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
import { redirect } from "next/navigation";

export const revalidate = 60;

/* interface Props {
  params: {
    gender: Promise<Gender>;
  };
  searchParams: {
    page?: string;
  };
} */
interface Props {
  params: Promise<{ gender: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const searchParam = await searchParams;
  const page = searchParam?.page ? parseInt(searchParam.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) redirect(`/gender/${gender}`);

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para iños",
    unisex: "para todos",
  };

  /* if (id === "kids") {
    notFound();
  } */
  return (
    <>
      <Title
        title={`Articulos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />
      <Pagination totalPages={totalPages} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
