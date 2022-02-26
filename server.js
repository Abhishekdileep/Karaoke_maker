const express = require('express')
const fileUpload = require('express-fileupload')
 
const app  = express()

app.use(fileUpload());

app.post('/upload' , (req,res) => {
    if(req.files === null ){
        return res.status(400).json({msg : 'No file uploaded' })
    }
     const file = req.files.file;

     file.mv(`./uploads/ls${file.name}` , err=> {
         if( err){
            console.error(err);
            return res.status(500).send(err);   
         }

         res.json({ filename : file.name , filePath : `/uploads/${file.name}` , file : file});
     })

});

app.listen(5000 , ()=> console.log('Server started..'))