const config = require("./config/config");
const app = require("./app");

app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port}`);
});