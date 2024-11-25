import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrdersIdPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <div
              className={clsx(
                "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                {
                  "bg-red-500": true,
                  "bg-green-700": false,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
              <span className="mx-2">Pagada</span>
            </div>

            {/* Items */}

            {productsInCart.map((product) => (
              <div key={product.slug} className="mb-5 flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 size-[100px] rounded"
                />

                <div className="">
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - resumen de orden */}
          <div className="rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av. Siempre Viva</p>
              <p>Col. centro</p>
              <p>Alcaldia Cuauhtemoc</p>
              <p>Ciudad de México</p>
              <p>CP: 398329</p>
              <p>1923812388</p>
            </div>

            {/* Divider */}
            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

            <h2 className="mb-2 text-2xl">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>
              <span className="mt-5 text-2xl">Total: </span>
              <span className="mt-5 text-right text-2xl">$100</span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <div
                className={clsx(
                  "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                  {
                    "bg-red-500": true,
                    "bg-green-700": false,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Pendiente de pago</span>
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
