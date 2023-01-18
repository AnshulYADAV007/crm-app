const orderController = require("../controller/order.controller")

module.exports = function (app) {
    app.get("/delivery-service/orders", orderController.findAll)
    app.get("/delivery-service/orders/:id", orderController.findById)
    app.post("/delivery-service/orders", orderController.create)
    app.patch("/delivery-service/orders/:id", orderController.update)
    app.delete("/delivery-service/orders/:id", orderController.remove)
}