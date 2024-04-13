import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== 'undefined' && process.env.NEXT_PUBLIC_MAGIC_KEY && new Magic(process.env.NEXT_PUBLIC_MAGIC_KEY)
  )
}

export const magic = createMagic()