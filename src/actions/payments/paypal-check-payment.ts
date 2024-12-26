/* eslint-disable camelcase */
"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo verificar el token",
    };
  }
  const resp = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = resp;

  const { invoice_id: orderId } = purchase_units[0];

  console.log(status);
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en Paypal",
    };
  }

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - el pago no se pudo realizar",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization: `Basic ${base64Token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const bodyContent = "grant_type=client_credentials";

  try {
    const response = await fetch(`${oauth2Url}`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      cache: "no-store",
    });

    const result = await response.json();
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization: `Bearer ${bearerToken}`,
    cache: "no-store",
  };

  try {
    const response = await fetch(paypalOrderUrl, {
      method: "GET",
      headers: headersList,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
