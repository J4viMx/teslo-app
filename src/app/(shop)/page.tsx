import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

export const revalidate = 60;

/* interface Props {
  searchParams: {
    page?: string;
  };
} */
interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title={"Tienda"} subtitle="Todos los productos" className="mb-2" />
      <Pagination totalPages={totalPages} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
