const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const cors = require("cors")
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require("mongoose");


const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const subjectRoute = require("./routes/subjects");
const materialRoute = require("./routes/materials");
const taskRoute = require("./routes/tasks");
const doubtRoute = require("./routes/doubts");
const scheduleRoute = require("./routes/schedules");
const classCommentRoute = require("./routes/classComments");
const groupVideoCallSocket = require("./socket/groupVideoCall");

// config for dotenv


// Connect DB
mongoose
  .connect("mongodb+srv://mradulmahesh1995:sTPHNSgyUHCkqlbF@cluster0.6xhcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
   
    // useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(express.json());

// routes
app.get("/", (req, res) => res.send("Hello from Virtual Classroom :)"));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/material", materialRoute);
app.use("/api/task", taskRoute);
app.use("/api/doubt", doubtRoute);
app.use("/api/schedule", scheduleRoute);
app.use("/api/classcomment", classCommentRoute);

// sockets
groupVideoCallSocket(io);

// Port setup
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("webdesk server is running on port:" + port);
});
