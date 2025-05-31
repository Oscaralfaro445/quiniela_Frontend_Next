import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Jose es una libreria similar a jwt con los mismos estandares

export async function middleware(request: NextRequest) {
  // const secret = process.env.JWT_SECRET | "secret";

  // Extraemos el token de las cookies
  const jwt = request.cookies.get("authToken")?.value;
  // console.log("Token", jwt);

  // Si no tenemos un token regresamos a la pantalla de login
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Si el token es valido el middleware permite continuar
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Arreglo de rutas protegidas
export const config = {
  matcher: ["/dashboard", "/admin/:path*"],
};
