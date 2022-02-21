const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Ticket = require("../models/TicketModel");
const Note = require("../models/NoteModel");

// @desc Get note for a ticket
// @router GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorised");
	}

	const notes = await Note.find({ ticket: req.params.ticketId });
	res.status(200).json(notes);
});

// @desc Create note for a ticket
// @router POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.ticketId);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorised");
	}

	const note = await Note.create({
		ticket: req.params.ticketId,
		text: req.body.text,
		isStaff: false,
		user: req.user.id,
	});
	res.status(200).json(note);
});

module.exports = {
	getNotes,
	addNote,
};
