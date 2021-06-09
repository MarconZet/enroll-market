const express = require('express');
const path = require('path');

const { API_PATH, KEYCLOAK_PATH, PORT } = process.env;

const app = express();
const port = PORT;

app.set('views', path.join(__dirname, '../react-app/build'));
app.engine('html', require('ejs').renderFile);

app.use(
  '/static',
  express.static(path.join(__dirname, '../react-app/build/static')),
);

app.get('/', (req, res) => {
  res.render('index.html', { API_PATH, KEYCLOAK_PATH });
});

app.listen(port, () => console.log(`🏃‍♂️ on port ${port}!`));