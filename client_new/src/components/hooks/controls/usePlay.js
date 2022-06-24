import { useState , useEffect } from "react";

const Play = (audio  , audioContext   ) =>{
  
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },[playing]);
    
    const togglePlay = () => {  
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }  
        setPlaying(!playing)
      };

      return {
        play : playing , 
        togglePlay : togglePlay
      }
}

export default Play ; 