import React from 'react';
import './index.css'
const Home = () => {
return (
	<main>
  <div className="container py-4">
    

    <div className="p-5 mb-4 bg-primary bg-opacity-50 rounded-3 div-custom">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">K-Bar</h1>
		<hr></hr>
		<h3 className="display-10 fw">Your One stop Shop for All-thing Kareoke</h3>
        <p className="col-md-8 fs-4">Using a series of AI/ML models , we have curated the best experience for all your Kareoke Needs.</p>
      </div>
    </div>

    <div className="row align-items-md-stretch ">
      <div className="col-md-6">
        <div className="h-100 p-5 text-white rounded-3  bg-secondary bg-opacity-75">
          <h2>Lyrics - Kareoke </h2>
          <p>Out on the town with your friends , want to have a fun with your friends , Lyrics generator is for you ! Automated lyrics and Kareoke Version of Your favourite Song at your finger tips with Lyrics generator</p>
          <button className="btn btn-outline-light" type="button">Kareoke</button>
        </div>
      </div>
      <div className="col-md-6 bg-primary bg-opacity-50 text-white">
        <div className="h-100 p-5 ">
          <h2>Unplugged</h2>
          <p>Are you just listening to song on your Phone chilling and would love to play an unplugged version of the song , maybe listen to the lyrics. With unplugged you can have your way to listen to your fancy music </p>
          <button className="btn btn-outline-secondary text-white" type="button">Unplugged</button>
        </div>
      </div>
    </div>

    <footer className="pt-3 mt-4 text-muted border-top">
      &copy; 2021
    </footer>
  </div>
</main>

);
};

export default Home;
