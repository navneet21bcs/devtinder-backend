const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    // console.log("token is here: ", token)

    const decodedObj = await jwt.verify(token, "VLMfNd_X_2osvBnN3vw7H9o6ANxlDTrdqlQQ");

    const { _id } = decodedObj;

    // 
    // console.log('id is: ', _id)

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
