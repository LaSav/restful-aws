// @desc Get Groups
// @route GET /api/groups
// @access Private
const getGroups = (req, res) => {
  res.json({ message: 'Get Groups' });
};

// @desc Get Group
// @route GET /api/groups/:id
// @access Private

const getGroup = (req, res) => {
  res.json({ message: 'Get Group' });
};

// @desc Create Group
// @route POST /api/groups
// @access Private
const createGroup = (req, res) => {
  res.json({ message: 'Create Group' });
};

// @desc Update Group
// @route PUT /api/groups/:id
// @access Private
const updateGroup = (req, res) => {
  res.json({ message: 'Update Group' });
};

// @desc Delete Group
// @route DELETE /api/groups/:id
// @access Private
const deleteGroup = (req, res) => {
  res.json({ message: 'Delete Group' });
};

module.exports = { getGroups, getGroup, createGroup, updateGroup, deleteGroup };
