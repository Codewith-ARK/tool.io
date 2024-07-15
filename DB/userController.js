const Datastore = require("nedb");

const usersDB = new Datastore({ filename: "./DB/users.db", autoload: true });

const userController = {};

userController.fetchUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    usersDB.findOne({ email: email }, (err, result) => {
      if (err) reject(new Error("Error fetching user:", err));
      resolve(result);
    });
  });
};

userController.fetchUser = (userID) => {
  return new Promise((resolve, reject) => {
    usersDB.findOne({ _id: userID }, (err, result) => {
      if (err) reject(new Error("Error fetching user:", err));
      resolve(result);
    });
  });
};

userController.createUser = (userData) => {
  const User = {
    name: userData.name,
    email: userData.email,
    password: userData.password,
    userType: userData.userType || "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return new Promise((resolve, reject) => {
    usersDB.insert(User, (err, newUser) => {
      if (err) reject(new Error("Error creating user:", err));
      resolve(newUser);
    });
  });
};

userController.fetchAllUser = () => {
  return new Promise((resolve, reject) => {
    usersDB.find({}, (err, result) => {
      if (err) reject(new Error("Error fetching ALL USER"));
      resolve(result);
    });
  });
};

userController.removeAllUser = () => {
  return new Promise((resolve, reject) => {
    usersDB.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) reject(new Error("Error removing ALL USERS"));
      resolve(numRemoved);
    });
  });
};

userController.updateUser = () => {
  return new Promise((resolve, reject)=>{
    usersDB.insert()
  });
}

userController.makeAdmin = () => {
  return new Promise((resolve, reject)=>{
    usersDB.update({email: "admin@email.com"}, {userType: "admin"})
  });
}
module.exports = userController;
