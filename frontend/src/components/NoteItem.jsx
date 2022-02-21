import { useSelector } from "react-redux";

function NoteItem({ note }) {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className="note" style={{ backgroudColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#ffffff", color: note.isStaff ? "#ffffff" : "#000000" }}>
			<h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
			<p>{note.text}</p>
			<div className="note-date">{new Date(note.createdAt).toLocaleString("en-IN")}</div>
		</div>
	);
}

export default NoteItem;
