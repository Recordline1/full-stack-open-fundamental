


const AddNote = ({ addNote, newNote, setNewNote }) => {
  return (
    <form onSubmit={addNote}>
      <div>
        <label>note:</label>
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  )
}
export default AddNote