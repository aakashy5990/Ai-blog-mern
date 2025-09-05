import express from "express"
import { adminLogin, ApprovedCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login" ,adminLogin);
adminRouter.get("/comments" , auth, getAllComments);
adminRouter.get("/blogs" , auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, getAllBlogsAdmin ,deleteCommentById);
adminRouter.post("/approved-comment", auth, ApprovedCommentById);
adminRouter.post("/dashboard", auth, getDashboard);


export default adminRouter;
