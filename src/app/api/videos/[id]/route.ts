import { findVideoByUser } from "../../../../../lib/db/hasura";
import { authenticateUser } from "../../utils";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const userData = authenticateUser()
  if (!userData) throw 'Not authorized';

  try {
    const videos = await findVideoByUser(userData.token, userData.userId, id);

    if (videos) {
      return Response.json({ data: videos[0].favorited })
    } else {
      return Response.json({ error: 'No video' })
    }

  } catch (err) {
    return Response.json({ error: err })
  }
  
}