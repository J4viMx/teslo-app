"use server";

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    // 1.- Obtener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take, // Si la pagina es 1 = menos 1 es igual a 0, entonces muestra los primeros 12 productos, sin saltarse ninguno
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender,
      },
    });

    // 2.- Obtener el total de paginas
    const totalPagesCount = await prisma.product.count({ where: { gender } });
    const totalPages = Math.ceil(totalPagesCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
