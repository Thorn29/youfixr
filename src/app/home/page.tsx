import { Metadata } from "next";
import Header from "@/components/Header/Header";
import { getVideos } from "../../../lib/videos";
import Grid from "@/components/Grid/Grid";
import MainWrapper from "@/components/Footer/MainWrapper";
import WatchAgain from "@/components/WatchAgain/WatchAgain";
import { RawVideo } from "../../types/videos";
import ContextWrapper from "@/components/Video/VideoContextWrapper";
import Video from "@/components/Video/Video";

export const metadata: Metadata = {
  title: "Home | YouFixr",
  description: "YouFixr is a platform for DIY tutorials and instructions. Decide on what you want to do, and let us handle the 'how'!",
};

const HomePage: React.FC = async() => {
  const popularVideos: { items: RawVideo[] } = await getVideos('home repair diy', 21)
  return (
    <ContextWrapper>
      <Header />
      <MainWrapper>
        <WatchAgain />
        <h1 className='page-title font2'>Explore</h1>
        <Grid data={popularVideos.items} />
        <Video />
      </MainWrapper>
    </ContextWrapper>
  );
}

export default HomePage;
