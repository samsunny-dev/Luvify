const BlockReport = require("../../model/safetyModel");

const reportUser = async (req, res) => {
    const { reportedUser, reason} = req.body;
    const reporter = req.userId;

    try {
        if (reporter === reportedUser) {
           return res.status(400).json({message: "You cannot report yourself"})
        }
        
        const existingReport = await BlockReport.findOne({reporter, reportedUser}); 


        if(existingReport) {
           return res.status(400).json({message: "You have already reported this user"});
        }

        const newReport = new BlockReport({reporter, reportedUser, reason});
        await newReport.save();

        res.status(201).json({message: "User reported successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error reporting user", error: error.message });
    }
};


const getReport = async (req, res) => {
    try {
        const reports = await BlockReport.findOne()
            .populate("reporter", "name email")
            .populate("reportedUser", "name email");
        res.status(200).json(reports);
    } catch(error) {
        res.status(500).json({ message: "Error fetching reports", error: error.message });
    }
};

const takeAction = async(req, res) => {
    const {reportId, action} = req.body;
    
    try {
        const report = await BlockReport.findOne(reportId);

        if(!report) {
            return res.status(400).json({message: "Report not found"});
        }

        report.actionTaken = action;
        await report.save();

        res.status.json({message: `Action ${action} taken successfully.`, report});
    } catch (error) {
        res.status(500).json({message: "error taking action"});
    }
};