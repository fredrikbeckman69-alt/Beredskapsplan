import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const passcode = request.cookies.get('beredskapsplan_access')?.value

    // We want to protect all pages except the login page itself and static assets.
    const isLoginPage = request.nextUrl.pathname.startsWith('/login')

    if (!passcode && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (passcode === '68092659' && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - The logos in public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.*|.*\\.png$).*)',
    ],
}
