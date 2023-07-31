const { Request } = require("../Models/mentorRequestModel");
const Opportunity = require("../Models/opportunityModel");

const addNewRequestApplicat = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id).populate('owner')
    if (!request) return res.status(404).send("Unable to find request");
    if (request.progress === "in progress")
      return res.status(400).send(`This request is already accepted by ${request.owner?.name || request.owner}`);
    else if (request.progress === "closed")
      return res.status(400).send("This request is already closed");
    if (request.applicants.indexOf(req.user.id) !== -1)
      return res.status(400).send('You have already applied')

    request.applicants = request.applicants.concat(req.user.id);
    await request.save();
    res.status(200).send('Applied Successfully');
  } catch (e) {
    console.log(e)
    res.status(500).send(e.message);
  }
}

const addNewOppApplicat = async (req, res) => {
  try {
    const id = req.params.id;
    const opp = await Opportunity.findById(id).populate('owner')
    if (!opp) return res.status(404).send("Unable to find opportunity");
    if (opp.progress === "in progress")
      return res.status(400).send(`This opportunity is already accepted by ${opp.owner?.name || opp.owner}`);
    else if (opp.progress === "closed")
      return res.status(400).send("This opportunity is already closed");
    if (opp.applicants.indexOf(req.user.id) !== -1)
      return res.status(400).send('You have already applied')
    opp.applicants = opp.applicants.concat(req.user.id);
    await opp.save();
    res.status(200).send('Applied Successfully');
  } catch (e) {
    console.log(e)
    res.status(500).send(e.message);
  }
}

module.exports = {
  addNewOppApplicat, addNewRequestApplicat
}