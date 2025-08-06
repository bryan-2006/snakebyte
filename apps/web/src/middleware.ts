import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check for any NextAuth session cookies
  const sessionCookie = 
    req.cookies.get('next-auth.session-token') || 
    req.cookies.get('__Secure-next-auth.session-token') ||
    req.cookies.get('next-auth.session-token.0') ||
    req.cookies.get('__Secure-next-auth.session-token.0');
  
  console.log('Middleware check - Session cookie:', !!sessionCookie);
  console.log('Middleware check - Path:', req.nextUrl.pathname);
  
  // If accessing payment page without session, redirect to home
  if (!sessionCookie && req.nextUrl.pathname.startsWith('/payment')) {
    const url = new URL('/', req.url);
    console.log('Redirecting unauthenticated user to:', url.toString());
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Make sure this matches exactly the URL format you're using
export const config = {
  matcher: ['/payment', '/payment/:path*'],
};