// referensi data di ambil dari http://cagarbudaya.kemdikbud.go.id/
const {validationResult} = require('express-validator');

exports.createCulturalHeritage = (req, res, next) => {
    const body = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const err = new Error('Invalid Value');
        err.status = 400;
        err.data = errors.array();

        throw err;
    }

    const result = {
        message: "Cultural Heritage created successfully",
        data: {
            cagar_id: 1,
            nama: "Museum Bahari",
            jenis: "bangunan",
            keberadaan: {
                provinsi: "Dki Jakarta",
                kabupaten: "Kota Adm. Jakarta Utara",
            },
            sejarah: "Kompleks Bangunan Museum Bahari didirikan tahun 1652, tetapi diubah beberapa kali sampai tahun 1759. Angka tahun perbaikan, perluasan atau penambahan gudang dapat dilihat di atas beberapa pintu museum, misalnya tahun 1718, 1719, atau tahun 1771. Westzidjsche Pakhuizen atau Gudang Tepi Barat menyimpan persediaan pala, lada, dan kopi. Di antara gudang dan Tembok Kota, VOC menyimpan persediaan tembaga dan timah. Logam berharga tersebut diamankan terhadap hujan oleh suatu serambi gantung. Serambi gantung ini dimanfaatkan juga untuk patroli. Serambi ini dipasang pada lantai kedua gudang yang menghadap pelabuhan tetapi sudah lama dibongkar (Heuken, 2000:36-37).",
            description: "Kompleks Bangunan Museum Bahari yang dahulu disebut Westzijdsche Pakhuizen, dirancang oleh Ir. Jacques Bollan dan didirikan dalam beberapa tahap mulai tahun 1652.",
            createdAt: new Date().toISOString(),
            author: {
                user_id: 1,
                nama: "Yohanes",
            }
        }
    }
    res.status(201).json(result);
}

exports.getAllCulturalHeritage = (req, res, next) => {
    res.json(
        {
            message: "Get Cultural Heritage success",
            data: {
                cagar_id: 1,
                nama: "Museum Bahari",
                jenis: "bangunan",
                keberadaan: {
                    provinsi: "Dki Jakarta",
                    kabupaten: "Kota Adm. Jakarta Utara",
                },
                sejarah: "Kompleks Bangunan Museum Bahari didirikan tahun 1652, tetapi diubah beberapa kali sampai tahun 1759. Angka tahun perbaikan, perluasan atau penambahan gudang dapat dilihat di atas beberapa pintu museum, misalnya tahun 1718, 1719, atau tahun 1771. Westzidjsche Pakhuizen atau Gudang Tepi Barat menyimpan persediaan pala, lada, dan kopi. Di antara gudang dan Tembok Kota, VOC menyimpan persediaan tembaga dan timah. Logam berharga tersebut diamankan terhadap hujan oleh suatu serambi gantung. Serambi gantung ini dimanfaatkan juga untuk patroli. Serambi ini dipasang pada lantai kedua gudang yang menghadap pelabuhan tetapi sudah lama dibongkar (Heuken, 2000:36-37).",
                description: "Kompleks Bangunan Museum Bahari yang dahulu disebut Westzijdsche Pakhuizen, dirancang oleh Ir. Jacques Bollan dan didirikan dalam beberapa tahap mulai tahun 1652.",
                createdAt: new Date().toISOString(),
                author: {
                    user_id: 1,
                    nama: "Yohanes",
                }
            }
        }
    )
    next();
}