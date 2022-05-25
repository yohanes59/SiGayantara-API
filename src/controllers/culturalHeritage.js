// referensi data di ambil dari http://cagarbudaya.kemdikbud.go.id/
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const Cultureheritage = require('../models/culturalHeritage');

const inputValidator = (req) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.status = 400;
        err.data = errors.array();

        throw err;
    }

    if (!req.file) {
        const err = new Error('Image is required');
        err.status = 422;
        throw err;
    }
}

exports.createCulturalHeritage = (req, res, next) => {
    inputValidator(req);

    const body = req.body;
    const image = req.file.path;

    const cultureheritage = new Cultureheritage({
        nama: body.nama,
        image: image,
        jenis: body.jenis,
        provinsi: body.provinsi,
        kabupaten: body.kabupaten,
        sejarah: body.sejarah,
        description: body.description,
        author: {
            user_id: 1,
            nama: "Yohanes",
        },
    });

    cultureheritage.save()
        .then((result) => {
            res.status(201).json({
                message: "Data cagar budaya berhasil ditambahkan",
                data: result,
            });
        })
        .catch((err) => console.log(err));
}

exports.getAllCulturalHeritage = (req, res, next) => {
    Cultureheritage.find()
        .then((result) => {
            res.status(200).json({
                message: 'Berhasil mendapatkan semua data cagar budaya.',
                data: result,
            });
        })
        .catch((err) => {
            next(err);
        });
}

exports.getCulturalHeritageById = (req, res, next) => {
    const CultureheritageId = req.params.culturalheritageId;
    Cultureheritage.findById(CultureheritageId)
    .then(result => {
        if(!result) {
            const error = new Error('Data cagar budaya tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Data cagar budaya Success dipanggil",
            data: result
        })
    })
    .catch(err => {
        next(err);
    });
}

exports.updateCulturalHeritage = (req, res, next) => {
    inputValidator(req);

    const body = req.body;
    const image = req.file.path;
    const CultureheritageId = req.params.culturalheritageId;

    Cultureheritage.findById(CultureheritageId)
    .then(cultureheritage => {
        if(!cultureheritage) {
            const error = new Error('Data cagar budaya tidak ditemukan');
            error.statusCode = 404;
            throw error;
        }
        removeImage(cultureheritage.image);

        cultureheritage.nama = body.nama;
        cultureheritage.image = image;
        cultureheritage.jenis = body.jenis;
        cultureheritage.provinsi = body.provinsi;
        cultureheritage.kabupaten = body.kabupaten;
        cultureheritage.sejarah = body.sejarah;
        cultureheritage.description = body.description;

        return cultureheritage.save();
    })
    .then(result => {
        res.status(200).json({
            message: "Data cagar budaya berhasil diupdate",
            data: result
        });
    })
    .catch(err => {
        next(err);
    })
}

const removeImage = (filePath) => {
    console.log('filePath: ', filePath);
    console.log('dir name: ', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    // console.log(filePath);
    fs.unlink(filePath, err => {
        console.log(err);
    });
}