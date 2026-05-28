// entry file
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload";
import path from "path";
import { createServer } from "http";
import fs from "fs"
import cron from "node-cron";

import {initializeSocket} from "./lib/socket.js"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/user.route.js" //include .js at the end always
import authRoutes from "./routes/auth.route.js" 
import adminRoutes from "./routes/admin.route.js" 
import songRoutes from "./routes/song.route.js" 
import albumRoutes from "./routes/album.route.js" 
import statRoutes from "./routes/stat.route.js" 


dotenv.config();

const __dirname = path.resolve();

const app = express();
const PORT = process.env.PORT;

const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(cors(
    {
        origin : "http://localhost:3000",
        credentials : true,
    }
));


app.use(express.json()); //to parse req.body

app.use(clerkMiddleware()); //this will add auth to req obj => req.auth


//store the files temporarily into local backend folder - keep this before all routes
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname , "tmp"), //under the curr folder - backend create a temp folder "tmp"
    createParentPath : true, //if dir does not exist craete the dir first 
    limits : {
        fileSize : 10*1024*1024, //10 MB max file size
    }
}
));

//cron jobs
//just install a package = npm i node-cron in backend folder

const tempDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});


app.use("/api/users" , userRoutes)
app.use("/api/auth" , authRoutes)
app.use("/api/admin" , adminRoutes)
app.use("/api/songs" , songRoutes)
app.use("/api/albums" , albumRoutes)
app.use("/api/stats" , statRoutes)
//tmp - stores uploaded file temp , files need to be in cloudinary

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , "../frontend/dist")))
    app.get("*" , (req , res) => {
        res.sendFile(path.resolve(__dirname , "../frontend" , "dist" ,"index.html"))
    })
}
//error handler - after all the routes
//err is being sent as an argument
app.use((err , req , res , next)=>{
    res.status(500).json({message : process.env.NODE_ENV === "production" ? "internal server error" : err.message}); //but err.message is so technical that end user will not understand that 
    //we will use something else for dev and production also
})

httpServer.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})

