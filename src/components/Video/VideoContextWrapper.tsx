'use client'
import React, { useState } from "react";
import { VideoContext } from "./VideoContext";
import { VideoData } from "@/types/videos";

const VideoContextWrapper = ({ children } : {children: React.ReactNode}) => {
  const [active, setActive] = useState<VideoData | null>(null)
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const openTile = (item: VideoData) => {
    setActive(item)
    setModalIsOpen(true)
  }

  return (
    <VideoContext.Provider value={{ active, openTile, modalIsOpen, setModalIsOpen }}>
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContextWrapper;