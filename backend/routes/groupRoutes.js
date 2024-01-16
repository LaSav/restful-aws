const express = require('express');
const {
  getGroups,
  getGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controllers/groupController');

const router = express.Router();

router.route('/').get(getGroups).post(createGroup);

router.route('/:id').get(getGroup).put(updateGroup).delete(deleteGroup);

module.exports = router;
