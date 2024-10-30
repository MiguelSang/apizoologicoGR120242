const express = require("express");
const verifyToken = require('./validate_token'); // Si necesitas autenticación, puedes usar esto
const router = express.Router(); // Manejador de rutas de express
const animalSchema = require("../models/animal");

// Nuevo animal
router.post("/animals", (req, res) => {
    const animal = new animalSchema(req.body);
    animal
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Consultar todos los animales 
router.get("/animals", (req, res) => {
    console.log("Entro en la api");
    animalSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Actualizar un animal
router.put("/animals/:id", (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    animalSchema.findByIdAndUpdate(id, updatedData, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Animal no encontrado" });
            }
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

// Eliminar un animal
router.delete("/animals/:id", (req, res) => {
    const { id } = req.params;

    animalSchema.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "Animal no encontrado" });
            }
            res.json({ message: "Animal eliminado exitosamente" });
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;
