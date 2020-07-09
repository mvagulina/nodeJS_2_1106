let express = require("express");
let { load, add, change, clear } = require("../controllers/basket-controller");

let router = express.Router();

router.get("/:id", load);
router.post("/:id", add);
router.put("/:id", change);
router.delete("/:id", clear);

module.exports = router;
