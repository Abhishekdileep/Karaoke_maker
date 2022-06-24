import { useState , useEffect } from "react";

const Mute = (audio ) =>{

const [mute , setMute ] = useState(false)
  useEffect(()=> {
    audio.muted = !audio.muted 
  } , [mute] )

      const toggleMute = () => {  
        setMute(!mute)
      };

      return {
        mute : mute , 
        toggleMute : toggleMute
      }
}

export default Mute