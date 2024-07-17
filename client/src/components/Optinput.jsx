import React from 'react'

const optinput = ({OnSubmint}) => {
  return (
    <div>
        <input type="number" name="" id="otpinputComponent" maxLength={4} />
        <button onClick={OnSubmint}>Submit</button>
    </div>
  )
}

export default optinput