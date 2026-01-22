const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/register', (req, res) => {
    console.log('Received registration data:', req.body);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
});
