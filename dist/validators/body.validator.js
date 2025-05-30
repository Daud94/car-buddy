"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const Body = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.body);
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports.Body = Body;
