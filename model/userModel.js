const moongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new moongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please Enter your name '],
  },
  email: {
    type: String,
    required: [true, 'Enter your email '],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  // photo:String,
  // role:{
  //     type:String,
  //     enum:['user','guide','lead-guide','admin'],
  //     default:'user'

  // },

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false,
  },
  // passwordConfirm:{

  //     type:String,
  //     required:[true,'Please provide your confirm password'],
  //     minlength:8,
  //     validate:{

  //         //Work only on save and create
  //         validator:function(el){
  //             return el===this.password;
  //         },
  //         message:'Passwords are not same '
  //     }
  // },

  passwordchangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
userSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //delete the password confirmed
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordchangedAt) {
    console.log(this.passwordchangedAt, JWTTimestamp);
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = moongoose.model('User', userSchema);
module.exports = User;
