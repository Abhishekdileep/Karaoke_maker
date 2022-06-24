const targetFile = (e , setFile , setDisabled , setMessage , ref) => {
    e.preventDefault();
    var extension = e.target.files[0].type
    console.log(extension)
    if(extension == 'audio/mpeg' || extension == 'audio/wav' || extension == 'video/mpeg')
        {
            setFile(e.target.files[0])
            setMessage('')
            setDisabled(false)    
        }
    else
        {
            setMessage('Error Please upload mp3 / wav type');
            ref.current.value = "";
            setDisabled(false)
        }
}

export default targetFile