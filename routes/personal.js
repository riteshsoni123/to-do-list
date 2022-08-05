const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getPrivateData,
  getList,
  addelement,
  deleteelement,
  editelement,
} = require("../controllers/personal");

router.route("/private").get(protect, getPrivateData);

router.route("/addelement").post(protect, addelement);

router.route("/getlist").get(protect, getList);

router.route("/deleteelement/:id").post(protect, deleteelement);

router.route("/editelement").post(protect, editelement);

module.exports = router;
