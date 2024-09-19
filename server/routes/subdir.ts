export {};
    import * as express from 'express';
import * as path from 'path';

const aboutroot = express.Router();

aboutroot.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'about', 'index.html'));
});

export default aboutroot;
