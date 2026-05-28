const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");


// ================= REGISTER =================
router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body;

    // VALIDATION
    if (!name || !email || !password) {

      return res.status(400).json({

        success: false,

        message: "All fields are required"

      });

    }

    // CHECK USER
    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({

        success: false,

        message: "User already exists"

      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      phone,
      role: "user"

    });

    // REMOVE PASSWORD
    const userData = await User.findById(user._id)
    .select("-password");

    res.status(201).json({

      success: true,

      message: "User Registered Successfully",

      user: userData

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // CHECK EMAIL
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({

        success: false,

        message: "User not found"

      });

    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(

      password,
      user.password

    );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message: "Invalid password"

      });

    }

    // UPDATE ACTIVE STATUS
    user.isActive = true;

    await user.save();

    // GENERATE TOKEN
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        phone: user.phone,

        role: user.role,

        isActive: user.isActive

      }

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});


// ================= GET ADMINS =================
router.get("/admins", async (req, res) => {

  try {

    const admins = await User.find({

      role: "admin"

    }).select("-password");

    res.status(200).json({

      success: true,

      admins

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});


module.exports = router;