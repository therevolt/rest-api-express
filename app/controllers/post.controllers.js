const db = require("../models");
const Post = db.posts;
const Op = db.Sequelize.Op;

//Create
exports.create = (req, res) => {
  //Validate requests
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty",
    });
    return;
  }

  //Create post
  const post = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  Post.create(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating post",
      });
    });
};

//Retrieve All
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while find post",
      });
    });
};

//Find a single
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id)
    .then((data) => {
      data
        ? res.send(data)
        : res.status(404).send({
            message: "Not Found with id=" + id,
          });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error get post id=" + id,
      });
    });
};

//Update a Post with ID
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Post was updated successfully",
        });
      } else {
        res.send({
          message: "Cannot update post",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating post",
      });
    });
};

//Delete a post
exports.detele = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: "Post was deleted successfully",
        });
      } else {
        res.send({
          message: "Cannot delete post",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when delete post",
      });
    });
};

//Delete All
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: true,
  })
    .then((result) => {
      res.send({
        message: "All Post was deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error when delete post",
      });
    });
};

//Find all Published
exports.findAllPublished = (req, res) => {
  Post.findAll({
    where: { published: true },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving posts published",
      });
    });
};
