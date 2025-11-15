const validator = require('../helpers/validate');

const validateNewCourse = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        code: 'required|string',
        credits: 'required|integer|min:1|max:6',
        instructor: 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};


const validateUpdateCourse = (req, res, next) => {
    const validationRule = {
        title: 'string',
        code: 'string',
        credits: 'integer|min:1|max:6',
        instructor: 'string'
    };

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "No fields provided for update."
        });
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = { validateNewCourse,validateUpdateCourse };
