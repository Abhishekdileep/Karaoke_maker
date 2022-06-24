import React , { useState , useEffect, useRef} from 'react'
import useAudio from '../hooks/context/useAudioElement';
import Mute from '../hooks/controls/useMute';
import Play from '../hooks/controls/usePlay';
import Volume from '../hooks/controls/useVolume';
import Progress from '../hooks/controls/useProgress';
import Visualizer from '../visualizer';
import { ReactComponent as PlayButton } from '../assest/play.svg'
import { ReactComponent as PauseButton } from '../assest/pause.svg'
import { ReactComponent as MuteButton } from '../assest/mute.svg'
import { ReactComponent as UnmuteButton } from '../assest/unmute.svg'
import './index.css'



const Player = ({ urls, meta  }) => {

  const {audio , audioContext} = useAudio(urls);
  const { progress , startTimer , updateProgress  } = Progress(audio.current , audioContext )
  const { play , togglePlay  } = Play( audio.current , audioContext  )
  const { volume , changeVolume } = Volume(audio.current , audioContext)
  const { mute , toggleMute } = Mute( audio.current )
  const [metaData, setMetaData] = useState(null)
  
  async function fetchMetaData(meta){
    const response = await fetch(meta)
    setMetaData(await response.json())
    console.log(metaData)
  }
  
  useEffect (()=> { 
    fetchMetaData(meta)
  } , [meta])
  const ref = useRef()
  useEffect(() => { 
    audio.current.addEventListener('ended', () => togglePlay(false)); 
    audio.current.onplay = ()=> { 
      startTimer(); 
      // Visualizer(audioContext , audio , ref)
    } 
    return () => {
      audio.current.removeEventListener('ended', () => togglePlay(false));
    };
    
  }, []);

  
  return (
    <div className='container border p-2 bg-my bg-primary bg-opacity-50 text-white' style={{maxHeight : '20vh' , borderRadius : '50px'}}> 
      <div className='row p-3'>
        
        <div className='d-flex flex-row justify-content-center py-3'>
          <a onClick={togglePlay} className="pe-3">
            { play ? <PauseButton width="3rem " />  : <PlayButton width="3rem"/> }
          </a>
          <a onClick={toggleMute} className="pe-3 d-flex align-self-center">
          {mute ? <MuteButton  width="2rem"/>  : <UnmuteButton  width="2rem"/>    }
        </a>
        <input 
          className=' pe-3 form-range  d-flex align-self-center' 
          type={'range'}  
          min={0}
          max={1}
          step={0.02}
          onChange={changeVolume} 
          value={volume} 
          style={{width:"20%"}}
          disabled={mute}
          />
        </div>
        <div>
          <label className="pe-3" >{parseInt(progress , 10) }   sec </label>
          <input className="pe-3 form-range"
          type={'range'}  
          min={0}
          max={ metaData ?  metaData.duration : 0}
          onInput ={updateProgress}
          value={(progress )}
          style={{width:"75%"}}
          />  
          <label className="px-3" > { metaData ?   metaData.duration : 'null' } sec </label>
        </div>
    
     </div>
    </div>
  );
};


export default Player

/*
import React, { useState, useEffect } from 'react'

const useMultiAudio = urls => {
  const [sources] = useState(
    urls.map(url => {
      return {
        url,
        audio: new Audio(url),
      }
    }),
  )

  const [players, setPlayers] = useState(
    urls.map(url => {
      return {
        url,
        playing: false,
      }
    }),
  )

  const toggle = targetIndex => () => {
    const newPlayers = [...players]
    const currentIndex = players.findIndex(p => p.playing === true)
    if (currentIndex !== -1 && currentIndex !== targetIndex) {
      newPlayers[currentIndex].playing = false
      newPlayers[targetIndex].playing = true
    } else if (currentIndex !== -1) {
      newPlayers[targetIndex].playing = false
    } else {
      newPlayers[targetIndex].playing = true
    }
    setPlayers(newPlayers)
  }

  useEffect(() => {
    sources.forEach((source, i) => {
      players[i].playing ? source.audio.play() : source.audio.pause()
    })
  }, [sources, players])

  useEffect(() => {
    sources.forEach((source, i) => {
      source.audio.addEventListener('ended', () => {
        const newPlayers = [...players]
        newPlayers[i].playing = false
        setPlayers(newPlayers)
      })
    })
    return () => {
      sources.forEach((source, i) => {
        source.audio.removeEventListener('ended', () => {
          const newPlayers = [...players]
          newPlayers[i].playing = false
          setPlayers(newPlayers)
        })
      })
    }
  }, [])

  return [players, toggle]
}

const MultiPlayer = ({ urls }) => {
  const [players, toggle] = useMultiAudio(urls)

  return (
    <div>
      {players.map((player, i) => (
        <Player key={i} player={player} toggle={toggle(i)} />
      ))}
    </div>
  )
}

*/