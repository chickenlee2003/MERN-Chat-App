import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60;

const createToken = (user, userId) => {
  return jwt.sign({ user, userId }, process.env.JWT_KEY, { expiresIn: maxAge });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user._id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          profileSetup: user.profileSetup,

        },
      });
  } catch (error) {
    console.log({ error });
    res.status(500).json("Internal server error");
  }
};


export const login = async (req, res, next) => {
    console.log("login" );
    
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }
      const user = await User.findOne({ email});
      if(!user){
        return res.status(404).send("User not found");
      }
      const auth = await compare(password, user.password);
      if (!auth) {
        return res.status(401).send("Password incorrect");
      }
      res.cookie("jwt", createToken(email, user._id), {
        maxAge,
        secure: true,
        sameSite: "None",
      });
      res.status(200).json({
          user: {
            id: user.id,
            email: user.email,
            profileSetup: user.profileSetup,
            fristName: user.fristName,
            lastName: user.lastName,
            image: user.image,
            color: user.color,
          },
        });
    } catch (error) {
      console.log({ error });
      res.status(500).json("Internal server error");
    }
  };
  