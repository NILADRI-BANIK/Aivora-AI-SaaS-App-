import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth(); //  FIXED LINE 6: Removed ()

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Error fetching user creations:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    //  FIXED LINE 21: Changed to publish = true and removed undefined userId
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    console.error("Error fetching published creations:", error); //  IMPROVED: Better error message
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { creationId } = req.body;
    const id = parseInt(creationId);

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid creation ID" });
    }

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res.status(404).json({ success: false, message: "Creation not found" });
    }

    const currentLikes = creation.likes || [];
    const userIdStr = userId.toString();

    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = currentLikes.filter(like => like !== userIdStr);
      message = "Creation Un-liked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }

    await sql`
      UPDATE creations
      SET likes = ${updatedLikes}, updated_at = NOW()
      WHERE id = ${id}
    `;

    res.json({
      success: true,
      message,
      likes: updatedLikes,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

