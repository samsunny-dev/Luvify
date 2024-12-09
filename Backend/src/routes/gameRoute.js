const express = require("express");
const {startGame, submitGame, getGameResults} = require("../controller/gameController/gameController");


const router = express.Router();

router.post("/startGame", startGame);
router.post("/submitGame", submitGame);
router.get("/getGameResults", getGameResults);

module.exports = router;