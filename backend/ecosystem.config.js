module.exports = {
  apps: [
    {
      name: "taskforge-backend",
      script: "dist/main.js",
      env: {
        PORT: 3000,
        JWT_SECRET: "theowlsarenotwhattheyseem",
        MONGO_URL: "mongodb+srv://taskforge_user:taskforge_user@cluster0.o8dmbcx.mongodb.net/?retryWrites=true&w=majority&appName=taskforge"
      }
    }
  ]
}
