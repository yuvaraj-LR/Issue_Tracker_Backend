import app from "./app.js";
import { connectDB } from "./config/db.js";

console.log("<---------------------------------------------------------------------->");

console.log(process.env.BUILDENV === "dev" ? `Currently our path is in local enviroment and running in ${process.env.BUILDENV}` : "Project pointing to live.");

console.log("<---------------------------------------------------------------------->");

const serverStar = app.listen(process.env.PORT, async (err) => {
  if (err) {
    console.log(`server failed with error ${err}`);
  } else {
    await connectDB();
    console.log(`server is running at ${process.env.PORT}`);
  }
});
