const mongoose = require("mongoose");
const schema = mongoose.Schema;
const getDateTime = require('../middleware/timezone');

const userSchema = new schema({
  postId: {
    type: String,
    required: true,
    //ref: "Post",
  },
  commentType:{
    type: String,
    default: "질문 게시판"
  },
  userId: {
    type: String,
    required: true,
    //ref: "Member",
  },
  contents: {
    type: String,
    required: false,
  },
  commentTime: {
    type: String,
    required: false,
    default: getDateTime(),
  },
}, {
  versionKey: false
});

module.exports = mongoose.model("CommentQuestion", userSchema);