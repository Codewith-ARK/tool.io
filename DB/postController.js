const Datastore = require("nedb");

const postsDB = new Datastore({ filename: "./DB/posts.db", autoload: true });

const postController = {};

postController.createPost = (data) => {

  const postData = {
    title: data.title,
    desc: data.desc,
    url: data.url,
    createdAt: new Date(),
    updateAt: new Date(),
    upvotes: 0,
  };
  
  return new Promise((resolve, reject) => {
    postsDB.insert(postData, (err, newPost) => {
      if (err) reject(new Error("Error creating post:", err));
      else resolve(newPost);
    });
  });
};

postController.getAllPosts = () => {
  return new Promise((resolve, reject) => {
    postsDB.find({}, (err, allPosts) => {
      if (err) reject(new Error("Error fetching ALL POSTS:", err));
      else resolve(allPosts);
    });
  });
};

postController.removeAllPosts = () => {
  return new Promise((resolve, reject) => {
    postsDB.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) reject(new Error("Error removing ALL POSTS", err));
      else resolve(numRemoved);
    });
  });
};

module.exports = postController;
