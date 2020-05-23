import React, { useState, useEffect } from 'react'
import Form from './Form'

function App() {

  const [thought, setThought] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    text: '' 
  })
  const [memories, setMemories] = useState([])
  
  useEffect(() => {
    getMemories()
  }, [])

  const getMemories = async () => {
    const resp = await fetch('/api/memories')
    const json = await resp.json()
    setMemories(json)
  }

  const saveThought = async () => {
    const resp = await fetch('/api/post-memory', { 
      method: 'POST',
      body: JSON.stringify(thought)
    })
    setThought({ ...thought, text: '' })

    const { error, mem } = await resp.json()
    error ? console.log(error) : setMemories([ ...memories, mem ])
  }
  
  const deleteMemory = async memory => {
    const resp = await fetch('/api/delete-memory', {
      method: 'DELETE',
      body: JSON.stringify(memory)
    })
    const { error, mem } = await resp.json()
    const surviving =  memories.filter(m => mem.ref['@ref'].id !== m.ref['@ref'].id)
    console.log(surviving)
    error ? console.error(error) : setMemories(surviving)
  }

  const updateMemory = async memory => {
    const resp = await fetch('/api/update-memory', {
      method: 'PUT',
      body: JSON.stringify(memory)
    })
    const { error, mem } = await resp.json() 
    // console.log(mem)
    const memories_c = memories.concat()
    memories_c.find(m => {
      if (m.ref['@ref'].id === mem.ref['@ref'].id) {
        m.data.text = mem.data.text
      }
      return null
    })
    error ? console.error(error) : setMemories(memories_c)
  }

  const handleThoughtChange = e => setThought({ ...thought, [e.target.name]: e.target.value})

  return (
    <div className="App">
      <h1>Memories</h1>

      <input type="date" name="date" value={thought.date} onChange={handleThoughtChange}/>

      <input type="text" name="text" placeholder="Your thought" value={thought.text} onChange={handleThoughtChange} />

      <button onClick={saveThought}>
        Commit to memory
      </button>

      <div id="memories">
        {
          memories.map((m, i) => (
            <div key={i}>
              {m.data.text} &ensp;

              {/* <input type="text"
                name={m.ref['@ref'].id} 
                onChange={handleReThoughtChange} 
              /> 
              <span onClick={() => updateMemory(m)}>[update]</span> */}
              <Form 
                updateMemory={updateMemory} 
                memoryId={m.ref['@ref'].id}
              />

              <span onClick={() => deleteMemory(m)}>[delete]</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App;
