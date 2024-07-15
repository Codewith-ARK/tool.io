const pug = require("pug");
const path = require("path");

function renderHTML(fileName, data) {
  return pug.renderFile(path.join(__dirname, "..", "views", "template", fileName), {
    data: data,
  });
}

const userViews = {};
userViews.start = (data) => {
  return renderHTML("start.pug", data);
};


userViews.profile = (data) => {
  return renderHTML("userProfile.pug", data);
}

module.exports = userViews;