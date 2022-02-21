const asyncHandler = require("express-async-handler");

const User = require("../models/UserModel");
const Ticket = require("../models/TicketModel");

// @desc Get user ticket
// @router GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const tickets = await Ticket.find({ user: req.user.id });
	res.status(200).json(tickets);
});

// @desc Get user ticket
// @router GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorised");
	}

	res.status(200).json(ticket);
});

// @desc Delete ticket
// @router DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorised");
	}

	await Ticket.remove();

	res.status(200).json({ success: true });
});

// @desc Update user ticket
// @router PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		res.status(404);
		throw new Error("Ticket not found");
	}

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("Not authorised");
	}

	const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json(updatedTicket);
});

// @desc Create new ticket
// @router POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
	const { product, description } = req.body;
	if (!product) {
		res.status(400);
		throw new Error("Please add a product");
	} else if (!description) {
		res.status(400);
		throw new Error("Please add a description");
	}

	// Get user using the id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.create({ product, description, user: req.user.id, status: "new" });
	res.status(201).json(ticket);
});

module.exports = {
	getTickets,
	getTicket,
	createTicket,
	deleteTicket,
	updateTicket,
};
