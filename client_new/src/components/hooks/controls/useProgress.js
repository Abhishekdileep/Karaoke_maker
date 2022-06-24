import { useState , useEffect , useRef } from "react";

const Progress = (audio  , audioContext ) =>{

    const [progress, setProgress] = useState(0)

    const startTimer = ()=>{
        setInterval(() => {
          setProgress(audio.currentTime)
          }, [1100]);
    }


    const updateProgress = (e) => {
        var val = parseInt(e.target.valueAsNumber , 10)
        setProgress(val)
        audio.currentTime = val
    }

      return {
        progress : progress , 
        startTimer : startTimer , 
        updateProgress : updateProgress
      }
}

export default Progress ; 