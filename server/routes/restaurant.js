const express = require("express");
const app = express();
const rest = require("../controllers/restaurant-controller");
const {
  getAllRestaurents,
  getSingleRestaurent,
  createRestaurent,
  updateRestaurent,
  deleteRestaurent,
  addReviews,
} = rest;

const router = express.Router();

router.get("/all", getAllRestaurents);
router.get("/:id", getSingleRestaurent);
router.post("/", createRestaurent);
router.put("/:id", updateRestaurent);
router.delete("/:id", deleteRestaurent);
router.post("/:id/addReview", addReviews);

module.exports = router;
