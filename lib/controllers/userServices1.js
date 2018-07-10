//const BaseAPIController  = require('./BaseAPIController');
const User = require('../models/user.js');
const generatePassword = require('password-generator');
//const config = require('../../config.json');
const { successResult, verifyData, encodePassword, encodeEmail, serverError, mergeArray, countryCode, generateRandomString, validate, parameterMissing, createUniqueId } = require('../global/generic');
const twilio = require('../global/twilio');
//const mail = require('../modules/mail');
//const constant = require('/models/constant');
//const { encodeToken } = require('../modules/token');
const async =require ('async');
const _ = require(' lodash');
const { PARAMETER_MISSING_STATUS, BAD_REQUEST_STATUS, ALREADY_EXIST, SUCCESS_STATUS, INVALID_CREDENTIAL } = require('../constant/status');
const { USERNAME_EXIST, INVALID_ACCESS_TOKEN_MESSAGE, INVALID_MOBILE, INVALID_ARRAY, INVALID_PASSWORD_MESSAGE, INVALID_LOGIN_TYPE, INVALID_LOGIN_MESSAGE, USER_EXIST, LOGIN_SUCCESSFULLY_MESSAGE, MOBILE_NUMBER_MESSAGE, OTP_MATCHED, INVALID_VERIFICATION_CODE, USER_LOGOUT_MESSAGE, PASSWORD_CHANGE_MESSAGE, INVALID_EMAIL, OTP_SENT, VERIFICATION_MESSAGE } = require('../constant/message');
const { DELETE_IMAGE, DEFAULT_FILE, DEFAULT_FILE_ARRAY, DELETE_IMAGE_ARRAY } = require('../modules/image');
const jwt = require('jsonwebtoken');


//export class UserController extends BaseAPIController {

    /*Controller for create User*/
    exports = {
    'create' : (req, res) => {
        const UserModel = req.User;
        const AdminModel = req.Admin;

        let { firstName, lastname, phoneNumber, email, password, dob, gender, boi} = req.body;
        let data = validate({ firstName, lastname, phoneNumber, email, password, dob, gender, boi });
        if (data.status) {
                    User.findOne(UserModel,{ email }).then((result) => {
                        if (result) {
                            res.status(ALREADY_EXIST).json(parameterMissing(USER_EXIST));
                        } else {
                            data = data.data;
                            data.password = encodePassword(password.toString());
                            let access_token = encodeToken(phone_number);
                            data.access_token = access_token;
                            // let verification_code = generateRandomString();
                            User.save(UserModel, data).then((response) => { res.status(SUCCESS_STATUS).json(successResult({ is_verified: 0, email }, 'An OTP has been sent, Please verify.')) })


                    .catch((e) => {
                        res.status(BAD_REQUEST_STATUS).json(serverError(e));
                    });
                }
            }).catch((e) => {
                res.status(BAD_REQUEST_STATUS).json(serverError(e));
            });
        } else {
            res.status(PARAMETER_MISSING_STATUS).json(parameterMissing(data.data))
        }

    }
  }
