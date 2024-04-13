import { createNewUser, isNewUser } from "../../../../lib/db/hasura";
import { setTokenCookie } from "../../../../lib/cookies";
import { magicAdmin } from "../../../../lib/magic-server";
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization');
    if (!auth || !process.env.JWT_SECRET) throw 'User not authorized';

    const didToken = auth.substring(7)
    const metadata = await magicAdmin.users.getMetadataByToken(didToken)
   
    const token = jwt.sign({
      ...metadata,
      "iat": 1516239022,
      "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-user-id": `${metadata.issuer}`,
      }
    }, process.env.JWT_SECRET)

    const isNewUserQuery = metadata.issuer && await isNewUser(token, metadata.issuer)

    isNewUserQuery && await createNewUser(token, metadata)
    setTokenCookie(token)

    return Response.json({ data: metadata.email })
  } catch(err) {
    return Response.json({ error: err})
  }
}