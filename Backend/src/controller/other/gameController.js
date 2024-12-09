const GameSession = require("../../model/gameSchema");

const startGame = async (req, res) => {
    const { creatorId, statements } = req.body;

    if (statements.length !== 3) {
        return res.status(400).json({ message: "You must provide exactly three statements" });
    }

    const hasOneLie = statements.filter((s) => s.isLie).length === 1;
    if (!hasOneLie) {
        return res.status(400).json({ message: "Exactly one statement must be marked as a lie" });
    }

    try {
        const newGame = new GameSession({
            creatorId,
            statements,
        });

        await newGame.save();
        res.status(201).json({ message: "Game created successfully", gameId: newGame._id });
    } catch (error) {
        res.status(500).json({ message: "Error creating game", error: error.message });
    }
};

const submitGuess = async (req, res) => {
    const { gameId, userId, guessedIndex } = req.body;

    try {
        const game = await GameSession.findById(gameId);
        if (!game) return res.status(404).json({ message: "Game not found" });

        const isCorrect = game.statements[guessedIndex]?.isLie || false;

        
        game.guesses.push({ userId, guessedIndex, isCorrect });
        await game.save();

        res.status(200).json({ message: "Guess submitted", isCorrect });
    } catch (error) {
        res.status(500).json({ message: "Error submitting guess", error: error.message });
    }
};

const getGameResults = async (req, res) => {
    const { gameId } = req.params;

    try {
        const game = await GameSession.findById(gameId).populate("guesses.userId", "name");
        if (!game) return res.status(404).json({ message: "Game not found" });

        res.status(200).json({
            creatorId: game.creatorId,
            statements: game.statements,
            guesses: game.guesses,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching game results", error: error.message });
    }
};


module.exports={startGame,submitGuess,getGameResults}