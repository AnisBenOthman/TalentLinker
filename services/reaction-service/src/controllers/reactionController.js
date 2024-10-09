import { ReactionService } from "../services/reactionService.js";
const reactionService = new ReactionService();

export async function addReaction(req, res) {
  try {
    const { userId, targetType, type, targetId } = req.body;
    const reaction = await reactionService.addReaction(
      parseInt(userId),
      parseInt(targetId),
      targetType,
      type
    );
    res.status(201).json({
      message: "reaction added or updated successfully",
      reaction,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function removeReaction(req, res) {
  try {
    await reactionService.removeReaction(req.params.id);
    res.status(200).json({ message: "reaction removed successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getReactionsbyType(req, res) {
  try {
    const targedId = parseInt(req.params.targetId);
    const reactions = await reactionService.getReactionsByType(
      req.params.targetType,
      targedId
    );
    res
      .status(200)
      .json({ message: "reactions feteched successfully", reactions });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
