import { getFavorites } from "../../../../lib/db/hasura"
import { authenticateUser } from "../utils"

export async function GET() {
  try {
    
    const userData: { token: string, userId: string } | undefined = authenticateUser();
    if (!userData) throw 'Not authorized';

    const videoList = await getFavorites(userData.token, userData.userId)

    if (videoList.length > 0) {
      return Response.json({ list: videoList })
    } else {
      return Response.json({ err: 'no video' })
    }

  } catch (err) {
    return Response.json({ data: err })
  }
  
}