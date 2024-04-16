export const getVideos = async(query: string, number: number) => {
  const searchTerm = query.replace(' ', '%20')
  const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${number}&q=${searchTerm}&key=${process.env.YOUTUBE_API}&videoEmbeddable=true`);

  const data = await response.json()

  return data;
}