const commentsModel = require("../models/comments");
const articlesModel = require("../models/articles");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const id = req.params.id;
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentsModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      articlesModel
        .findByIdAndUpdate(
          { _id: id },
          { $push: { comments: result._id } },
          { new: true }
        )
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Comment added`,
            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getCommentsByArticleId = (req, res) => {
  const article_id = req.params.id;
  console.log(article_id);

  articlesModel.findOne({ _id: article_id }).populate('comments')
    .then((result) => {

      res.status(200).json({
        success: true,
        message: `All comments for article: ${article_id}`,
        result: result.comments,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createNewComment,
  getCommentsByArticleId,
};
