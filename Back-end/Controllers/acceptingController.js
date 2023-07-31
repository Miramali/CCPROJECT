const { Request } = require("../Models/mentorRequestModel");
const Opportunity = require("../Models/opportunityModel");
const Profile = require("../Models/ProfileModel");

const acceptRequest = async (req, res) => {
  try {
    // owner: mentee => applicatns: mentors => reqId: id, mentor: acceptedUser
    const { id, acceptedUser } = req.body;
    let isAnApplicant = false
    const request = await Request.findById(id)
      .populate("owner applicants")

    if (!request) return res.status(404).send("Unable to find request");
    if (request.progress === "in progress")
      return res.status(400).send(`This request is already accepted by ${req.acceptedBy}`);
    else if (request.progress === "close")
      return res.status(400).send("This request is already closed");
    if (req.user.id !== request.owner.toString())
      return res.status(401).send("You need to be the owner to perform this action")
    request.applicants.forEach(applicant => {
      if (applicant.toString() === acceptedUser)
        isAnApplicant = true
    })
    if (!isAnApplicant)
      return res.status(400).send('Mentor is not an applicant')
    const mentee = await Profile.findOne({ user: req.user.id });
    const mentor = await Profile.findOne({ user: acceptedUser });
    console.log("mentor", mentor.name, "mentee", mentee.name)
    if (!mentor || !mentee) return res.status(400).send("user have been deleted :(");
    mentor.dealtWith = mentor.dealtWith.concat(req.user.id);
    mentee.dealtWith = mentee.dealtWith.concat(acceptedUser);
    const from = new Date()
    const today = from
    const to = new Date(new Date().setDate(new Date().getDate() + (request.duration || 0)))
    mentor.busyDays.forEach(busy => {
      if (today >= busy.from && today <= busy.to)
        throw new Error("can't accept the one request while busy with another, mentor is busy! ")
    })
    mentee.busyDays.forEach(busy => {
      if (today >= busy.from && today <= busy.to)
        throw new Error("can't accept the one request while busy with another, mentee is busy! ")
    })

    mentor.busyDays = mentor.busyDays.concat({ from, to })
    mentee.busyDays = mentee.busyDays.concat({ from, to })
    request.time = { start: from, end: to }
    console.log(`busyDays: ${from, "...", to}`)
    request.progress = "in progress";
    request.acceptedBy = acceptedUser;
    console.log(request)

    await request.save();
    await mentor.save();
    await mentee.save();
    console.log(request);
    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const acceptOpp = async (req, res) => {
  try {
    // owner: mentor => applicatns: mentees => oppId: id, mentee: acceptedUser
    const { id, acceptedUser } = req.body;
    let isAnApplicant = false;
    const opp = await Opportunity.findById(id)
      .populate("owner applicants")
    if (!opp) return res.status(404).send("Unable to find opportunity");
    if (opp.progress === "in progress")
      return res.status(400).send(`This opportunity is already accepted by ${opp.acceptedBy}`);
    else if (opp.progress === "close")
      return res.status(400).send("This opportunity is already closed");
    if (req.user.id !== opp.owner.toString())
      return res.status(401).send("You need to be the owner to perform this action")
    opp.applicants.forEach(applicant => {
      if (applicant.toString() === acceptedUser)
        isAnApplicant = true
    })
    if (!isAnApplicant)
      return res.status(400).send('Mentor is not an applicant')
    const mentor = await Profile.findOne({ user: req.user.id });
    const mentee = await Profile.findOne({ user: acceptedUser });
    console.log("mentor", mentor.name, "mentee", mentee.name)
    if (!mentor || !mentee) return res.status(400).send("no user found");
    mentor.dealtWith = mentor.dealtWith.concat(acceptedUser);
    mentee.dealtWith = mentee.dealtWith.concat(req.user.id);
    const from = new Date()
    const today = from
    const to = new Date(new Date().setDate(new Date().getDate() + (opp.duration || 0)))
    mentor.busyDays.forEach(busy => {
      console.log(`from: ${busy.from}, today: ${today}, to: ${busy.to}`)
      if (today >= busy.from && today <= busy.to)
        throw new Error("can't accept the one opportunity while busy with another, mentor is busy! ")
    })
    mentee.busyDays.forEach(busy => {
      console.log(`from: ${busy.from}, today: ${today}, to: ${busy.to}`)
      if (today >= busy.from && today <= busy.to)
        throw new Error("can't accept the one opportunity while busy with another, mentee is busy! ")
    })
    mentor.busyDays = mentor.busyDays.concat({ from, to })
    mentee.busyDays = mentee.busyDays.concat({ from, to })
    opp.time = { start: from, end: to }
    console.log(`busyDays: ${from, "...", to}`)
    opp.progress = "in progress";
    opp.acceptedBy = acceptedUser;

    await opp.save();
    await mentor.save();
    await mentee.save();
    res.status(200).send(opp);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { id, rejectedUser } = req.body;
    let isAnApplicant = false;
    const request = await Request.findById(id)
      .populate("owner applicants")

    if (!request) return res.status(404).send("Unable to find request");
    if (request.progress === "in progress")
      return res.status(400).send(`This request is already accepted by ${req.acceptedBy}`);
    else if (request.progress === "close")
      return res.status(400).send("This request is already closed");
    if (req.user.id !== request.owner.toString())
      return res.status(401).send("You need to be the owner to perform this action")
    request.applicants.forEach((applicant, i) => {
      if (applicant.toString() === rejectedUser) {
        isAnApplicant = true;
        request.applicants.splice(i, i)
        console.log(applicant, ' is rejected!')
      }
    })
    if (!isAnApplicant)
      return res.status(400).send('Mentor is not an applicant')

    await request.save();
    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const rejectOpp = async (req, res) => {
  try {
    const { id, rejectedUser } = req.body;
    let isAnApplicant = false;
    const opp = await Opportunity.findById(id)
      .populate("owner applicants")

    if (!opp) return res.status(404).send("Unable to find opp");
    if (opp.progress === "in progress")
      return res.status(400).send(`This opp is already accepted by ${req.acceptedBy}`);
    else if (opp.progress === "close")
      return res.status(400).send("This opp is already closed");
    if (req.user.id !== opp.owner.toString())
      return res.status(401).send("You need to be the owner to perform this action")
    opp.applicants.forEach((applicant, i) => {
      if (applicant.toString() === rejectedUser) {
        isAnApplicant = true;
        opp.applicants.splice(i, i)
        console.log(applicant, ' is rejected!')
      }
    })
    if (!isAnApplicant)
      return res.status(400).send('Mentor is not an applicant')

    await opp.save();
    res.status(200).send(opp);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = { acceptRequest, acceptOpp, rejectRequest, rejectOpp };