import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

export const revalidate = 604800;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = (await params).slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  /* const previousImages = (await parent).openGraph?.images || []; */

  return {
    title: product?.title,
    description: product?.description ?? "",
    openGraph: {
      title: product?.title,
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mb-20 mt-5 grid gap-3 md:grid-cols-3">
      {/* Slide show */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />

        {/* Mobile slideShow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg">$ {product.price}</p>

        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
