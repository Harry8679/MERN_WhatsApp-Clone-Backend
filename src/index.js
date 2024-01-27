import dotenv from "dotenv";
import app from "./app.js";

// dotenv config
dotenv.config();
const PORT = process.env.PORT || 6000;
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`WhatsApp Backend is running on the port ${PORT}`);
});
