import React , {useState , useRef , Fragment , createContext } from 'react'
import Input from '../input'
import './index.css'
import onSubmit from './onsubmit';
import targetFile from './targetFile';
function Form({ uploadedFile, setUploadedFile , loading ,setLoading , artist , song_name}) {
    const [file , setFile ] =  useState(null);
    const [message, setMessage] = useState('')
    const [disabled , setDisabled] = useState(false)
    const [song_name , setSongname] = useState('')
    const [artist , setArtist] = useState('')
    const ref = useRef();

    const onSubmited = async (e) => {
      e.preventDefault();
      console.log(artist , song_name)
      await onSubmit(e , file , setFile , setUploadedFile , setMessage , setLoading , setDisabled , artist , song_name)
    }

    const targetedFile = e => {
      targetFile(e , setFile , setDisabled , setMessage , ref)
    }
  return (
    <form onSubmit={onSubmited}>
      <Input  text={'Artist name'} value={artist} onChange={(e)=>{setArtist(e.target.value)}} disabled={artist} />
      <Input text={"Song name"} value={song_name} onChange={(e)=>{setSongname(e.target.value)}} disabled={song_name}/>
      <div className="mb-3">
        <input className="form-control" type="file" id="formFile" ref={ref} onChange={targetedFile} />
      </div>
      <div className="d-grid">
        <button className="btn btn-lg btn-primary bg-primary bg-opacity-75 btn-login  fw-bold mb-2" type="submit" onSubmit={onSubmited} disabled={disabled}>Generate</button>
      </div>
      {loading ? <div className="progress">
  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}></div>
</div> : null}
{
 message ? 
 <div className="alert alert-warning alert-dismissible fade show" role="alert">
 <strong>{message}</strong>
 <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setMessage(null)}}></button>
</div>  
: null
}
    </form>
  )
}

export default Form    

