import { Title } from "@/components";
import Link from "next/link";

export default function NamePage() {
  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex  w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5">
          <div className="mb-2 flex flex-col">
            <span>Nombres</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Apellidos</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Dirección</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Dirección 2 (opcional)</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Código postal</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>Ciudad</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col">
            <span>País</span>
            <select className="rounded-md border bg-gray-200 p-2">
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Costa Rica</option>
            </select>
          </div>

          <div className="mb-2 flex flex-col">
            <span>Teléfono</span>
            <input type="text" className="rounded-md border bg-gray-200 p-2" />
          </div>

          <div className="mb-2 flex flex-col sm:mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex w-full justify-center sm:w-1/2 "
            >
              Siguiente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
