const Name = require("../models/name.model");
const catchAsync = require("../utils/catchAsync");

// GET /names
// GET all names
exports.getAllNames = catchAsync(async (req, res) => {
	const names = await Name.find();
	res.json(names);
});

// GET /names/:id
// GET one name by id
exports.getNameById = catchAsync(async (req, res) => {
	const name = await Name.findOneById(req.params.id);
	res.json(name);
});

// GET /names/search/:searchStr
// GET one name by search string
exports.getNameBySearch = catchAsync(async (req, res) => {
	// Format search string to remove %20 for spaces
	req.params.searchStr = req.params.searchStr.replace(/%20/g, " ");
	const name = await Name.findOneBySearch(req.params.searchStr);
	res.json(name);
});
