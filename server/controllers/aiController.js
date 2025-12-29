import { clerkClient } from "@clerk/express";
import OpenAI from "openai";
import Groq from "groq-sdk";
import sql from "../configs/db.js";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "../configs/cloudinary.js";
import fs from "fs";
import { createRequire } from "module";
import Replicate from "replicate";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

connectCloudinary();

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const enforceMaxWords = (text, max) => {
  return text.split(/\s+/).slice(0, max).join(" ");
};

export const generateArticle = async (req, res) => {
  try {
    const userId = req.userId;
    let { prompt, length } = req.body;

    console.log("=== Article Generation Request ===");
    console.log("User ID:", userId);
    console.log("Prompt:", prompt);
    console.log("Length:", length);

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt cannot be empty",
      });
    }

    //  FIXED: Properly handle length parameter
    let minWords = 500;
    let maxWords = 1600;

    if (length === "short") {
      minWords = 500;
      maxWords = 800;
    } else if (length === "medium") {
      minWords = 800;
      maxWords = 1200;
    } else if (length === "long") {
      minWords = 1200;
      maxWords = 1600;
    } else {
      // Default to medium if invalid value
      minWords = 800;
      maxWords = 1200;
    }

    console.log(`Target word count: ${minWords}-${maxWords} words`);

    const plan = req.plan;
    const free_usage = req.free_usage;

    console.log("Plan:", plan);
    console.log("Free usage:", free_usage);

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    //  IMPROVED PROMPT
    const enhancedPrompt = `You are a professional article writer. Write an article about: "${prompt}"

STRICT WORD COUNT: ${minWords} to ${maxWords} words
- Stay within this range
- Stop naturally when approaching ${maxWords} words
- Do NOT mention word count in your response

STRUCTURE:
- Engaging introduction
- Well-developed body with clear points
- Strong conclusion

STYLE: Professional, informative, comprehensive

Write the article now:`;

    console.log("Calling Groq API...");

    // IMPROVED: Better token calculation
    // Llama tokenizer: ~1.3-1.5 tokens per word
    // Adding 20% buffer for safety
    const estimatedTokens = Math.ceil(maxWords * 1.6);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: estimatedTokens,
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a professional article writer who follows word count requirements precisely.",
        },
        { role: "user", content: enhancedPrompt },
      ],
    });

    let content = response.choices[0].message.content.trim();

    //  IMPROVED: Better word counting
    const words = content.split(/\s+/).filter((w) => w.length > 0);
    const actualWordCount = words.length;

    console.log(
      `Generated ${actualWordCount} words (target: ${minWords}-${maxWords})`
    );

    // Validate minimum (allow 10% tolerance)
    if (actualWordCount < minWords * 0.9) {
      return res.status(500).json({
        success: false,
        message: `Generated content is too short (${actualWordCount} words). Please try again.`,
      });
    }

    //  IMPROVED: Smart truncation at sentence boundary
    if (actualWordCount > maxWords) {
      console.log(
        `Content exceeds limit, truncating from ${actualWordCount} to ${maxWords} words`
      );

      // Try to truncate at sentence boundary
      const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
      let truncated = "";
      let wordCount = 0;

      for (const sentence of sentences) {
        const sentenceWords = sentence
          .split(/\s+/)
          .filter((w) => w.length > 0).length;
        if (wordCount + sentenceWords <= maxWords) {
          truncated += sentence;
          wordCount += sentenceWords;
        } else {
          break;
        }
      }

      // Fallback to hard truncation if sentence-based fails
      content = truncated.trim() || words.slice(0, maxWords).join(" ");
    }

    const finalWordCount = content
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
    console.log("Final content length:", content.length);
    console.log("Final word count:", finalWordCount);

    if (!content || content.trim() === "") {
      console.error("Empty content received from API");
      return res.status(500).json({
        success: false,
        message: "Failed to generate content from AI. Please try again.",
      });
    }

    // Save to database
    console.log("Saving to database...");
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;
    console.log("Saved to database successfully");

    // Update usage if not premium
    if (plan !== "premium") {
      console.log("Updating free usage count...");
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
      console.log("Usage updated to:", free_usage + 1);
    }

    console.log("=== Success! Sending response ===");
    res.json({
      success: true,
      content,
      wordCount: finalWordCount, // Return actual word count
    });
  } catch (error) {
    console.error("=== ERROR in generateArticle ===");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.response) {
      console.error("API Response Error:", error.response);
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate article",
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    // Validate input
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt cannot be empty",
      });
    }

    const plan = req.plan;
    const free_usage = req.free_usage;

    // Free plan limit check
    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

    // AI generation using Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
Generate exactly 5 SEO-friendly blog titles.

Rules:
- Each title on a new line
- No numbering
- No explanations

Keyword: ${prompt}
          `,
        },
      ],
      temperature: 0.7,
      max_tokens: 120,
    });

    const rawContent =
      response?.choices?.[0]?.message?.content?.trim() || "No title generated.";

    const content = rawContent
      .replace(/\s*•\s*/g, "\n")
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((title) => `• **${title.trim()}**`)
      .join("\n");

    // Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog_title')
    `;

    // Update free usage count
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    // Success response
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Error in generateBlogTitle:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate blog title",
    });
  }
};

// export const generateImage = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { prompt, publish } = req.body;
//     const plan = req.plan;

//     // Validate prompt
//     if (!prompt || prompt.trim() === "") {
//       return res.status(400).json({
//         success: false,
//         message: "Prompt cannot be empty",
//       });
//     }

//     // Check premium plan
//     if (plan !== "premium") {
//       return res.status(403).json({
//         success: false,
//         message: "This feature is only available for premium subscription.",
//       });
//     }

//     console.log("🎨 Generating image for prompt:", prompt);

//     // Generate image URL using Pollinations.ai (FREE - No API key needed!)
//     const seed = Date.now(); // Unique seed for different results each time
//     const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
//       prompt
//     )}?width=1024&height=1024&nologo=true&seed=${seed}`;

//     console.log("🔗 Image URL generated:", imageUrl);
//     console.log("☁️ Uploading to Cloudinary...");

//     // Upload to Cloudinary directly from URL
//     const uploadResult = await cloudinary.uploader.upload(imageUrl, {
//       folder: "ai-generated-images",
//       resource_type: "image",
//       timeout: 120000, // 2 minutes timeout for image generation + upload
//     });

//     console.log(" Uploaded to Cloudinary:", uploadResult.secure_url);

//     // Save to database
//     await sql`
//       INSERT INTO creations (user_id, prompt, content, type, publish)
//       VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${
//       publish ?? false
//     })
//     `;

//     console.log(" Saved to database");

//     res.json({
//       success: true,
//       content: uploadResult.secure_url,
//     });
//   } catch (error) {
//     console.error("❌ Error in generateImage:", error.message);

//     // Handle Cloudinary errors
//     if (error.message?.includes("cloudinary") || error.http_code) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to upload image to cloud storage.",
//         error: error.message,
//       });
//     }

//     // Generic error
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate image. Please try again.",
//       error: error.message,
//     });
//   }
// };

// Line 211-230: removeImageBackground function

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    // Validate prompt
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt cannot be empty",
      });
    }

    // Check premium plan
    if (plan !== "premium") {
      return res.status(403).json({
        success: false,
        message: "This feature is only available for premium subscription.",
      });
    }

    console.log("🎨 Generating image for prompt:", prompt);

    let imageUrl = null;
    let method = null;

    // ========================================
    // METHOD 1: Try Pollinations.ai FIRST (FREE)
    // ========================================
    try {
      console.log("🔄 Trying Pollinations.ai (free, unlimited)...");

      const seed = Date.now();
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?width=1024&height=1024&nologo=true&seed=${seed}`;

      // Test if Pollinations URL is accessible (with timeout)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const testResponse = await fetch(pollinationsUrl, {
          method: "HEAD",
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (testResponse.ok) {
          imageUrl = pollinationsUrl;
          method = "Pollinations.ai";
          console.log("✅ Pollinations.ai SUCCESS!");
        } else {
          throw new Error(`Pollinations returned ${testResponse.status}`);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (pollinationsError) {
      console.log("⚠️ Pollinations.ai FAILED:", pollinationsError.message);
      console.log("🔄 Falling back to Replicate...");

      // ========================================
      // METHOD 2: Fallback to Replicate (RELIABLE)
      // ========================================
      try {
        if (!process.env.REPLICATE_API_TOKEN) {
          throw new Error("Replicate API token not configured");
        }

        const replicate = new Replicate({
          auth: process.env.REPLICATE_API_TOKEN,
        });

        console.log("🔄 Generating with Replicate...");

        const output = await replicate.run(
          "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          {
            input: {
              prompt: prompt,
              width: 1024,
              height: 1024,
            },
          }
        );

        imageUrl = output[0];
        method = "Replicate";
        console.log("✅ Replicate SUCCESS!");
      } catch (replicateError) {
        console.error("❌ Replicate FAILED:", replicateError.message);
        throw new Error(
          "Both Pollinations and Replicate failed. Please try again later."
        );
      }
    }

    // ========================================
    // Upload to Cloudinary
    // ========================================
    console.log(`☁️ Uploading to Cloudinary (from ${method})...`);

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: "ai-generated-images",
      resource_type: "image",
      timeout: 120000,
    });

    console.log("✅ Uploaded to Cloudinary:", uploadResult.secure_url);

    // ========================================
    // Save to Database
    // ========================================
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image', ${
      publish ?? false
    })
    `;

    console.log("✅ Saved to database");

    res.json({
      success: true,
      content: uploadResult.secure_url,
      method: method, // Let user know which method was used
    });
  } catch (error) {
    console.error("❌ Error in generateImage:", error.message);

    // Handle Cloudinary errors
    if (error.message?.includes("cloudinary") || error.http_code) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to cloud storage.",
        error: error.message,
      });
    }

    // Generic error
    res.status(500).json({
      success: false,
      message: "Failed to generate image. Please try again.",
      error: error.message,
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.json({
        success: false,
        message: "Please upload an image file.",
      });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error in removeImageBackground:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Line 232-255: removeImageObject function
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (!image) {
      return res.json({
        success: false,
        message: "No image file uploaded.",
      });
    }

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscription.",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Remove ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("Error in removeImageObject:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // ❌ No file uploaded
    if (!resume) {
      return res.json({
        success: false,
        message: "No file uploaded. Please upload a PDF resume.",
      });
    }

    // ❌ Premium check
    if (plan !== "premium") {
      if (fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    // ❌ File size check (5MB)
    if (resume.size > 5 * 1024 * 1024) {
      if (fs.existsSync(resume.path)) fs.unlinkSync(resume.path);
      return res.json({
        success: false,
        message: "Resume size exceeds 5MB limit.",
      });
    }

    //  Read PDF
    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdfParse(dataBuffer);

    // Cleanup file
    if (fs.existsSync(resume.path)) fs.unlinkSync(resume.path);

    if (!pdfData.text || pdfData.text.trim().length === 0) {
      return res.json({
        success: false,
        message: "Unable to extract text. Please upload a text-based PDF.",
      });
    }

    //  IMPORTANT FIX: Limit resume text size
    const resumeText = pdfData.text.slice(0, 12000);

    // 🧠 AI Prompt
    const prompt = `
You are a professional HR resume reviewer and ATS expert.

Analyze the resume below and provide a structured review.

### ⭐ Overall Resume Score (out of 100)

### ✅ Strengths
- List 4–6 strengths

### ❌ Weaknesses
- List 4–6 weaknesses

### 🤖 ATS Compatibility
- Score (1–10)
- Explain clearly

### 🧩 Missing or Weak Sections
- Skills
- Projects
- Achievements
- Certifications
- Keywords

### ✍️ Improvement Suggestions
- Provide 8–12 actionable tips

Resume Content:
${resumeText}

Use clear markdown formatting.
`;

    // 🔥 GROQ AI CALL (FIXED)
    let response;
    try {
      response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
        max_tokens: 1500,
      });
    } catch (aiError) {
      console.error(
        "Groq AI Error:",
        aiError?.error || aiError?.message || aiError
      );
      return res.json({
        success: false,
        message: "AI resume review failed. Please try again.",
      });
    }

    const content = response?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.json({
        success: false,
        message: "AI returned empty response.",
      });
    }

    // 💾 Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (
        ${userId},
        'Resume Review',
        ${content},
        'resume-review'
      )
    `;

    //  Success
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error in resumeReview:", error);
    res.status(500).json({
      success: false,
      message: "Resume review failed",
    });
  }
};
