let express = require("express");
let { createAccount, login } = require("../controllers/auth-controller");

let router = express.Router();
router.get("/", (req, res) => { console.log(`get auth`)
});

router.post("/", login);

module.exports = router;
