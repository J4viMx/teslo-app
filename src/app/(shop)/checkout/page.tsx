import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="mb-5 underline">
              Editar carrito
            </Link>

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
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{" "}
                  <a href="%" className="underline">
                    términos y condiciones
                  </a>{" "}
                  y{" "}
                  <a href="%" className="underline">
                    política de privacidad
                  </a>
                </span>
              </p>

              <Link
                className="btn-primary flex justify-center"
                href="/orders/123"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
