import axios from 'axios'
async function onSubmit (e , file , setFile , setUploadedFile , setMessage , setLoading , setDisabled , artist , song_name) {
    
    setLoading(true)
    setDisabled(true)
    setMessage('Uploading file')
    if(file == null){
        alert('file not selected')
    }

    const formData = new FormData();
    formData.append('file' , file)
    formData.append('artist' , artist) 
    formData.append( 'song_name' , song_name )
    console.log(song_name , artist , "is the song name and artist ")
    console.log("started")
    try {
        const res = await axios.post(
        '/upload' , 
        formData , 
        {
            headers : {
                 'Content-Type' : 'multipart/form-data'
            }
        })
        console.log(res.data)
        const { filename , filePath, lyrics  } = res.data;
        setUploadedFile({filename , filePath , lyrics})
        setMessage('File Uploaded')
        setLoading(false)
        setDisabled(false)
    }
    catch (err) {
        console.log(err)
        setMessage(err.message)
        setDisabled(false)
        setLoading(false)
    }
}
export default onSubmit