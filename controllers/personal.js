const List = require("../models/List");

exports.getPrivateData = async (req, res, next) => {
  const user = req.user;
  res.status(200).send(user);
};

exports.addelement = async (req, res, next) => {
  try {
    const { element } = req.body;

    const list = new List({
      element,
      user: req.user.id,
    });

    const saveList = await list.save();

    res.json(saveList);
  } catch (error) {
    res.status(500).send("can't save the element");
  }
};

exports.getList = async (req, res, next) => {
  try {
    const list = await List.find({ user: req.user.id });
    return res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "can't fond the notes for this user" });
  }
};
