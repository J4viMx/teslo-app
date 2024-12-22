/* import { auth } from "@/auth";
import { redirect } from "next/navigation"; */
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex justify-center">
      <div className="w-full px-10 sm:w-[350px]">{children}</div>
    </main>
  );
}
