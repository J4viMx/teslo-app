/* import { redirect } from "next/navigation"; */
import { ReactNode } from "react";

export default async function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
