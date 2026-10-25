import { useState, useEffect } from 'react'
import Note from './components/Note'
import AddNote from './components/AddNote'
import noteService from './services/notes'
function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(allNotes => {
        setNotes(allNotes)
      })
  }, [])

  const addNote = e => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote  => {
        setNotes(notes.map(note => note.id !== id ? note :returnedNote ))
      })
      .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToshowe = showAll ? notes : notes.filter(note => note.important === true)




  return (
    <>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>

      <AddNote addNote={addNote} newNote={newNote} setNewNote={setNewNote} />
      <ul>
        {notesToshowe.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    </>
  )
}

export default App
