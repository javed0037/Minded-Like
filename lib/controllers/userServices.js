const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const resHndlr = require("../global/Responder");
const globalFunction = require('../global/globalFunctions');
var crypto = require('crypto');
const accountSid = 'AC26b80d4aaacc7a0c2a40319852e5663d';
const authToken  = '70b8210cf5034211e1806ad2744932e1';
const client = require('twilio')(accountSid, authToken);
//const Constants = require('./userConstant');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())
const _ = require('lodash');
let { successResult, verifyData, encodePassword, encodeEmail, serverError, mergeArray, countryCode, generateRandomString, validate, parameterMissing, createUniqueId } = require('../global/globalFunctions');
//let { PARAMETER_MISSING_STATUS, BAD_REQUEST_STATUS, ALREADY_EXIST, SUCCESS_STATUS, INVALID_CREDENTIAL }  = require ('../global/globalFunctions');
let { USERNAME_EXIST, INVALID_ACCESS_TOKEN_MESSAGE, INVALID_MOBILE, INVALID_ARRAY, INVALID_PASSWORD_MESSAGE, INVALID_LOGIN_TYPE, INVALID_LOGIN_MESSAGE, USER_EXIST, LOGIN_SUCCESSFULLY_MESSAGE, MOBILE_NUMBER_MESSAGE, OTP_MATCHED, INVALID_VERIFICATION_CODE, USER_LOGOUT_MESSAGE, PASSWORD_CHANGE_MESSAGE, INVALID_EMAIL, OTP_SENT, VERIFICATION_MESSAGE } = require ('../global/message');
let { PARAMETER_MISSING_STATUS, BAD_REQUEST_STATUS, ALREADY_EXIST, SUCCESS_STATUS, INVALID_CREDENTIAL } = require('../global/status');
let twilio = require('../global/twilio';
module.exports = {
 'registration' : (req, res)=>{
	 let { firstName, lastName, phoneNumber, email, password, dob, gender, boi} = req.body;
	 let data = validate({ firstName, lastName, phoneNumber, email, password, dob, gender, boi });
	 if (data.status) {
      //let password = req.body.password;
      //let confirmPassword =  req.body.confirmpassword;
      //var token;
    //  if(confirmPassword == password) {
            User.findOne({phoneNumber:req.body.phoneNumber},{}).then((data)=>{
               if(!data){
                       // bcrypt.hash(password, 10, (err, hash)=> {
                       //   if (err) {
                       //    return  res.json({ message: "unable to bcrypt the password",status: 200 })
                       //     } else if (hash){
                              // let requestObj = {
                              //     firstName: req.body.firstName,
                              //     lastName: req.body.lastName,
                              //     phoneNumber: req.body.phoneNumber,
                              //     email : req.body.email,
															// 		dob : req.body.dob,
															// 		gender :req.body.gender,
															// 		boi : req.body.boi,
                              //     password : hash
                              //     };
                              //    if(requestObj.firstName && requestObj.lastName && requestObj.phoneNumber && requestObj.email && requestObj.boi && requestObj.gender){

														                            	data = data.data;
															                            data.password = encodePassword(password.toString());
															                            let access_token = encodeToken(phone_number);
															                            data.access_token = access_token;
															                            //let user_id = createUniqueId('USER');
															                            //data.user_id = user_id;
															                           // data.is_verified = 0;
															                            // let verification_code = generateRandomString();
															                          //  let verification_code = 123456;
															                            data.verification_code = verification_code;
																													User.save(UserModel, data).then((response) => {

																	         User.create(requestObj).then((success)=>{
                                           console.log('register successfully');
																					   console.log('your account has been register and otp send sucessfully on you mob no');
                                            //res.json({meassage :"New Account has been register successfully",data:success,status : 200})
                                            let otp = Math.floor((Math.random() * 100000) + 1);
                                            success.otp = otp;
                                            success.otpExpire = Date.now() + 3600000000;
                                            success.save(function(err,result){
                                              if(err){ return res.json({message : "error due to db error",status  :400})
                                            }
                                            else if(result){
                                           client.messages.create(
                                            {
                                             to: '+91'+requestObj.phoneNumber,
                                             from: '+12568297885',
                                             body: 'Hi this is  otp no'+ otp
                                           },
                                            (err, message) => {
                                            if(err)  res.json({ message : "Unable to  send", error : err});
                                            if(message){
																							return res.json({meassage :"New Account has been register successfully and otp send sucessfully on you mob no",data:success,status : 200})
                                              console.log('your account has been register and otp send sucessfully on you mob no');
                                           }
                                         }
                                       )
                                    }else{ return res.json({message : "please enter valid inputs"})}
                                  })
                                }).catch((unsuccess)=>{
                              return  res.json({ message: "Please enter the correct inputs", status: 400,unsuccess:unsuccess })
                              console.log("there are the error",unsuccess);
                          })
                        }
                          else {
														 return res.json({ message : "Please enter the all required field ",status : 400 })
                        console.log(err)
											}

                    }
                     else {
                      return  res.json({  message: "Password is unable to bcrypt" , status: 400 })
                    }
                })
              }
              else {
              return  res.json({messagge : "This phoneNumber is  already register with us",status : 400})}
             }).catch((err)=>{
							 console.log('there are the error to get data',err)
          return  res.json({ message: "Please enter the correct phoneNumber ",err});
        })
			}
			else {
					res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(data.data))
			}

    // }else {
    // return  res.json({ message: "Password and confirmPassword not match " });
    // }
  },
 'otpVerify'  :  (req,res)=>{
    var phoneNumber = req.body.phoneNumber;
    var otp = req.body.otp;
    User.findOne({_id: req.body.userId},{}).then((data)=>{
                if(data.otp == otp){
                if (data.verifypPhoneNumber.verificationStatus === true){ // already verified
                  console.log("account verified");
                  return  res.json({status : 400,message: "Your Phone number is  already verified."});
                }else { // to be verified
                  data.verifypPhoneNumber.verificationStatus = true;
                    data.save((err,success)=>{
                      if(err){
                          return  res.json({message :"Please enter the valid keys",status : 400})
                        }else if(success){
                                        return  res.json({message : "your phoneNumber verified successfully",data : data,status : 200})
                                      }else {
                                          return  res.json({message :"Please enter the valid keys",status : 400})
                                        }
                          })
               }
             }else {
               return res.json({message : "please enter the valid opt",status  : 400})
           }
                }).catch((err)=>{
                  console.log(err)
            return  res.json({message: "otp is expired.",status : 400});
    })
  },

	 'forgotPassword' : (req,res)=>{
		 let phoneNumber = req.body.phoneNumber;
		 let email       = req.body.email;
		 if(phoneNumber){
	                 User.findOne({phoneNumber : req.body.phoneNumber},{}).then((data)=>{
	                   if(!data.IsDelete == true){
	                     let otp = Math.floor((Math.random() * 100000) + 1);
	                     data.otp = otp;
	                     data.otpExpire = Date.now() + 36000;
	                           data.save(function (err, data){
	                           if(err){
	                            return res.json({message : "Please enter the valid phoneNumber",status : 400})
	                           }else if(data){
	                            return res.json({message : "reset verification OTP has been send successfully on your Phone number",ststus : 200})
	                           client.messages.create(
	                            {
	                             to: '+91'+data.phoneNumber,
	                             from: '+12568297885',
	                             body: 'forgot password otp '+ otp
	                           },
	                            (err, message) => {
	                            if(err) res.json({ message : "Unable to  send", error : err});
	                            if(message){
	                              console.log('Forget password otp send sucessfully on you Phone no');
	                           }
	                         }
	                       )
	                    }else{
	                      return res.json({message : "Unable to generate the otp",status : 400})
	                    }

	                })
	              }else{
	              return res.json({message :  "Your Account is not register with us first and then try",status : 400})
	              }

	                   }).catch((err)=>{
	                 return res.json({message : "Please enter the valid Phone No",status : 400})
									 console.log('there are the error to pass data',err)
	             })
						 }else if(email){
                User.findOne({email : req.body.email},{}).then((data)=>{
                  if(data){
                      let otp = Math.floor((Math.random() * 100000) + 1);
                       data.otp = otp;
											 data.otpExpire = Date.now() + 36000;
                       data.save(function(err,success){
                          if(err){
                          return resHndlr.apiResponder(req, res,'Please enter the correct email', 400)
                          }else if(success){
                           resHndlr.apiResponder(req, res,'otp  has been send successfully on your Email Id',200)
                             globalFunction.forgotPasswordMail(data,data._id,req.body.email, 'subject', 'text', (err, result) =>{
                             if(err){
                                console.log('please enter the correct email')
                           }else{
                            return resHndlr.apiResponder(req, res,'Please enter the correct email',400)
                          }
                       })
                     }else{

                       return resHndlr.apiResponder(req, res,'Please enter the correct email',400)
                   }
                     })

                 }else{
                   return resHndlr.apiResponder(req, res,'Please enter the correct email',400)
                 }
                   }).catch((err)=>{
                return resHndlr.apiResponder(req, res,'Please enter the correct email',400)
             })
           }
				 },
			'resetPassword' : (req,res)=>{
         var _id = req.body.userId;
         var newPassword = req.body.newPassword;
         var confirmNewPassword = req.body.confirmNewPassword;
         bcrypt.genSalt(10, function(err, salt){
           if(err){
             return resHndlr.apiResponder(req, res,'Something want wrong due to incurrect tooken',400)}
           else if(salt){
            if(_id && newPassword && confirmNewPassword){
              if(newPassword == confirmNewPassword){
               User.findOne({_id : req.body.userId },{}).then((data)=>{
                 if(data){
                   console.log('there are the all data has been received sussessfully',data)
                   bcrypt.hash(newPassword,salt,(err,hash)=>{
                   if(err){
                     return resHndlr.apiResponder(req, res,'Something want wrong due to incurrect tooken',400)
                    }else if(hash){
                    data.password = hash;
                  console.log('there are the hash is generated successfully',data.password);
                  data.save(function(err,success){
                    if(err){
                   return resHndlr.apiResponder(req, res,'Something want wrong',400)
                 }else if(success){
                   resHndlr.apiResponder(req, res, 'New Password changed successfully',200,data)
                }
              })
            }else {
              return resHndlr.apiResponder(req, res,'Something want wrong',400)
            }
          })
        }else{   return resHndlr.apiResponder(req, res,'Please enter the correct verificationToken',400)}
        }).catch((err)=>{

          return resHndlr.apiResponder(req, res,'Please enter the the correct token',800)

      })
    }else {return resHndlr.apiResponder(req, res,'newPassword and confirmNewPassword are not matched',400)}
      }else{
        return resHndlr.apiResponder(req, res,'Please enter the required',400)
      }
    }
    })
  },
	'login': (req, res) => {
		 if(req.body.password && req.body.email){
					//  resHndlr.apiResponder(req, res,"please enter the required fields", 400)
				 // }
			 //else{
			 User.findOne({email: req.body.email},function(err, record) {
					 if (err)
							 return resHndlr.apiResponder(req, res, "this email id does not exist ", 400)
					 else if (record) {
						 console.log('this is going there are ',record)
							 if(record.verifyEmail.verificationStatus == true || record.verifyEmail.verificationStatus == 'True'){
							 bcrypt.compare(req.body.password, record.password, (err, data) =>{
									 if (data) {
													 var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
											 resHndlr.apiResponder(req, res, "user login successfully",200,record,token)

											 //    resHndlr.apiResponder({req, res, "User loggin successfully successfully", auth : true,token : token , data : data })

										 var userid =  (req, res)=>{
											var token = req.headers['token'];
											jwt.verify(token, "name", (err, decoded)=>{
												if (err) return res.json(err);
												return res.json(decoded);
											});
							}
						}

									 else
											 {
												 console.log(err)
										return resHndlr.apiResponder(req, res, "Password Missmatch", 400)
									 }
							 })
						 }else{
					 return  resHndlr.apiResponder(req, res, 'your email is not verified first please verified the email.', 400)
						}

					 } else
						return resHndlr.apiResponder(req, res, "email Id does not exist", 400)
			 })
	 } else if(req.body.password && req.body.email){
		 User.findOne({phoneNumber: req.body.phoneNumber},function(err, record) {
				 if (err)
						 return resHndlr.apiResponder(req, res, "this phoneNumber  does not exist ", 400)
				 else if (record) {
					 console.log('this is going there are ',record)
						 if(record.verifypPhoneNumber.verificationStatus == true || record.verifypPhoneNumber.verificationStatus == 'True'){
						 bcrypt.compare(req.body.password, record.password, (err, data) =>{
								 if (data) {
												 var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
										 resHndlr.apiResponder(req, res,"user login successfully",200,record,token)

										 //    resHndlr.apiResponder({req, res, "User loggin successfully successfully", auth : true,token : token , data : data })

									 var userid =  (req, res)=>{
										var token = req.headers['token'];
										jwt.verify(token, "name", (err, decoded)=>{
											if (err) return res.json(err);
											return res.json(decoded);
										});
						}
					}

								 else
										 {
											 console.log(err)
									return resHndlr.apiResponder(req, res, "Password Missmatch", 400)
								 }
						 })
					 }else{
				 return  resHndlr.apiResponder(req, res, 'your email is not verified first please verified the email.', 400)
					}

				 } else
					return resHndlr.apiResponder(req, res, "email Id does not exist", 400)
		 })
	 }
 }

}
