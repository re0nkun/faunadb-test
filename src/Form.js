import React, { useState } from 'react'

function Form({updateMemory, memoryId}) {
  const [updateText, setUpdateText] = useState('')

  const memoryUpdate = () => {
    const memory = {
      date: new Date().toISOString().split('T')[0],
      text: updateText,
      id: memoryId
    }
    updateMemory(memory)
    
    setUpdateText('')
  }

  const handleChange = (e) => {
    setUpdateText(e.target.value)
    // console.log(updateText)
  }
  
  return (
    <>
      <input type="text"
        value={updateText}
        onChange={e => handleChange(e)}
      />
      <span onClick={memoryUpdate}>[update]</span>
    </>
  )
}
export default Form;