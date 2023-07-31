const Opportunity = require('../Models/opportunityModel');

const getAllOpportunities = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        // const skip = (page - 1) * limit;
        const allOpportunity = await Opportunity.find()
        res.status(200).json({ results: allOpportunity.length, page, data: allOpportunity });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getOpportunityById = async (req, res) => {
    try {
        const _id = req.params.id;
        const opportunity = await Opportunity
            .findById(_id)
            .populate({
                path: "owner profile",
                select: "-tokens",
              })
        if (!opportunity) {
            return res.status(404).send({ msg: ` No opportunity for this id ${_id}` });
        }
        res.status(200).json([opportunity]);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const updateOpportunity = async (req, res) => {
    try {
        const id = req.params.id;
        const opportunity = await Opportunity.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!opportunity) {
            return res.status(404).send({ msg: ` No opportunity for this id ${_id}` });
        }
        if (opportunity.progress != "open") res.status(400).send(`Cannot edit, this opportunity is already ${opportunity.progress}`)
        res.status(200).json({ data: opportunity });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const createOpportunity = async (req, res) => {
    try {
        const opportunity = new Opportunity({
            ...req.body,
            owner: req.user.id,
            profile: req.profile._id
        });
        opportunity.save()
        res.status(201).json(opportunity);
    } catch (error) {
        res.status(400).json(error.message);
    }
};


const deleteOpportunity = async (req, res) => {
    try {
        const _id = req.params.id;
        const opportunity = await Opportunity.findOneAndDelete(_id);
        if (!opportunity) {
            return res.status(404).json({ msg: ` No opportunity for this id ${_id}` });
        }
        if (opportunity.progress != "open") res.status(400).send(`Cannot delete, this opportunity is already ${opportunity.progress}`)

        res.status(204).send('deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    createOpportunity,
    deleteOpportunity,
};
