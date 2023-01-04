const { mockRequest, mockResponse } = require("../interceptor")
const { signup, signin } = require("../../controllers/auth.controller")
const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const db = require("../db")

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDataBase())
afterAll(async () => await db.closDatabase())

const testPayload = {
    userType: "CUSTOMER",
    password: "12345678",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    userStatus: "PENDING",
    ticketsCreated: [],
    ticketsAssigned: []
}