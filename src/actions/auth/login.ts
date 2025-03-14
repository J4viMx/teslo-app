"use server";

import { signIn } from "@/auth";
/* import { sleep } from "@/utils"; */

/* function isRedirectError(error: Error & { digest?: string }) {
  return !!error.digest?.startsWith("NEXT_REDIRECT");
} */

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    /* await sleep(2); */
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error: any) {
    /* if (isRedirectError(error)) throw error; */
    return "CredentialsSignin";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar sesión",
    };
  }
};
