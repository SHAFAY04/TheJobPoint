export {};
    import * as  express from 'express';
import * as path from 'path';

const rootroute = express.Router();

rootroute.get('^/$|/index(.html)?', (req, res) => {
    
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

rootroute.get('/idk(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'idk.html'));
});

rootroute.get('/oldpage(.html)?', (req, res) => {
    res.status(301).redirect('/idk');
});

export default rootroute;
