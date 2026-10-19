import { useState, useEffect } from 'react'
import Notes from './components/Notes'
import axios from 'axios'
function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

   useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')



  return (
    <>
      <h1>Notes</h1>
      <Notes notes={notes} />
    </>
  )
}

export default App
