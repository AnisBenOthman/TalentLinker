import { ConnectionService } from "../service/connectionService.js";
const connectionService = new ConnectionService();
export async function createConnection(req, res) {
  try {
    const connection = await connectionService.addConnection(
      req.body.requesterId,
      req.body.receiverId
    );
    res
      .status(201)
      .json({ message: "connection was established successfully", connection });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error establishing connection", error: e.message });
  }
}

export async function updateConnectionStatus(req, res) {
  try {
    const connection = await connectionService.updateConnectionStatus(
      req.params.connectionId,
      req.body.status
    );
    res
      .status(200)
      .json({ message: "connection status updated successfully", connection });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error updating connection status", error: e.message });
  }
}

export async function getAcceptedConnections(req, res) {
  try {
    const connections = await connectionService.getAcceptedConnections(
      parseInt(req.params.userId)
    );
    res.status(200).json({ message: "network", connections });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error fetching connections", error: e.message });
  }
}

export async function getPendingConnections(req, res) {
  try {
    const connections = await connectionService.getPendingConnections(
      parseInt(req.params.userId)
    );
    res.status(200).json({ message: "Pending requests :", connections });
  } catch (e) {
    res.status(500).json({
      message: "error fetching pending connections",
      error: e.message,
    });
  }
}
export async function getInvitations(req, res) {
  try {
    const invitations = await connectionService.getInvitations(
      parseInt(req.params.userId)
    );
    res.status(200).json({ message: "List of invitations :", invitations });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error fetching invitations", error: e.message });
  }
}

export async function deleteConnection(req, res) {
  try {
    const connection = await connectionService.deleteConnection(
      req.params.connectionId
    );
    res
      .status(200)
      .json({ message: "connection deleted successfully", connection });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error deleting connection", error: e.message });
  }
}
