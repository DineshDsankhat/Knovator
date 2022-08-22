const express = require("express");
const postRouter = express.Router();
const postControll = require("../controllers/postController.js");


// CRUD of Post
postRouter.post("/create", postControll.create);
postRouter.get("/allpost", postControll.allPost);
postRouter.get("/read", postControll.read);
postRouter.patch("/update", postControll.update);
postRouter.delete("/delete", postControll.delete);

postRouter.get("/readlatlong", postControll.readLatitude);
postRouter.get("/count", postControll.count);



exports.route = postRouter;
