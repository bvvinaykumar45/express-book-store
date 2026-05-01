const express = require('express');

const app = express();
const PORT = 8000;

app.listen(PORT, () => console.log(`Http server is running on PORT ${PORT}`));