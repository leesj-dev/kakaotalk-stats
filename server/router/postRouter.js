const express = require("express");
const viewPosts = require("../controllers/postController/viewPosts");
const viewPost = require("../controllers/postController/viewPost");
const viewComments = require("../controllers/postController/viewComments");
const postRouter = express.Router();

postRouter.get("/", viewPosts);
postRouter.get("/:postId", viewPost);
postRouter.get("/:postId/comments", viewComments);

module.exports = postRouter;
