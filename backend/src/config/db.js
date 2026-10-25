import mongoose from 'mongoose';

let memoryServerInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusos';

  try {
    // Attempt standard connection with a short timeout
    console.log(`📡 Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected successfully to: ${mongoose.connection.host}`);
    return;
  } catch (err) {
    console.warn(`⚠️ Standard MongoDB connection failed (${err.message}).`);
    
    // In dev environment or fallback, use mongodb-memory-server if available
    try {
      console.log('🔄 Spinning up embedded MongoDB engine for seamless development...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServerInstance = await MongoMemoryServer.create();
      const memoryUri = memoryServerInstance.getUri();
      await mongoose.connect(memoryUri);
      console.log(`🚀 In-Memory MongoDB engine running at: ${memoryUri}`);
    } catch (fallbackErr) {
      console.error('❌ Failed to launch embedded MongoDB:', fallbackErr.message);
      throw err;
    }
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (memoryServerInstance) {
    await memoryServerInstance.stop();
  }
};
