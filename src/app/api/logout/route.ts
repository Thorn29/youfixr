import { cookies } from "next/headers";

export async function GET() {
  try {
    cookies().delete('token');
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false })
  }
}