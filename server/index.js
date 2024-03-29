import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//! File storage
//anytime someone uploads a file to website will be saved to folder public/assets
//also sets the files name 
// upload using upload = multer({storage})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

//!Routes with files
app.post("/auth/register", upload.single("picture"), register);
//to create posts on an already open account we will need verifyToken, upload a picture, and use createpost controller
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//!Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//! Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Running on Server Port: ${PORT} 👻 `));
}).catch((error) => console.log(`${error} did not connect`));