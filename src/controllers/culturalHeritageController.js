// referensi data di ambil dari http://cagarbudaya.kemdikbud.go.id/
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const Cultureheritage = require('../models/culturalHeritage');

const _inputValidator = (req) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.status = 400;
        err.data = errors.array();

        throw err;
    }
}

const _removeImage = (filePath) => {
    console.log('filePath: ', filePath);
    console.log('dir name: ', __dirname);

    filePath = path.join(__dirname, '../..', filePath);
    fs.unlink(filePath, err => {
        console.log(err);
    });
}

const _dataNotFoundError = () => {
    const error = new Error('Data cagar budaya tidak ditemukan');
    error.statusCode = 404;
    throw error;
}

const createCulturalHeritage = async (req, res, next) => {
    _inputValidator(req);

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
            user_id: body.user_id,
            user_fullName: body.user_fullName,
        },
    });

    try {
        await cultureheritage.save()
            .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: "Data cagar budaya berhasil ditambahkan",
                    data: result
                });
            })
    } catch (error) {
        res.status(400).json({
            status: res.statusCode,
            message: 'Semua kolom wajib diisi.'
        })
    }
}

const getAllCulturalHeritage = (req, res, next) => {
    const currentPage = +req.query.page || 1;
    const perPage = +req.query.perPage || 9;
    let totalItems;

    Cultureheritage.find()
        .countDocuments()
        .then(count => {
            totalItems = count;
            return Cultureheritage.find()
                .skip((currentPage - 1) * perPage)
                .limit(perPage)
                .sort({
                    updatedAt: -1,
                });
        })
        .then(result => {
            res.status(200).json({
                message: 'Berhasil mendapatkan semua data cagar budaya.',
                data: result,
                total_data: totalItems,
                per_page: perPage,
                current_page: currentPage,
            });
        })
        .catch(err => {
            next(err);
        })
}

const getCulturalHeritageById = (req, res, next) => {
    const CultureheritageId = req.params.culturalheritageId;
    Cultureheritage.findById(CultureheritageId)
        .then(result => {
            if (!result) {
                _dataNotFoundError();
            }
            res.status(200).json({
                message: "Data cagar budaya Success dipanggil",
                data: result,
            });
        })
        .catch(err => {
            next(err);
        });
}

const updateCulturalHeritage = (req, res, next) => {
    _inputValidator(req);

    const body = req.body;
    let image;
    if (req.file != undefined) {
        image = req.file.path;
    }

    const CultureheritageId = req.params.culturalheritageId;
    Cultureheritage.findById(CultureheritageId)
        .then(cultureheritage => {
            if (!cultureheritage) {
                _dataNotFoundError();
            }
            if (!!image) {
                _removeImage(cultureheritage.image);
                cultureheritage.image = image;
            }
            if (!!body.nama) {
                cultureheritage.nama = body.nama;
            }
            if (!!body.jenis) {
                cultureheritage.jenis = body.jenis;
            }
            if (!!body.provinsi) {
                cultureheritage.provinsi = body.provinsi;
            }
            if (!!body.kabupaten) {
                cultureheritage.kabupaten = body.kabupaten;
            }
            if (!!body.sejarah) {
                cultureheritage.sejarah = body.sejarah;
            }
            if (!!body.description) {
                cultureheritage.description = body.description;
            }
            return cultureheritage.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Data cagar budaya berhasil diupdate",
                data: result,
            });
        })
        .catch(err => {
            next(err);
        });
}

const deleteCulturalHeritage = (req, res, next) => {
    const CultureheritageId = req.params.culturalheritageId;
    Cultureheritage.findById(CultureheritageId)
        .then(cultureheritage => {
            if (!cultureheritage) {
                _dataNotFoundError();
            }
            _removeImage(cultureheritage.image);
            return Cultureheritage.findByIdAndRemove(CultureheritageId);
        })
        .then(result => {
            res.status(200).json({
                message: "Hapus data cagar budaya berhasil dihapus",
                data: result,
            });
        })
        .catch(err => {
            next(err);
        })
}

module.exports = {
    createCulturalHeritage,
    getAllCulturalHeritage,
    getCulturalHeritageById,
    updateCulturalHeritage,
    deleteCulturalHeritage
}