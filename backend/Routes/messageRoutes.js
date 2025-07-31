import express from "express"
import { protectroute } from "../middleware/auth.js";

import { markMessageSeen, sendMessage,getUsersSidebar,getMessage } from "../controller/messageController.js";
const messageRouter=express.Router();

messageRouter.get("/users",protectroute,getUsersSidebar)
messageRouter.get("/:id",protectroute,getMessage);
messageRouter.put("mark/:id",protectroute,markMessageSeen)
messageRouter.post("/send/:id",protectroute,sendMessage)
export default messageRouter

