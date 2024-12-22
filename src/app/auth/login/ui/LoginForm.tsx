"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
/* import { useRouter } from "next/navigation"; */
import React, { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  /* const router = useRouter(); */
  const [state, dispatch, isPending] = useActionState(authenticate, undefined); // useFormState se renombro a useActionState

  useEffect(() => {
    console.log(state);
    if (state === "Success") {
      window.location.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-end space-x-1"
        arial-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <div className="mb-2 flex flex-row">
            <IoInformationOutline className="size-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales incorrectas</p>
          </div>
        )}
      </div>

      <LoginButton isPending={isPending} />
      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton({ isPending }: { isPending: boolean }) {
  return (
    <button
      type="submit"
      className={clsx({ "btn-primary": !isPending, "btn-disabled": isPending })}
      disabled={isPending}
    >
      Ingresar
    </button>
  );
}
