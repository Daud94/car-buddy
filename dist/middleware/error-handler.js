"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const joi_1 = __importDefault(require("joi"));
const app_error_1 = require("../utils/app-error");
const errorHandler = (err, req, res, next) => {
    // Log error with more context
    console.error({
        message: err?.message,
        stack: err?.stack,
        url: req.url,
        method: req.method,
        timestamp: new Date().toISOString(),
    });
    // Joi validation errors
    if (err instanceof joi_1.default.ValidationError) {
        const errors = err.details.map((detail) => ({
            field: detail.path.join('.'),
            message: detail.message,
        }));
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }
    // Handle AppError instances
    if (err instanceof app_error_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }
    if (err.name === 'SequelizeUniqueConstraintError') {
        const field = err.errors[0]?.path || 'field';
        console.error('Database unique constraint failed', field);
        return res.status(409).json({
            success: false,
            message: `${field} already exists`,
            code: 'UNIQUE_CONSTRAINT_ERROR',
            field,
        });
    }
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        console.error('Invalid foreign key reference', 'FOREIGN_KEY_ERROR');
        return res.status(400).json({
            success: false,
            message: 'Invalid reference to a related resource',
            code: 'FOREIGN_KEY_ERROR',
        });
    }
    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            success: false,
            message: 'Database error occurred',
            code: 'DATABASE_ERROR',
        });
    }
    // Default error response
    const statusCode = err.statusCode || err.status || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;
    return res.status(statusCode).json({
        success: false,
        message
    });
};
exports.errorHandler = errorHandler;
