const app = require('./app');
const CONFIG = require('./src/config/config');

const port = CONFIG.PORT || 5000;

app.listen(port, () => console.log(`Connection Success at http://localhost:${port}`));