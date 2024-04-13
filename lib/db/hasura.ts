import { MagicUserMetadata } from "@magic-sdk/admin";

// query hasura
export async function queryHasura(operationsDoc: string, operationName: string, variables: { [key: string]: string | boolean | null}, token: string) {
  if (!process.env.NEXT_PUBLIC_HASURA_URL) return;

  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}

// is the user new
export async function isNewUser(token: string, issuer: string) {

  const operationsDoc = `
    query findUser($issuer: String) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
        publicAddress
      }
    }
  `;
  
  const response = await queryHasura(
    operationsDoc,
    "findUser",
    { issuer },
    token
  )
  
  return response.data.users.length === 0;
  }

// create new user
export async function createNewUser(token: string, metadata: MagicUserMetadata) {

  const operationsDoc = `
  mutation createUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }`

  const { email, issuer, publicAddress } = metadata;

  const response = await queryHasura(
    operationsDoc,
    "createUser",
    { email, issuer, publicAddress },
    token
  )
  
  return response;
}

// find video
export async function findVideoByUser(token: string, userId: string, videoId: string) {

  const operationsDoc = `
  query findVideo($userId: String!, $videoId: String!) {
    videos(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      favorited
      id
      userId
      videoId
    }
  }
`;

const response = await queryHasura(
    operationsDoc,
    "findVideo",
    {
      userId,
      videoId
    },
    token
  );

  return response.data.videos;
}

// insert new video
export async function insertVideo(token: string, userId: string, videoId: string, favorited: boolean, title: string, author: string, date: string, description: string) {
  const operationsDoc = `
  mutation insertNewVideo($userId: String!, $videoId: String!, $favorited: Boolean, $title: String, $author: String, $date: String, $description: String) {
    insert_videos_one(object: {favorited: $favorited, userId: $userId, videoId: $videoId, title: $title, author: $author, date: $date, description: $description}) {
      favorited
      id
      userId
      videoId
      title
      author
      date
      description
    }
  }
`;

const response = await queryHasura(
  operationsDoc,
  "insertNewVideo",
  {
    userId,
    videoId,
    favorited,
    title,
    author,
    date,
    description
  },
  token
);

return response;
}

// update video
export async function updateVideo(token: string, userId: string, videoId: string, favorited: boolean) {
  const operationsDoc = `
  mutation updateVideo($userId: String!, $videoId: String!, $favorited: Boolean!) {
    update_videos(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {favorited: $favorited}) {
      affected_rows
    }
  }
`;

const response = await queryHasura(
  operationsDoc,
  "updateVideo",
  {
    userId,
    videoId,
    favorited
  },
  token
);

return response;
}

// get favorites
export async function getFavorites(token: string, userId: string) {
  const operationsDoc = `
  query getFavorites($userId: String!) {
    videos(where: {userId: {_eq: $userId}, favorited: {_eq: true}}) {
      title
      author
      videoId
      date
      description
    }
  }
`;

const response = await queryHasura(
  operationsDoc,
  "getFavorites",
  {
    userId
  },
  token
);

return response.data.videos;
}

// get watched
export async function getWatched(token: string, userId: string) {
  const operationsDoc = `
  query getWatched($userId: String!) {
    videos(where: {userId: {_eq: $userId}}, order_by: {id: desc}, limit: 3) {
      author
      date
      description
      favorited
      title
      videoId
    }
  }
`;

const response = await queryHasura(
  operationsDoc,
  "getWatched",
  {
    userId
  },
  token
);

return response.data.videos;
}