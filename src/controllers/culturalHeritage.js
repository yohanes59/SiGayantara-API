exports.createCulturalHeritage = (req, res, next) => {
    res.json(
        {
            message: "Cultural Heritage created successfully",
            data: {
                id: 1,
                title: "Test",
                lokasi: "Bandung",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facere sit exercitationem natus, nisi possimus itaque recusandae veritatis impedit. Totam",
            }
        }
    )
}

exports.getAllCulturalHeritage = (req, res, next) => {
    res.json(
        {
            message: "Get Cultural Heritage success",
            data: {
                id: 1,
                title: "Museum Bahari",
                lokasi: "Jakarta",
                description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facere sit exercitationem natus, nisi possimus itaque recusandae veritatis impedit. Totam",
            }
        }
    )
    next();
}