import { NotificationService } from "../services/notificationService.js";
import { sendNotification } from "../socket/notificationSocket.js";
const notificationService = new NotificationService();
export async function createNotification(req, res) {
  try {
    const notification = notificationService.createNotification(req.body);
    if (req.io) {
      sendNotification(req.body.userId, notification, req.io);
    }

    res.status(201).json(notification);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getAllNotificationsByUser(req, res) {
  try {
    const notifications = await notificationService.getAllNotificationsByUser(
      req.params.userId
    );
    res.status(200).json(notifications);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function markAsRead(req, res) {
  try {
    await notificationService.markAsRead(req.params.notificationId);
    res.status(200).json({ message: "notification was read" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getUnreadNotification(req, res) {
  try {
    const notification = await notificationService.getUnreadNotification(
      req.params.userId
    );
    res.status(200).json(notification);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function deleteNotification(req, res) {
  try {
    await notificationService.deleteNotification(req.params.notificationId);
    res.status(200).json({ message: "notification deleted successfull" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
