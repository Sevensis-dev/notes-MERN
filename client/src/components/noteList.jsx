import { useState, useEffect } from "react";
import axios from 'axios';
import './Note.css';

function Note() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/notes')
            .then(response => setNotes(response.data))
            .catch(error => console.log(error));
    }, []);

    const addNote = () => {
        axios.post('http://localhost:3001/api/notes', {title, content})
            .then(response => {
                setNotes([...notes, response.data]);
                setTitle('');
                setContent('');
            })
            .catch(error => console.log(error));
    };

const deleteNote = (id) => {
    axios.delete(`http://localhost:3001/api/notes/${id}`)
        .then(() => {
            setNotes(notes.filter(note => note._id !== id));
        })
        .catch(error => {
            console.log('error', error);
        });
};

    const startEdit = (note) => {
        setEditingId(note._id);
        setTitle(note.title);
        setContent(note.content);
    };

    const saveEdit = () => {
        axios.put(`http://localhost:3001/api/notes/${editingId}`, {title, content})
            .then(response => {
                setNotes(notes.map(note => note._id === editingId ? response.data : note));
                setEditingId(null);
                setTitle('');
                setContent('');
            })
            .catch(error => console.log(error));
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setContent('');
    };

    return (
        <div className="notes-container">
            <div className="note-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="note-input"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="note-textarea"
                ></textarea>
                
                {editingId ? (
                    <div className="note-actions">
                        <button onClick={saveEdit} className="button button-primary">Save</button>
                        <button onClick={cancelEdit} className="button button-secondary">Cancel</button>
                    </div>
                ) : (
                    <button onClick={addNote} className="button button-primary">Add Note</button>
                )}
            </div>

            {notes.map(note => (
                <div key={note._id} className="note-card">
                    <h3 className="note-title">{note.title}</h3>
                    <p className="note-content">{note.content}</p>
                    {note.createdAt && (
                        <div className="note-date">
                            {new Date(note.createdAt).toLocaleString()}
                        </div>
                    )}
                    <div className="note-actions">
                        <button onClick={() => startEdit(note)} className="button button-secondary">Edit</button>
                        <button onClick={() => deleteNote(note._id)} className="button button-danger">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Note;