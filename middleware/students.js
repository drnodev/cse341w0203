const validator = require('../helpers/validate');


const validateNewStudent = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        email: 'required|email',
        age: 'required|integer|min:16',
        major: 'required|string',
        registrationDate: 'required|date',
        status: 'required|string|in:active,inactive,graduated',
        gpa: 'required|numeric|min:0|max:4'
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

const validateUpdateStudent = (req, res, next) => {
    const validationRule = {
        name: 'string',
        email: 'email',
        age: 'integer|min:16',
        major: 'string',
        registrationDate: 'date',
        status: 'string|in:active,inactive,graduated',
        gpa: 'numeric|min:0|max:4'
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

module.exports = {validateNewStudent, validateUpdateStudent};