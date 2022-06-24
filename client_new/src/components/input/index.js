import React from 'react'

function Input({text , value , onChange}) {
  return (
    <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" value={value} onChange={onChange}/>
        <label htmlFor="floatingInput">{text} </label>
    </div>
  )
}

export default Input