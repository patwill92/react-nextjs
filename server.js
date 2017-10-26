const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const keys = require('./config/keys');
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);
cloudinary.config({
  cloud_name: keys.cloud_name,
  api_key: keys.cloud_key,
  api_secret: keys.cloud_secret
});


app.prepare()
  .then(() => {
    const server = express();
    const Item = require('./models/Item');
    const api = require("./routes/api");

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));

    server.get('/', async (req, res) => {
      let doc = await Item.find({category: 'starter', available: true});
      console.log('bye2');
      return app.render(req, res, '/', {data: doc})
    });

    server.use('/api', api);

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  });