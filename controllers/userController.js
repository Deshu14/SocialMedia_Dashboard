import User from '../models/User.js';

export const createUser = async (req, res) => {
  const { username, bio } = req.body;
  const user = await User.create({ username, bio });
  res.json(user);
};
