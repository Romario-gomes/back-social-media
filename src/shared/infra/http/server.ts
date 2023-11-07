import dotenv from "dotenv";
import { app } from "./app";
import "../../container";

dotenv.config();

const port = process.env.PORT || 3333;
app.listen(port || 3333, () => console.log(`Server is running! port ${port}`));