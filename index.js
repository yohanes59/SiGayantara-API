const app = require('./app');
const CONFIG = require('./src/config/config');

const port = process.env.PORT || CONFIG.PORT;

app.listen(port, () => console.log(`Connection Success at http://localhost:${port}`));