import mongoose, { type Mongoose } from "mongoose";
import { env } from "@/env";

const cached: {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
} = {
  connection: null,
  promise: null,
};

async function connectMongo() {
  if (!env.MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local",
    );
  }
  if (cached.connection) return cached.connection;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      // Authentication options
      authSource: "admin", // Default auth database
    };
    cached.promise = mongoose.connect(env.MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
    console.log("✅ MongoDB connected successfully");
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e);

    // Enhanced error reporting
    if (e instanceof Error) {
      if (e.message.includes("Authentication failed")) {
        console.error(
          "🔐 Check your MongoDB username, password, and authentication database",
        );
        console.error(
          "💡 Ensure special characters in credentials are URL-encoded",
        );
      }
      if (
        e.message.includes("ENOTFOUND") ||
        e.message.includes("ECONNREFUSED")
      ) {
        console.error("🌐 Check your MongoDB host and port");
      }
    }
    throw e;
  }
  return cached.connection;
}
export default connectMongo;
