const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);
require("./routes/user-type.routes")(app);
require("./routes/store.routes")(app);
require("./routes/group.routes")(app);
require("./routes/measure-unit.routes")(app);
require("./routes/tax-group.routes")(app);
require("./routes/operation.routes")(app);
require("./routes/operation-type.routes")(app);
require("./routes/activity.routes")(app);
require("./routes/activity-type.routes")(app);
require("./routes/store-product.routes")(app);
require("./routes/report.routes")(app);

require("./tasks/deleteExpired.task")(cron);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
