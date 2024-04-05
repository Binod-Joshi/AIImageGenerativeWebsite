const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./mongodb/connect");
const postRoutes = require("./routes/postRoutes");
const StabilityAiRoutes = require("./routes/StabilityAiRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle',StabilityAiRoutes);

app.get("/", async (req, res) => {
    res.send('Hello from Dall-E')
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(5000, () => {
            console.log("Server has started on port http://localhost:5000");
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();
