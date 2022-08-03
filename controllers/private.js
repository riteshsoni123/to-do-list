const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getPrivateData = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(" ")[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      res.status(401).send("unauthorized");
    }
    const userId = decoded.id;

    const user = await User.findOne({ _id: userId });
    res.status(200).send(user);
  } else {
    res.status(500).json({
      sucess: false,
      data: "You did got access to the private data in this route",
    });
  }
};
