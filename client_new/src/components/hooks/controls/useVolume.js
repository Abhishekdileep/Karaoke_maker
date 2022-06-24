import { useState , useEffect } from "react";

const Volume = (audio  , audioContext) =>{

    const [volume, setVolume] = useState(0.5)

    useEffect(()=>{
        audio.volume = volume
    }, [volume])

    const changeVolume = (e)=>{
        setVolume(e.target.valueAsNumber)
    }

      return {
        volume : volume , 
        changeVolume : changeVolume
      }
}

export default Volume ; 