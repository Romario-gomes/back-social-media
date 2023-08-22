import { app } from "./app";
import "../../container";

const port = process.env.PORT || 3333;
app.listen(port || 3333, () => console.log(`Server is running! port ${port}`));
