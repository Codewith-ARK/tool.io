const pug = require("pug");
const path = require("path");

const posts = {};

function renderHTML(fileName, data) {
  return pug.renderFile(
    path.join(__dirname, "..", "views", "template", fileName),
    {
      data: data,
    }
  );
}

posts.create = (data) => {
  return renderHTML("createPost.pug", data);
};

posts.viewAll = (data) => {
  return renderHTML("viewAllPost.pug", data);
}

module.exports = posts;