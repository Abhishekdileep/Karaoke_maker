import React from 'react'

function Lyrics({lyrics}) {
  return (
    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example card my-4 bg-primary bg-opacity-50 text-white" tabindex="0">
      <div className='card-body'>
      <h4 id="scrollspyHeading1" className='d-flex flex-row justify-content-center'>Lyrics</h4>
      <p className='overflow-hidden'>{lyrics}</p>
      </div>
</div>
  )
}

export default Lyrics