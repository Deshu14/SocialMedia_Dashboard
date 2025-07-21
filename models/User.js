import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  bio: String,
  profilePicture: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('User', userSchema);
