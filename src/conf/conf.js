const conf = {
    cloudinaryApiKey: String(import.meta.env.VITE_CLOUDINARY_API_KEY),
    cloudinaryApiSecret: String(import.meta.env.VITE_CLOUDINARY_API_SECRET),
    cloudinaryCloudName: String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME),
    cloudinaryUrl: String(import.meta.env.VITE_CLOUDINARY_URL),

    firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    firebaseMessagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
    firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID),
    firebaseDatabaseUrl: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
    firebaseMeasurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
    upiLink: String(import.meta.env.VITE_UPI_LINK),
    upiId: String(import.meta.env.VITE_UPI_ID),
    upiPhoneNo : String(import.meta.env.VITE_UPI_PHONENO)
};

export default conf;
