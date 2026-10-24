import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  // We can't throw here because it might break build time if env is not set
  // throw new Error('Please add MONGODB_URI to your environment variables');
  console.warn('Please add MONGODB_URI to your environment variables');
}

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    if (uri) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    } else {
       // Mock or handle missing URI
       console.error("MONGODB_URI is missing in development");
    }
  }
  // @ts-expect-error - Handling potential undefined
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  if (uri) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  } else {
      // Return a rejected promise or similar if URI is missing
      clientPromise = Promise.reject("MONGODB_URI is missing");
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
