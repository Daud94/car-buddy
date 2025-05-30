"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const Query = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validate(req.query);
            next();
        }
        catch (e) {
            next(e);
        }
    };
};
exports.Query = Query;
