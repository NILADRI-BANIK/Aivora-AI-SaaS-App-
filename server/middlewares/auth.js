import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    if (!req.auth()) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const authData = req.auth();
    const userId = authData.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Invalid user ID",
      });
    }

    const has = authData.has;
    const hasPremiumPlan =
      typeof has === "function" ? await has({ plan: "premium" }) : false;

    const user = await clerkClient.users.getUser(userId);
    const freeUsage = user.privateMetadata?.free_usage || 0;

    if (!hasPremiumPlan && freeUsage) {
      req.free_usage = freeUsage;
    } else if (!hasPremiumPlan) {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      req.free_usage = 0;
    }

    req.userId = userId;
    req.plan = hasPremiumPlan ? "premium" : "free";
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
