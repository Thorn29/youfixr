import cookie from 'cookie'
import { cookies } from 'next/headers';

export const setTokenCookie = (token: string, ) => {
  const setCookie = cookie.serialize('token', token, {
    secure:  process.env.NODE_ENV === 'production',
    path: '/home'
  })

  const setter = cookies().set('token', setCookie)

  return setter;
}

export const clearTokenCookie = () => {
  cookies().delete('token');
}