const { mockRequest, mockResponse } = require("../../tests/interceptor")
const { update, findAll, findById } = require("../../controllers/user.controller")
const User = require("../../models/user.model")
const interceptor = require("../../tests/interceptor")

const userTestPayload = {
    userType: "CUSTOMER",
    password: "12345678",
    userStatus: "APPROVED",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    ticketsCreated: [],
    ticketsAssigned: [],
    exec: jest.fn()
}

describe("Update", () => {
    it('should fail if no user found', async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate')
            .mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(null)
            }))
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        req.body = userTestPayload
        await update(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({
            message: 'No user with id found!'
        })
    })

    it('should fail due to internal error', async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate')
            .mockReturnValue(cb => cb(new Error("This is an error")), null)
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        await update(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        })

    })

    it('should pass', async () => {
        const userSpy = jest.spyOn(User, 'findOneAndUpdate')
            .mockImplementation(() => ({
                exec: jest.fn().mockReturnValue(userTestPayload)
            }))
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        req.body = userTestPayload
        await update(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({
            message: `User record has been updated successfully`
        })

    })
})

describe("Find By Id", () => {
    it('should fail if no user found', async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([]))
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        req.body = userTestPayload
        await findById(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith({
            message: `User with this id [1] is not present`
        })
    })

    it('should fail due to internal error', async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(cb => cb(new Error("This is an error")), [])
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        await findById(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message: "Internal Server Error"
        })

    })

    it('should pass', async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([userTestPayload]))
        const req = mockRequest()
        const res = mockResponse()
        req.params = { userId: 1 }
        await findById(req, res)
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    userType: userTestPayload.userType,
                    name: userTestPayload.name,
                    userId: userTestPayload.userId,
                    email: userTestPayload.email,
                    userStatus: userTestPayload.userStatus
                })
            ])
        )
    })
})

describe('FindAll', () => {
    it("should pass", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userStatus", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = { userStatus: "APPROVED" }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userType", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = { userType: "CUSTOMER" }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with userType and Status", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {
            userType: "CUSTOMER",
            userStatus: "APPROVED"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should pass with name", async () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.resolve([userTestPayload]));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {
            name: "test"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    email: "test@relevel.com",
                    name: "Test",
                    userId: 1,
                    userStatus: "APPROVED",
                    userType: "CUSTOMER"
                })
            ])
        );
    })
    it("should fail", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {}
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userStatus", async () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = { userStatus: "APPROVED" }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userType", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = { userType: "CUSTOMER" }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with userType and Status", async () => {
        const userSpy = jest.spyOn(User, 'find')
            .mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {
            userType: "CUSTOMER",
            userStatus: "APPROVED"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
    it("should fail with name", async () => {
        const userSpy = jest.spyOn(User, 'find').mockReturnValue(Promise.reject(new Error("error")));
        const req = mockRequest();
        const res = mockResponse();
        req.query = {
            name: "test"
        }
        await findAll(req, res);
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error occured"
        });
    })
})