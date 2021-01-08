let isProduction = process.env.NODE_ENV === "production";

module.exports = {
  HOST: isProduction ? "us-cdbr-east-02.cleardb.com" : "127.0.0.1",
  USER: isProduction ? "bc90a6cc42fbe3" : "root",
  PASSWORD: isProduction ? "a6f0b9cf" : "Searchdeveloper#10",
  DB: isProduction ? "heroku_ec6f904e983c656" : "developerdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
