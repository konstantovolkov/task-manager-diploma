import * as dotenv from "dotenv";

export default (function() {
  dotenv.config();

  if (
    !(
      process.env.DB_PORT ||
      process.env.APP_PORT ||
      process.env.DB_USERNAME ||
      process.env.DB_PASSWORD ||
      process.env.DB_NAME
    )
  ) {
    console.log("Define enviroment variables!");
    process.exit(1);
  }

  const DB_PORT = parseInt(process.env.DB_PORT as string, 10);
  const APP_PORT = parseInt(process.env.APP_PORT as string, 10);
  const DB_PASSWORD = process.env.DB_PASSWORD as string;
  const DB_USERNAME = process.env.DB_USERNAME as string;
  const DB_NAME = process.env.DB_NAME as string;

  return {
    DB_PORT,
    APP_PORT,
    DB_PASSWORD,
    DB_USERNAME,
    DB_NAME
  };
})();
