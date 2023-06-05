const UserModel = require('../models/UserModel')
const UserRegistrationService = require('../services/UserRegistrationService')
const UserLoginService = require('../services/UserLoginService')
const UserProfileDetailService = require('../services/UserProfileDetailService')
const UserUpdateService = require('../services/UserUpdateService')
const UserUpdatePasswordWithLoginService = require('../services/UserUpdatePasswordWithLoginService')

exports.UserRegistration = async (req, res) => {
    const result = await UserRegistrationService(req, UserModel);
    res.status(200).json(result)
}

exports.UserLogin = async (req, res) => {
    const result = await UserLoginService(req, UserModel)
    res.status(200).json(result);
}

exports.UserProfileDetail = async (req, res) => {
    const result = await UserProfileDetailService(req, UserModel)
    res.status(200).json(result)
}

exports.UserProfileUpdate = async (req, res) => {
    const result = await UserUpdateService(req, UserModel)
    res.status(200).json(result);
}

exports.UserPasswordUpdateWithLogin = async (req, res) => {
    const result = await UserUpdatePasswordWithLoginService(req, UserModel);
    res.status(200).json(result);
}