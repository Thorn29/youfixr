import { findVideoByUser, getWatched, insertVideo, updateVideo } from "../../../../lib/db/hasura"
import { authenticateUser } from "../utils"

export async function GET() {
  const userData: { token: string, userId: string } | undefined  = authenticateUser()
  if (!userData) throw 'Not authorized';

  try {
      const videoList = await getWatched(userData.token, userData.userId);

      if (videoList.length > 0) {
        return Response.json({ data: videoList })
      } else {
        return Response.json({ error: 'Video not found' })
      }
  } catch (err) {
    return Response.json({ error: err })
  }
}



export async function POST(request: Request) {
  try {
    const userData: { token: string, userId: string } | undefined  = authenticateUser()
    if (!userData) throw 'Not authorized';

    const { videoId, favorited, title, author, date, description } = await request.json()
    const findVideo = await findVideoByUser(userData.token, userData.userId, videoId)
    const videoExists = findVideo.length > 0;
    if (videoExists) {
      const updateVid = await updateVideo(userData.token, userData.userId, videoId, favorited)
      return Response.json({ data: updateVid })
    } else {
      const newVideo = await insertVideo(userData.token, userData.userId, videoId, favorited, title, author, date, description)
      return Response.json({ data: newVideo })
    }
  } catch (err) {
    return Response.json({ error: err })
  }
}