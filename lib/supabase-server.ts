import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient(){
  const CookieStore = cookies();
 return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { 
          return CookieStore.getAll(); 
        },
        setAll(cookiesToSet: {
          try {
           cookiesToSet.forEach((cookie) => 
              CookieStore.set(cookie.name, cookie.value, cookie.options)
            );
          } catch {}
        },
      }
    }
  );
}  