const db = require("../db");

const getAllRestaurents = async (req, res) => {
  try {
    // const listrestaurants = "SELECT * FROM restaurants"
    const listRestaurantsWithRatings = `select * from restaurants
    left join(
        select restaurant_id, count(*) as count,TRUNCATE(AVG(rating),1) as average_rating from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id`;

    const list = await db
      .execute(listRestaurantsWithRatings)
      .then(([rows, metaData]) => {
        console.log("rows----", rows);
        return rows;
      })
      .catch((err) => {
        console.log("error", err);
      });
    res.json({
      status: "success",
      data: { restaurants: list },
      msg: "list all restaurents",
    });
  } catch (err) {
    console.log("error", err);
    res.json({
      status: "error",
      msg: err,
    });
  }
};

const getSingleRestaurent = async (req, res) => {
  try {
    if (req.params.id) {
      //  const txtSQL = "SELECT * FROM restaurants WHERE id = ?";
      const txtSQL = `select * from restaurants
left join(
    select restaurant_id, count(*) as count,TRUNCATE(AVG(rating),1) as average_rating from reviews
    group by restaurant_id
) reviews on restaurants.id = reviews.restaurant_id where id =?`;

      const restaurantReviewsSQL =
        "SELECT * FROM reviews WHERE restaurant_id = ?";

      const result = await db
        .execute(txtSQL, [req.params.id])
        .then(([rows, metaData]) => {
          return rows;
        })
        .catch((err) => {
          console.log("error", err);
        });

      const reviewsResult = await db
        .execute(restaurantReviewsSQL, [req.params.id])
        .then(([rows, metaData]) => {
          console.log("reviews", rows);
          return rows;
        })
        .catch((err) => {
          console.log("get restaurant reviews error", err);
        });

      if (result.length === 0) {
        return res.json({
          status: "error",
          msg: "item not found",
        });
      }
      // if (reviewsResult.length === 0) {
      //   return res.json({
      //     status: "error",
      //     msg: "reviews not found",
      //   });
      // }
      console.log("roooo", reviewsResult);
      return res.json({
        status: "success",
        restaurant: result[0],
        reviewsData: reviewsResult,
        msg: "single restaurent get successfully",
      });
    } else {
      return res.json({
        status: "error",
        msg: "params not found",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.json({
      status: "error",
      msg: err,
    });
  }
};

const createRestaurent = async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const txtSQL =
      "INSERT INTO restaurants ( name, location, price_range) values (?,?,?)";
    // const result = await db.execute(txtSQL, [name, location, price_range]);
    const result = await db
      .execute(txtSQL, [name, location, price_range])
      .then(([rows, metaData]) => {
        console.log("result", rows);
        return rows;
      })
      .catch((err) => {
        console.log("error===", err);
        return res.json({
          status: "error",
          msg: err,
        });
      });
    console.log("ll", result);
    return res.json({
      status: "success",
      data: result,
      msg: "create restaurent",
    });
  } catch (err) {
    console.log("error", err);
    return res.json({
      status: "error",
      msg: err,
    });
  }
};

const updateRestaurent = async (req, res) => {
  try {
    if (req.params.id) {
      const { name, location, price_range } = req.body;
      const txtSQL =
        "UPDATE restaurants SET name = ?, location = ?, price_range = ? WHERE id=?";
      const result = await db
        .query(txtSQL, [name, location, price_range, req.params.id])
        .then(([rows, metaData]) => {
          console.log("result", rows);
          return rows;
        })
        .catch((err) => {
          console.log("error", err);
        });

      console.log("ll", result);
      return res.json({
        status: "success",
        data: req.params.id,
        msg: "update restaurent",
      });
    } else {
      return res.json({
        status: "error",
        msg: "params not found",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.json({
      status: "error",
      msg: err,
    });
  }
};

const deleteRestaurent = async (req, res) => {
  try {
    if (req.params.id) {
      const txtSQL = "DELETE FROM restaurants WHERE id=?";
      const result = await db
        .query(txtSQL, [req.params.id])
        .then(([rows, metaData]) => {
          console.log("result", rows);
          return rows;
        })
        .catch((err) => {
          console.log("error", err);
          return res.status(400).json({
            status: "error",
            msg: err,
          });
        });

      console.log("ll", result);
      return res.status(200).json({
        status: "success",
        data: req.params.id,
        msg: "delete restaurent",
      });
    } else {
      return res.status(400).json({
        status: "error",
        msg: "params not found",
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.status(400).json({
      status: "error",
      msg: err,
    });
  }
};

const addReviews = async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    const txtSQL =
      "INSERT INTO reviews (restaurant_id ,name,review,rating) values (?,?,?,?) ";
    const result = await db
      .execute(txtSQL, [req.params.id, name, review, rating])
      .then(([rows, metaData]) => {
        // console.log("result", rows);
        return rows;
      })
      .catch((err) => {
        console.log("error===", err);
        return res.json({
          status: "error",
          msg: err,
        });
      });
    return res.json({
      status: "success",
      data: result,
      msg: "Add review Successfully",
    });
  } catch (err) {
    console.log("error", err);
    return res.json({
      status: "error",
      msg: err,
    });
  }
};

module.exports = {
  getAllRestaurents,
  getSingleRestaurent,
  createRestaurent,
  updateRestaurent,
  deleteRestaurent,
  addReviews,
};
