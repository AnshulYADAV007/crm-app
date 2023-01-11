const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin');
const Company = require('../models/Company');
const Student = require('../models/Student');

const { ADMIN, COMPANY, STUDENT } = require('../constants/roles');

exports.signUp = async (req, res) => {
    const { role } = req.params
    const { firstName, lastName, email, password } = req.body

    // email => email : 'vivek@gmail.com'
    const isEmailExistInAdmins = await Admin.findOne({ email });
    const isEmailExistInCompanies = await Company.findOne({ email });
    const isEmailExistInStudents = await Student.findOne({ email });

    if (isEmailExistInAdmins || isEmailExistInCompanies || isEmailExistInStudents) {
        return res.status(400).send({
            message: 'The email address is already in use by another account.'
        })
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    if (role === COMPANY) {
        const company = new Company({
            firstName,
            lastName,
            email,
            password: hash
        })

        const token = jwt.sign({ _id: company._id, role }, process.env.JWT_SECRET)

        company
            .save()
            .then(data => {
                const user = data.toObject()
                delete user.password
                res.status(201).send({ user, token })
            })
            .catch(error => res.status(400).send({
                message: "Internal Server Error!"
            }))
    } else if (role == STUDENT) {
        const student = new Student({
            firstName,
            lastName,
            email,
            password: hash
        })

        const token = jwt.sign({ _id: student._id, role }, process.env.JWT_SECRET)

        student
            .save()
            .then(data => {
                const user = data.toObject()
                delete user.password
                res.status(201).send({ user, token })
            })
            .catch(error => res.status(400).send({
                message: "Internal Server Error!"
            }))
    }

}

const signInRole = async (roleModel, role, req, res) => {
    const { email, password } = req.body

    // Find the user
    const user = await roleModel.findOne({ email });

    console.log(user)

    if (!user)
        return res.status(400).send({
            message: 'There is no user record corresponding to this identifier.'
        });

    // Check the Password
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword)
        return res.status(400).send({ message: 'The password is invalid.' });


    // Send the data
    const token = jwt.sign({ _id: user._id, role }, process.env.JWT_SECRET);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).send({ user: userData, token });
}

exports.signIn = async (req, res) => {
    const { role } = req.params

    if (role === ADMIN) {
        await signInRole(Admin, role, req, res)
    } else if (role === COMPANY) {
        await signInRole(Company, role, req, res)
    } else {
        await signInRole(Student, role, req, res)
    }
}