var express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.send("welcome");
});

module.exports = router;
