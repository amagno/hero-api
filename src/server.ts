import * as express from 'express';
import * as colors from 'colors';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import initMongo from './mongoConnection';
import { Hero } from './models/Hero';

initMongo();

const PORT = 3000;
const ADDRESS = 'localhost';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/hero', async (req, res) => {
    try {
        const heroes = await Hero.find({}).exec();

        res.json(heroes);
    } catch (error) {
        res.json(error);
    }
});
app.post('/api/hero', async (req, res) => {
    console.log(req.body);
    try {
        const hero = new Hero(req.body);
        await hero.save();

        res.json(hero);
    } catch (error) {
        res.json(error);
    }
});


app.listen(PORT, () => {
    console.log(colors.green('Server is running on ->'), colors.yellow(`http://${ADDRESS}:${PORT}/`));
});