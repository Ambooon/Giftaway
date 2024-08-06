const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static("public"));

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  try {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    const hashedPassword = hash.digest("hex");

    console.log(`Received registration request: ${username}, ${email}`);
    console.log(`Hashed Password: ${hashedPassword}`);

    res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ success: false, message: "An error occurred!" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
