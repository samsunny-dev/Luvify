const express = require("express");
const {startGame,submitGuess,getGameResults} = require("../controller/main/gameController");


const router = express.Router();

router.post("/startGame", startGame);
router.post("/submitGame", submitGuess);
router.get("/getGameResults", getGameResults);



module.exports = router;