const express = require('express');
const data = require('./dataProvider');

const app = express();

//endpoint for all the paintings funtionality
    //Returns JSON for all paintings
    app.get('/api/paintings', (req, res) => {
        const paintingsData = data.getPaintingsData();
        res.json(paintingsData);
    });

    //Returns JSON for the single painting whose id matches the provided id
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

    //Returns JSON for the paintings whose title contains (somewhere) the provided text. This search should be case sensitive
    app.get('/api/painting/title/:text', (req, res) => {
        const searchedTitle = req.params.text.toLowerCase();

        const paintingsByTitle = data.getPaintingsData().filter(painting => painting.title.toLowerCase().includes(searchedTitle));

        if(paintingsByTitle.length > 0) {
            res.json(paintingsByTitle);
        } else {
            res.json({'message': 'No paintings found for the provided text'});
        }
    });

    //Return JSON for the paintings that have a color that matches the provided hex value.This should be case insensitive
    app.get('/api/painting/color/:name', (req, res) => {
        const colourName = req.params.name.toLocaleLowerCase();

        const paintingsByColourName = data.getPaintingsData().filter(painting => painting.details.annotation.dominantColors.some(color => color.name.toLocaleLowerCase() === colourName));

        if(paintingsByColourName.length > 0){
            res.json(paintingsByColourName);
        } else {
            res.json({'message': 'No paintings found for the provided colour name'});
        }
    });

//endpoint for all the artists funtionality
    //Returns JSON for all artists
    app.get('/api/artists', (req, res) => {
        const artistsData = data.getArtistsData();
        res.json(artistsData);
    });

    //Return JSON for all artists from the specified country. This sould be case insensitive
    app.get('/api/artists/:country', (req, res) => {
        const searchedCountry = req.params.country.toLowerCase();

        const artistsByCountry = data.getArtistsData().filter(artist => artist.Nationality.toLowerCase().includes(searchedCountry));

        if(artistsByCountry.length > 0) {
            res.json(artistsByCountry);
        } else {
            res.json({'message': 'No artists found for the provided country'});
        }
    });

//endpoint for all the galleries functionality
    //Returns JSON for all galleries
    app.get('/api/galleries', (req, res) => {
        const galleriesData = data.getGalleriesData();
        res.json(galleriesData);
    });

    //Returns JSON for all galleries from the specified country. This should be case insensitive
    app.get('/api/galleries/:country', (req, res) => {
        const searchedCountry = req.params.country.toLowerCase();

        const galleriesByCountry = data.getGalleriesData().filter(gallery => gallery.GalleryCountry.toLowerCase().includes(searchedCountry));

        if(galleriesByCountry.length > 0) {
            res.json(galleriesByCountry);
        } else {
            res.json({'message': 'No galleries found for the provided country'});
        }
    });
    
module.exports = app;