import express from "express";
import {
  createConnection,
  getAcceptedConnections,
  getPendingConnections,
  deleteConnection,
  updateConnectionStatus,
  getInvitations,
} from "../controller/connectionController.js";

const router = express.Router();

router.route("/").post(createConnection);
router
  .route("/:connectionId")
  .patch(updateConnectionStatus)
  .delete(deleteConnection);
router.route("/acceptedConnection/:userId").get(getAcceptedConnections);
router.route("/pendingConnection/:userId").get(getPendingConnections);
router.route("/getInvitations/:userId").get(getInvitations);

export default router;
