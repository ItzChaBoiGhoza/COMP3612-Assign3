const express = require('express');
const data = require('./dataProvider');

const app = express();

//endpoint for all the paintings funtionality
    app.get('/api/paintings', (req, res) => {
        const paintingsData = data.getPaintingsData();
        res.json(paintingsData);
    });

    //returns JSON for the single painting whose id matches the provided id
    app.get('/api/painting/:id', (req, res) => {
        const paintingId = parseInt(req.params.id);
        const painting = data.getPaintingsData().find(p => p.paintingID === paintingId);

        if(painting) {
            res.json(painting);
        } else {
            res.json({'message': 'No paintings found for the provided ID'});
        }
    });

    //Return JSON for the paintings whose gallery id matches the provided gallery id
    app.get('/api/painting/gallery/:id', (req, res) => {
        const galleryId = parseInt(req.params.id);
        const galleries = data.getPaintingsData().filter(painting => painting.gallery && painting.gallery.galleryID === galleryId);
        // console.log(galleries);

        if(galleries.length > 0) { 
            res.json(galleries);
        } else {
            res.json({'message': 'No paintings found for the provided gallery ID'});
        }
    });

    //Return JSON for the paintings whose artist id matches the provided artist id
    app.get('/api/painting/artist/:id', (req, res) => {
        const artistId = parseInt(req.params.id);
        const artists = data.getPaintingsData().filter(painting => painting.artist && painting.artist.artistID === artistId);

        if(artists.length > 0) {
            res.json(artists);
        } else {
            res.json({'message': 'No paintings found for the provided artist ID'});
        }
    });

    //Return all paintings whose yearOfWork field is between the two supplied values
    app.get('/api/painting/year/:min/:max', (req, res) => {
        const yearMin = parseInt(req.params.min);
        const yearMax = parseInt(req.params.max);

        const paintingYearRange = data.getPaintingsData().filter(painting => {
            const yearWork = painting.yearOfWork;
            return yearWork >= yearMin && yearMax <= yearMax;
        });

        if(paintingYearRange.length > 0) {
            res.json(paintingYearRange);
        } else {
            res.json({'message': 'No paintings found for the provided year range'});
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