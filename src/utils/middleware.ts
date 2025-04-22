import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to protect routes
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;

  // Define protected routes
  const protectedRoutes = ['/admin', '/admin/[id]'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    // Redirect to login page if no token is found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/login'],
};