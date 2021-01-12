import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//#region rooms 

app.get('/rooms', (req, res) => {
    fs.readFile('./rooms.json', 'utf8', (err, roomsJson) => {
        if (err) {
            console.log("File read failed in GET /rooms: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /rooms");
        res.send(roomsJson);
    });
});

app.get('/room/:id', (req, res) => {
    fs.readFile('./rooms.json', 'utf8', (err, roomsJson) => {
        if (err) {
            console.log("File read failed in GET /room/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var rooms = JSON.parse(roomsJson);
        var room = rooms.find(roomtmp => roomtmp.nr == req.params.id);
        if (!room) {
            console.log("Can't find room with id: " + req.params.id);
            res.status(500).send('Cant find room with id: ' + req.params.id);
            return;
        }
        var roomJSON = JSON.stringify(room);
        console.log("GET /room/" + req.params.id);
        res.send(roomJSON);
    });
});

//#endregion rooms

//#region movies

app.get('/movies', (req, res) => {
    fs.readFile('./movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in GET /movies: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /movies");
        res.send(moviesJson);
    });
});

app.get('/movie/:id', (req, res) => {
    fs.readFile('./movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in GET /movie/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movie = movies.find(movietmp => movietmp.id == req.params.id);
        if (!movie) {
            console.log("Can't find movie with id: " + req.params.id);
            res.status(500).send('Cant find movie with id: ' + req.params.id);
            return;
        }
        var movieJSON = JSON.stringify(movie);
        console.log("GET /movie/" + req.params.id);
        res.send(movieJSON);
    });
});

//#endregion movies

//#region screenings

app.get('/screenings', (req, res) => {
    fs.readFile('./screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in GET /screenings: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /screenings");
        res.send(screeningsJson);
    });
});

app.get('/screening/:id', (req, res) => {
    fs.readFile('./screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in GET /screening/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var screening = screenings.find(screeningtmp => screeningtmp.id == req.params.id);
        if (!screening) {
            console.log("Can't find screening with id: " + req.params.id);
            res.status(500).send('Cant find screening with id: ' + req.params.id);
            return;
        }
        var screeningJSON = JSON.stringify(screening);
        console.log("GET /screenings/" + req.params.id);
        res.send(screeningJSON);
    });
});

//#endregion screenings

// port na ktorym serwer nasluchuje
app.listen(7777, () => console.log("Server address http://localhost:7777"));