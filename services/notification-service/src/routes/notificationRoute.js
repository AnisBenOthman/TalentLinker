import express from "express";
import {
  createNotification,
  getAllNotificationsByUser,
  getUnreadNotification,
  deleteNotification,
  markAsRead,
} from "../controller/notificationController.js";

const router = express.Router();

router.route("/").post(createNotification);
router
  .route("/:userId")
  .put(markAsRead)
  .get(getUnreadNotification)
  .get(getAllNotificationsByUser);
router.route("/delete/:notificationId").delete(deleteNotification);

export default router;
