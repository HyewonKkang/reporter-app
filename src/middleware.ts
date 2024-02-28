import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { INSIGHT_PAGE_REGEX, GUESTBOOK_PAGE_REGEX } from './utils/regex';
import { getReporterUseComment, getReporterUseInsight } from './actions/reporter';

async function handlePageAccess(
  request: NextRequest,
  pageRegex: RegExp,
  validateAction: (reporterId: string) => Promise<boolean>,
) {
  const reporterId = pageRegex.exec(request.nextUrl.pathname)?.[1];
  if (reporterId) {
    try {
      const hasAccess = await validateAction(reporterId);
      if (!hasAccess) {
        return NextResponse.redirect(new URL(`/reporter/${reporterId}`, request.nextUrl.origin));
      }
    } catch (error) {
      return NextResponse.redirect(new URL(`/reporter/${reporterId}`, request.nextUrl.origin));
    }
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let response;

  if (INSIGHT_PAGE_REGEX.test(pathname)) {
    response = await handlePageAccess(request, INSIGHT_PAGE_REGEX, getReporterUseInsight);
  } else if (GUESTBOOK_PAGE_REGEX.test(pathname)) {
    response = await handlePageAccess(request, GUESTBOOK_PAGE_REGEX, getReporterUseComment);
  }

  if (response) {
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-protocol', request.nextUrl.protocol);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
