import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const whitelist = [
  'http://127.0.0.1',
  'https://127.0.0.1',
  'http://localhost:3000',
  'https://localhost:3000'
];

export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith('/api/cron/')) {
  //   const headers = new Headers(request.headers);
  //   headers.forEach((value, key) => {
  //     console.log(key, value);
  //   });
  //   const origin = headers.get('x-forwarded-for');
  //   return NextResponse.next({
  //       request: {
  //         headers
  //       }
  //     }
  //   );
  //   // if (whitelist.includes(origin ?? '')) {
  //   //   return NextResponse.next({
  //   //       request: {
  //   //         headers
  //   //       }
  //   //     }
  //   //   );
  //   // }
  //   // return NextResponse.error();
  // }


}