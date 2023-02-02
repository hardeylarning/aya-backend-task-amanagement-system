import User from "../model/users/user-model.js";

import bcrypt from 'bcrypt'
import generateToken from "../util/jwt/generate-token.js";

export const userRegisterController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.json({ status: "error", message: "Oop! User is already registered" });

    // hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
 
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: passwordHash
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const userLoginController = async (req, res) => {
    const { email, password} = req.body
  try {
    const foundUser = await User.findOne({email})
    if(!foundUser) return res.json({message: "Incorrect email or password!"})

    const foundPassword = await bcrypt.compare(password, foundUser.password)

    if(!foundPassword) return res.json({message: "Incorrect email or password!"})

    res.json({
      status: "success",
      data: {
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        userId: foundUser._id,
        token: generateToken(foundUser._id)
      },
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const usersController = async (req, res) => {
  try {
    const users = await User.find({})
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const userGetController = async (req, res) => {
    // to get parameter
    // const {id} = req.params;
    try {
        const foundUser = await User.findById(req.userAuth)
        if(!foundUser) return res.json({status: "error", message: "No user found for the id passed!"})

      res.json({
        status: "success",
        data: foundUser,
      });

    } catch (error) {
      res.json(error.message);
    }
  };
export const userGetByEmailController = async (req, res) => {
  const {email} = req.params
  try {
    const foundUser = await User.findOne({email})
    if(!foundUser) return res.json({status: "error", message: "No user found for the email passed!"})

      res.json({
        status: "success",
        data: foundUser,
      });

    } catch (error) {
      res.json(error.message);
    }
  };
  
  export const userDeleteController = async (req, res) => {
    try {
      res.json({
        status: "success",
        data: "deleted sucessfully",
      });
    } catch (error) {
      res.json(error.message);
    }
  };

export const userUpdateController = async (req, res) => {
  try {
    const foundUser = await User.findOneAndUpdate({_id: req.userAuth}, req.body, {
      new: true,
      runValidators: true
    })
    if(!foundUser) return res.json({status: "error", message: "No user found for the id passed!"})

    res.json({
      status: "success",
      data: `Dear ${foundUser.firstname}, your profile has been updated successfully`,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export const userForgotPasswordController = async (req, res) => {
  const {email} = req.params
  const {password} = req.body
  try {
    const foundUser = await User.findOne({email})
    if(!foundUser) return res.json({status: "error", message: "No user found for the email passed!"})

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await User.updateOne({email: foundUser.email}, {
      $set: {password: passwordHash}
    })

    if (!user) return res.json({status: "error", message: "Network Error!"})

    res.json({
      status: "success",
      data: `Dear ${foundUser.firstname}, your password has been changed sucessfully`,
    });
  } catch (error) {
    res.json(error.message);
  }
};
