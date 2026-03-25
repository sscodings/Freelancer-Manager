const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const MainRouter = require("./routes/index");

app.use("/api/v1",MainRouter);

app.listen(3000);