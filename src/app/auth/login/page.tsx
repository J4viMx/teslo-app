import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Ingresar</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="mb-5 rounded border bg-gray-200 px-5 py-2"
          type="email"
        />

        <button className="btn-primary">Ingresar</button>

        {/* divisor l ine */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>
      </div>
    </div>
  );
}
