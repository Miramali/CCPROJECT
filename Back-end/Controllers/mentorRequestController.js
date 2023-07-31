const { Request } = require("../Models/mentorRequestModel");

// postRequests////////////////////////
const postRequests = (req, res) => {
  const request = new Request({
    ...req.body,
    owner: req.user.id,
    profile: req.profile._id
  });
  request
    .save()
    .then((request) => {
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(400).send(e.message);
    });
};

// getRequests////////////////////////
const getRequests = (req, res) => {
  Request.find({})
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      request.forEach(req => {
        req.checkIsClosed(req)
      })
      res.status(200).send([request]);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// getRequestByID///////////////////
const getRequestsByID = (req, res) => {
  const _id = req.params.id;
  Request.findById(_id).populate({
    path: "owner profile",
    select: "-tokens",
  })
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      request.checkIsClosed(request)
      res.status(200).send([request]);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// getRequestByOwnerId///////////////////
const getRequestsByOwnerId = (req, res) => {
  const _id = req.params.id;
  Request.find({ owner: _id })
    .then((request) => {
      if (!request) {
        return res.status(404).send("No requests found");
      }
      request.forEach(req => {
        req.checkIsClosed(req)
      })
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

// patchRequets/////////////////////
const patchRequets = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findOne({ _id: id, owner: req.user._id });
    if (!request) {
      return res.status(404).send("No request is found");
    }
    if (request.progress != "open") throw new Error(`Cannot edit, this request is already ${request.progress}`)

    await Request.findOneAndUpdate({ _id: id, owner: req.user._id },
      req.body, { new: true, runValidators: true });

    res.status(200).send(request);
  } catch (error) {
    res.status(400).send(error.messaga);
  }
};

// deleteRequests///////////////////
const deleteRequests = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findById(_id);
    if (!request) {
      return res.status(404).send("Unable to find request");
    }
    if (request.progress != "open") return res.status(400).send(`Cannot delete, this request is already ${request.progress}`)
    await Request.findByIdAndDelete(_id);
    res.status(200).send('successfully deleted');
  } catch (e) {
    res.status(500).send(e.message);
  }
}

module.exports = { postRequests, getRequests, getRequestsByID, getRequestsByOwnerId, patchRequets, deleteRequests };
