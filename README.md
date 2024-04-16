# YouFixr

An example app for a streaming platform for DIY videos and tutorials. You can browse by category, or popular. Can be used with an account or without one. Signed in users can save their favorite videos and have access to their watch history. 

[See live demo](https://youfixr.vercel.app/)

## Development

The app was built using **Next.js**  and **Typescript**, connected to a **Hasura GraphQL** server, with a **Neon** database. **Magic link** is used for signing in. 

## Local setup

To set up this app locally, you need to follow several steps:

1. Download the code

2. Create an *env.local* file

3. Inside of the file, add the following environment variables:
- YOUTUBE_API - the API key for YouTube
- NEXT_PUBLIC_MAGIC_KEY - public Magic key
- MAGIC_SECRET_KEY - secret Magic key
- NEXT_PUBLIC_HASURA_URL - url for Hasura
- JWT_SECRET - secret for jsonwebtokens

4. Run *npm install* in the folder

5. Run *npm run dev*

That's it, the app should be up and running!
