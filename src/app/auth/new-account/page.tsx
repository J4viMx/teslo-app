import { titleFont } from "@/config/fonts";
import { RegisterForm } from "./ui/RegisterForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Nueva cuenta</h1>

      <RegisterForm />
    </div>
  );
}
