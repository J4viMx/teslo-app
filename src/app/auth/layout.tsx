import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center">
      <div className="w-full px-10 sm:w-[350px]">{children}</div>
    </main>
  );
}
