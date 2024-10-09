import { PrismaClient } from "@prisma/client";

export class NotificationService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async createNotification(notificationData) {
    const notification = await this.prisma.notification.create({
      data: notificationData,
    });
  }
  async getAllNotificationsByUser(notificationData) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId: notificationData.userId,
      },
      orderBy: { sendAt: "desc" },
    });
  }
  async markAsRead(notificationData) {
    const notification = await this.prisma.notification.update({
      where: {
        id: notificationData.notificationId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async getUnreadNotification(userId) {
    const unreadNotifications = await this.prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: "desc",
    });
  }

  async deleteNotification(notificationId) {
    return await this.prisma.notification.delete({
      where: {
        id: notificationId,
      },
    });
  }
}
