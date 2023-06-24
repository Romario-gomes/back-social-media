import { app } from "./app";
import "../../container";

const port = process.env.PORT || 3000;
app.listen(port || 3000, () => console.log(`Server is running! port ${port}`));
