import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      toast.success("Note deleted successfully");
      if (onDelete) onDelete(id); // Refresh notes list in parent
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] cursor-pointer">
      <div className="card-body">
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base">{note.title}</h3>
          <p className="text-base-content/70">{note.content}</p>
        </Link>

        <div className="flex justify-end items-center mt-4 gap-2">
          <button onClick={(e) => handleEdit(e, note._id)}>
            <PenSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="btn btn-ghost btn-xs text-error"
            onClick={(e) => handleDelete(e, note._id)}
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
