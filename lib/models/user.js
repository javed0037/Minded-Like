const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let user = new Schema({

  firstName : {type : String },
  lastName   : {type : String },
  dob    : {type : Date },
  email:{type:String,unique:true,lowercase:true},
  password:{type:String}, //
  bio :   {type : String },
  phoneNumber : { type : String },
  avatar    : { type : String, default: ''},
  isDeleted : { type: Boolean, default: false},
  verificationToken : {type : String},
  otpVerify  :  { verificationStatus: {type: Boolean, default :false}},
  otp        :  { type : String },
  otpExpire  :  {type : Date },
  verifyEmail:{ verificationStatus: {type: Boolean, default :false},email: {type:String}},
  verifypPhoneNumber:{ verificationStatus: {type: Boolean, default :false},phoneNumber: {type:String}},
  createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('User',user);
