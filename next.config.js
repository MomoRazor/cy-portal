const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
        baseUrl: process.env.API_URL,
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSender: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID
    }
}
