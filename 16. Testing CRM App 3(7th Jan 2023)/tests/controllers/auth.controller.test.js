const { mockRequest, mockResponse } = require("../interceptor")
const { signup, signin } = require("../../controllers/auth.controller")
const User = require("../../models/user.model")
const bcrypt = require("bcryptjs")
const db = require("../db")
const { JsonWebTokenError } = require("jsonwebtoken")

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDataBase())
afterAll(async () => await db.closeDatabase())

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

describe("SignUp", () => {
    it('should pass', async () => {
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload

        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                email: "test@relevel.com",
                name: "Test",
                userId: "1",
                userStatus: "APPROVED",
                userType: "CUSTOMER"
            })
        )
    })
    it('should return error', async () => {
        jest.spyOn(User, "create").mockImplementation(
            cb => {
                cb(new Error("This is an error"), null)
            }
        )
        const res = mockResponse(), req = mockRequest()
        testPayload.userType = "ENGINEER"
        req.body = testPayload

        await signup(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error while inserting the element"
        })
    })
})

describe("SignIn", () => {
    it('should fail due to password mismatch', async () => {
        testPayload.userStatus = "APPROVED"
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(
            Promise.resolve(testPayload)
        )
        const bcryptSpy = jest.spyOn(bcrypt, 'compareSync')
            .mockReturnValue(false)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)

        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith({
            message: "Invalid Password!"
        })

    })

    it('should not allow users who are not approved', async () => {
        testPayload.userStatus = 'PENDING'
        const userSpy = jest.spyOn(User, 'findOne')
            .mockReturnValue(Promise.resolve(testPayload))
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.send).toHaveBeenCalledWith({
            message: "Can't allow login as user is in status : [PENDING]"
        })
    })

    it(`should fail if the user doesn't exist`, async () => {
        const userSpy = jest.spyOn(User, 'findOne').mockReturnValue(null)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload;
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith({
            message: "Failed! Userid doesn't exist!"
        })
    })

    it(`should pass`, async () => {
        testPayload.userStatus = "APPROVED"
        const userSpy = jest.spyOn(User, "findOne")
            .mockReturnValue(Promise.resolve(testPayload))
        const bcryptSpy = jest.spyOn(bcrypt, 'compareSync')
            .mockReturnValue(true)
        const req = mockRequest()
        const res = mockResponse()
        req.body = testPayload
        await signin(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(bcryptSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                email: testPayload.email,
                name: testPayload.name,
                userId: testPayload.userId,
                userTypes: testPayload.userType,
                userStatus: testPayload.userStatus
            })
        )
    })
})