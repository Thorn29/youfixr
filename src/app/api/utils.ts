import { cookies } from "next/headers";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateUser = () => {
  const cookieStore = cookies()
  const tokenRaw = cookieStore.get('token')
  if (tokenRaw && process.env.JWT_SECRET) {
    const token: string = tokenRaw.value.substring(
      tokenRaw.value.indexOf("=") + 1, 
      tokenRaw.value.indexOf(";")
    );
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    const userId: string = decoded.issuer
  
    return { token, userId }
  }
}