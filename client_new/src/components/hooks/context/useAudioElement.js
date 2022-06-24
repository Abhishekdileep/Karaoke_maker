import React , { useState , useEffect, useRef} from "react";
import useAudioContext from "./useAudioContext";

const useAudio = url => {
  
  const audio = useRef(new Audio(url)); //Media element in actual dom created 
  const { audioContext } = useAudioContext(); //audio Context created 
  
  audio.current.crossOrigin = 'anonymous'
  audio.current.preload = 'metadata'

  return {
    audio : audio, 
    audioContext : audioContext
  };
};

export default useAudio   