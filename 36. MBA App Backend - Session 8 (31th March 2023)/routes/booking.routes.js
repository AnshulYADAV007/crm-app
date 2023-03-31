const bookingController = require("../controllers/booking.controller")
const { verifyToken } = require("../middlewares/authjwt")
const { verifyBookingReqBody } = require("../middlewares")

module.exports = function (app) {
    app.get("/mba/api/bookings", [verifyToken], bookingController.getAllBookings);
    app.get("/mba/api/bookings/:id", [verifyToken], bookingController.getBookingById);
    app.post("/mba/api/bookings", [verifyToken, verifyBookingReqBody.validateBookingRequestBody], bookingController.createBooking);
    app.put("/mba/api/bookings/:id", [verifyToken], bookingController.updateBooking);
}