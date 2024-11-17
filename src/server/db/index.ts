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
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(env.MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.connection;
}
export default connectMongo;
