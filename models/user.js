const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define our model
const userSchema = new Schema({
  email: {
    type: 'String',
    unique: true,
    lowercase: true,
    required: true,
  },

  password: {
    type: 'String',
    required: true,
  },
});

// On save Hook, encrypt password
// Before saving a model run this function
userSchema.pre('save', async function (next) {
  // get access to the user model
  const user = this;
  try {
    // generate a salt, then run callback
    const salt = await bcrypt.genSalt(10);
    // hash (encrypt) our password using the salt
    const hash = await bcrypt.hash(user.password, salt);
    // overwrite plain text password with encrypted password
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
