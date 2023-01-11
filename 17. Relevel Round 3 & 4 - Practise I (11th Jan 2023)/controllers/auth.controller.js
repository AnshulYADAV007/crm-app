const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin');
const Company = require('../models/Company');
const Student = require('../models/Student');

const { ADMIN, COMPANY, STUDENT } = require('../constants/roles');

exports.signup = async (req, res) => {

}