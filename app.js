const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const server = require("http").createServer(app);

//view template
require("./middleware/view.mdw")(app);

//configure to static files
require("./middleware/config.mdw")(app);

//cookie parser
require("./middleware/cookie.mdw")(app);

//session
require("./middleware/session.mdw")(app);

//passport
require("./middleware/passport.mdw").configure(app);

//SOCKET IO
const io = require("socket.io")(server);
app.io = io;
require("./middleware/chatbox")(app);

//File upload

///////////---------///////////////
app.use((req, res, next) => {
<<<<<<< HEAD
  // console.log("middleware"  + req.user);
=======
  console.log("middleware" + req.user);
>>>>>>> refs/remotes/origin/master
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

app.use("/", require("./routes/main.route"));

app.use(
  "/admin",
  (req, res, next) => {
    if (req.user) {
      if (req.user.userType == 1) {
        next();
      } else res.redirect("/");
    } else res.redirect("/");
  },
  require("./routes/admin.route")
);

app.use(
  "/manager",
  (req, res, next) => {
    // const { cookies } = req;
    if (req.user) {
      if (req.user.userType == 2) {
        next();
      } else res.redirect("/");
    } else res.redirect("/");
  },
  require("./routes/manager.route")
);

app.use(function (req, res) {
  res.send("error");
});

server.listen(PORT, function () {
  console.log(`Sever is running at http://localhost:${PORT}`);
});
