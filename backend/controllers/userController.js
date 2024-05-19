import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }
    //if no user then create a new user
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong1" });
  }
};

// export { registerUser };
