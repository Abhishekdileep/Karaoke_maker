import React , { useState } from "react";
import Form from '../components/form/index'
import Lyrics from "../components/lyrics";
import Player from "../components/player";
import './about.css'
const About = () => {
	const [uploadedFile, setUploadedFile] = useState(null)
	const [loading ,setLoading ] = useState(false)
return (
	
	<>
	<div className="container container-fluid ps-md-0  py-4 container--box" >
		<div className="row g-0">
			<div className="d-none d-md-flex col-md-8 col-lg-6 position-top" >
				<div className="container">
					<div className="row">
					{uploadedFile ?<>
						<Player urls={
          `http://127.0.0.1:5000/stream/${uploadedFile.filename}?type=vocals`}
          meta={
            `http://127.0.0.1:5000/meta/${uploadedFile.filename}?type=vocals`}
          />
		  <Player urls={
			`http://127.0.0.1:5000/stream/${uploadedFile.filename}?type=no_vocals`}
			meta={
			  `http://127.0.0.1:5000/meta/${uploadedFile.filename}?type=no_vocals`}
			/>
					</>
		  : null}
					</div>
					{
						uploadedFile ? 
						<div className="row">
							<Lyrics lyrics={uploadedFile.lyrics} />
						</div>
						: null
					}
				</div>
			</div>
		  	<div className="col-md-8 col-lg-6">
				  <div className="login d-flex align-items-center py-5">
				  	<div className="container">
					  	<div className="row">
						  	<div className="col-md-9 col-lg-8 mx-auto">
						  		<h3 className="login-heading mb-4">Kareoke!</h3>
						  		<Form 
									setLoading={setLoading} 
									loading={loading}
									uploadedFile={uploadedFile}
									setUploadedFile = {setUploadedFile} 
									artist={false}
									song_name = {false}
								/>		  
						  	</div>	
					  	</div>
	  			  	</div>
				</div>
  			</div>
		</div>
	</div>
</>
		
);
};

export default About;
