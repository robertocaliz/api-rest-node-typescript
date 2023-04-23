"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const { OK } = http_status_codes_1.StatusCodes;
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    res.send({
        message: 'Hi dev!'
    });
});
router.post('/cars', (req, res) => {
    const car = req.body;
    res.status(OK).json(car);
});
