let isProduction = process.env.NODE_ENV === "production";

module.exports = {
  HOST: isProduction ? "eu-cdbr-west-03.cleardb.net" : "127.0.0.1",
  USER: isProduction ? "bcc5a82e99b6ce" : "root",
  PASSWORD: isProduction ? "c2f0f1e2" : "Searchdeveloper#10",
  DB: isProduction ? "heroku_79c10e2aad2b46f" : "developerdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
