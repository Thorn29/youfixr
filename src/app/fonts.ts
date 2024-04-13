import { Oswald, Kanit, Kreon } from 'next/font/google'
 
export const oswald = Oswald({
  weight: '400',
  subsets: ['latin'],
  variable: '--oswald',
})

export const kanit = Kanit({
  weight: ['100', '200', '500', '700'],
  subsets: ['latin'],
  variable: '--kanit'
})

export const kreon = Kreon({
  subsets: ['latin'],
  variable: '--kreon'
})