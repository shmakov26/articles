const errorHandler = (err, req, res, next) => {
    console.error('ERROR:', err.message);

    if (err.name !== 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Validation error',
            message: err.message,
        });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Constraint error',
            message: err.message,
        });
    }

    res.status(err.status || 500).json({
        error: 'Internal Server Error',
        message: err.message,
    });
};

module.exports = errorHandler;