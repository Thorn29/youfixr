import React from "react";
import { VideoData } from "@/types/videos";

export interface VideoContextType {
  active: VideoData | null
  openTile: (item: VideoData) => void
  modalIsOpen: boolean
  setModalIsOpen: (val: boolean) => void
}

export const VideoContext = React.createContext<VideoContextType | null>(null);