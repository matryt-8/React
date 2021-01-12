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

app.post('/movies', (req, res) => {
    fs.readFile('./movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in POST /movies: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var maxId = 0;
        for( let i  = 0; i < movies.length; i++)
        {
            if(movies[i].id >= maxId)
                maxId = movies[i].id;
        }
        var id = maxId;
        id = id + 1;
        if (id) {
            req.body.id = id;
            movies.push(req.body);
            var newList = JSON.stringify(movies);
            fs.writeFile('./movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /movies: "+ err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file movies.json and added new movie with id = " + req.body.id);
                }
            });
        } else {
            console.log("Movie by id = " + req.body.id + " already exists");
            res.status(500).send('Movie by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.put('/movies/:id', (req, res) => {
    fs.readFile('./movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in PUT /movies/" + req.params.id+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var movieBody = movies.find(movietmp => movietmp.id == req.body.id);
        if (movieBody && movieBody.id != req.params.id) {
            console.log("Movie by id = " + movieBody.id + " already exists");
            res.status(500).send('Movie by id = ' + movieBody.id + ' already exists');
            return;
        }
        var movie = movies.find(movietmp => movietmp.id == req.params.id);
        if (!movie) {
            movies.push(req.body);
            var newList = JSON.stringify(movies);
            fs.writeFile('./movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /movies/" + req.params.id+": "+err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file movies.json and added new movie with id = " + req.body.id);
                }
            });
        } else {
            for (var i = 0; i < movies.length; i++) {
                if (movies[i].id == movie.id) {
                    movies[i] = req.body;
                }
            }
            var newList = JSON.stringify(movies);
            fs.writeFile('./movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /movies/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file movies.json and edit movie with old id = " + req.params.id);
                }
            });
        }
    });
});

app.delete('/movies/:id', (req, res) => {
    fs.readFile('./movies.json', 'utf8', (err, moviesJson) => {
        if (err) {
            console.log("File read failed in DELETE /movies: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var movies = JSON.parse(moviesJson);
        var moviesIndex = movies.findIndex(moviestmp => moviestmp.id == req.params.id);
        if (moviesIndex != -1) {
            movies.splice(moviesIndex, 1);
            var newList = JSON.stringify(movies);
            fs.writeFile('./movies.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /movie/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file movies.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted movie with id = " + req.params.id);
                }
            });
        } else {
            console.log("Movie by id = " + req.params.id + " does not exists");
            res.status(500).send('Movie by id = ' + req.params.id + ' does not exists');
            return;
        }
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

app.post('/screenings', (req, res) => {
    fs.readFile('./screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in POST /screenings: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var maxId = 0;
        for( let i  = 0; i < screenings.length; i++)
        {
            if(screenings[i].id >= maxId)
                maxId = screenings[i].id;
        }
        var id = maxId;
        id = id + 1;
        if (id) {
            req.body.id = id;
            screenings.push(req.body);
            var newList = JSON.stringify(screenings);
            fs.writeFile('./screenings.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /screenings: "+ err);
                    res.status(500).send('Error writing file screenings.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file screenings.json and added new screening with id = " + req.body.id);
                }
            });
        } else {
            console.log("Screening by id = " + req.body.id + " already exists");
            res.status(500).send('Screening by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.put('/screenings/:id', (req, res) => {
    fs.readFile('./screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in PUT /screenings/" + req.params.id+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var screeningBody = screenings.find(screeningtmp => screeningtmp.id == req.body.id);
        if (screeningBody && screeningBody.id != req.params.id) {
            console.log("Screening by id = " + screeningBody.id + " already exists");
            res.status(500).send('Screening by id = ' + screeningBody.id + ' already exists');
            return;
        }
        var screening = screenings.find(screeningtmp => screeningtmp.id == req.params.id);
        if (!screening) {
            screenings.push(req.body);
            var newList = JSON.stringify(screenings);
            fs.writeFile('./screenings.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /screenings/" + req.params.id+": "+err);
                    res.status(500).send('Error writing file screenings.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file screenings.json and added new screening with id = " + req.body.id);
                }
            });
        } else {
            for (var i = 0; i < screenings.length; i++) {
                if (screenings[i].id == screening.id) {
                    screenings[i] = req.body;
                }
            }
            var newList = JSON.stringify(screenings);
            fs.writeFile('./screenings.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /screenings/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file screenings.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file screenings.json and edit screening with old id = " + req.params.id);
                }
            });
        }
    });
});

app.delete('/screenings/:id', (req, res) => {
    fs.readFile('./screenings.json', 'utf8', (err, screeningsJson) => {
        if (err) {
            console.log("File read failed in DELETE /screenings: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var screenings = JSON.parse(screeningsJson);
        var screeningsIndex = screenings.findIndex(screeningstmp => screeningstmp.id == req.params.id);
        if (screeningsIndex != -1) {
            screenings.splice(screeningsIndex, 1);
            var newList = JSON.stringify(screenings);
            fs.writeFile('./screenings.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /screening/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file screenings.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted screening with id = " + req.params.id);
                }
            });
        } else {
            console.log("Screening by id = " + req.params.id + " does not exists");
            res.status(500).send('Screening by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});

//#endregion screenings

// port na ktorym serwer nasluchuje
app.listen(7777, () => console.log("Server address http://localhost:7777"));