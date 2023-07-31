const createError = require("../utils/createError");
const Comment = require("../Models/commentsModel");
const mentorApplication = require('../Models/opportunityModel')

const addComment = async (req, res, next) => {
  try {
    const id = req.params.mentorApplicationId;
    const newComment = new Comment({ ...req.body, userId: req.user.id, mentorApplicationId: id });
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      mentorApplicationId: req.params.mentorApplicationId,
    });
    res.status(200).send(comments);
  } catch (e) {
    next(e);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const mentorApp = await mentorApplication.findById(comment.mentorApplicationId);

    if (req.user._id === comment.userId || req.user._id === mentorApp.owner) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  addComment,
  deleteComment,
  getComment,
};
