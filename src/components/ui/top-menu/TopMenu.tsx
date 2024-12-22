"use client";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  return (
    <nav className="flex w-full items-center justify-between px-5">
      {/* Logo */}
      <div className="">
        <Link href="/">
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Center menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, cart, menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="size-5" />
        </Link>
        <Link
          href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}
          className="mx-2"
        >
          <div className="relative">
            {loaded && !!totalItemsInCart && (
              <span className="fade-in absolute -right-2 -top-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="size-5" />
          </div>
        </Link>
        <button
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
