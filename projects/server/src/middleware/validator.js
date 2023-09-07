const {body, validationResult} = require("express-validator")

const loginValidator = [
    body("email").notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Invalid email address format"),
    body("password").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 8 character, one uppercase, one number, and one special case character"),
]
const changeNameValidator = [
    body("newName").notEmpty().withMessage("Name cannot be empty")
      .matches(/^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/)
      .withMessage("Name must contain at least 6 characters, one uppercase"),
  ];

  const changePasswordValidator = [
    body("currentPassword").notEmpty().withMessage("Password cannot be empty"),
    body("newPassword").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 8 character, one uppercase, one number, and one special case character"),
    body("confirmPassword").custom((confirmPassword, {req}) => {
      if(confirmPassword !== req.body.newPassword){
        throw new Error("Password not match")
      }
      return true
    })
  ]

  const changeEmailValidator = [
    body("newEmail").notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Invalid email address format"),
  ]
  
  const genderValidator = [
    body("chooseGender").notEmpty().withMessage("Choose gender is required"),
]

  const birthdateValidator = [
    body("newBirthdate").notEmpty().withMessage("Birthday is required"),
]
const validateRegist = (req, res, next) => {
    const errors = validationResult(req);
  //   validationResult memiliki method isEmpty untuk mengembalikan nilai true/false
    if (errors.isEmpty() === false) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

module.exports = {loginValidator, changeEmailValidator, changeNameValidator, changePasswordValidator, birthdateValidator, genderValidator, validateRegist}