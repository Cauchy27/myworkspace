const express = require('express');
const app = express();

const port = 3000;

// api用
app.get('/user', (req, res) => {
  res.json([{
    id: 1,
    name: "Taro"
  }, {
    id: 2,
    name: "Jiro"
  }, {
    id: 3,
    name: "Kohei"
  }, {
    id: 4,
    name: "Test"
  }]);
});

app.listen(port, () => console.log(`Server running on port ${port}`));