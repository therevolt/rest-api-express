module.exports = (app) => {
  const posts = require("../controllers/post.controllers");

  let router = require("express").Router();

  // Create a new post
  router.post("/", posts.create);

  //Retrieve all post
  router.get("/", posts.findAll);

  //Retrieve single post
  router.get("/:id", posts.findOne);

  //Update post
  router.put("/:id", posts.update);

  //Delete single post
  router.delete("/:id", posts.detele);

  //Delete all post
  router.delete("/", posts.deleteAll);

  //Find published post
  router.get("/post/published", posts.findAllPublished);

  app.use("/api/posts", router);
};
