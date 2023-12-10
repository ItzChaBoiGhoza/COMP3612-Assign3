const path = require('path');
const fs = require('fs');

// const paintingPath = path.join(__dirname, '../data', 'paintings-nested.json');
// const paintingRaw = fs.readFileSync(paintingPath, 'utf8');
// const paintingData = JSON.parse(paintingRaw);

// const artistPath = path.join(__dirname, '../data', 'artists.json');
// const artistRaw = fs.readFileSync(artistPath, 'utf8');
// const artistData = JSON.parse(artistRaw);

// const galleryPath = path.join(__dirname, '../data', 'galleries.json');
// const galleryRaw = fs.readFileSync(galleryPath, 'utf8');
// const galleryData = JSON.parse(galleryRaw);

const jsonFileLoad = (filename) => {
    const filePath = path.join(__dirname, '../data', `${filename}.json`);
    const fileRaw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileRaw);
}

const getPaintingsData = () => jsonFileLoad('paintings-nested');
const getArtistsData = () => jsonFileLoad('artists');
const getGalleriesData = () => jsonFileLoad('galleries');

module.exports = {
    getPaintingsData,
    getArtistsData,
    getGalleriesData
};