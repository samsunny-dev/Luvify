const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    statements: [

        {
            text: {type: "String", required: true},
            isLie:{type: "String", required: true}
        },
    ],

    guesses: [
        {

            userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
            guessedIndex: {type: Number},
            isCorrect: {type: Boolean},
            
    },
],

    createdAt: {type: Date, default: Date.now}

});

const GameSession = mongoose.model("GameSession", gameSessionSchema);
module.exports = GameSession;