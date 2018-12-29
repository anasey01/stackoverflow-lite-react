/* eslint-disable no-console */
import express from 'express';
import path from 'path';


const routes = require('./routes');

const app = express();
const port = process.env.PORT || 7000;

app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/', routes);
app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));

const server = app.listen(port, () => console.log(`Running on port ${server.address().port}`));

export default app;
