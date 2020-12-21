const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

app.listen(3001, () => {
    console.log("Server is running on PORT 3001");
});