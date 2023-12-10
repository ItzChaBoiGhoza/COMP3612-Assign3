const express = require('express');
const data = require('./dataProvider');

const app = express();

//endpoint for all the paintings funtionality
app.get('/api/paintings', (req, res) => {
    const paintingsData = data.getPaintingsData();
    res.json(paintingsData);
});

app.get('/api/paintings/:id', (req, res) => {
    const paintingId = parseInt(req.params.id);
    const painting = data.getPaintingsData().find(p => p.paintingID === paintingId);

    if(painting) {
        res.json(painting);
    } else {
        res.json({'message': 'No paintings found for the provided ID'});
    }
});


//endpoint for all the artists funtionality
app.get('/api/artists', (req, res) => {
    const artistsData = data.getArtistsData();
    res.json(artistsData);
});

//endpoint for all the galleries functionality
app.get('/api/galleries', (req, res) => {
    const galleriesData = data.getGalleriesData();
    res.json(galleriesData);
})


module.exports = app;