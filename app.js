require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const connectDb = require('./dbConfig');
const Estudiantes = require('./models/Estudiantes');

const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './vistas');

// Intermediarios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Controladores
app.get('/', async (req, res) => {
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.render('estudiantes', { estudiantes });
});

app.get('/estudiantes/:id', async (req, res) => {
    try {
        const estudiantes = await Estudiantes.findById(req.params.id).select('nombre edad');
        res.render('detalle', { estudiantes });
    } catch (error) {
        res.json({});
    }
});

app.post('/estudiantes/', async (req, res) => {
    const { nombre, edad } = req.body;
    await Estudiantes.create({ nombre, edad });
    const estudiantes = await Estudiantes.find().select('nombre edad');
    res.redirect('/');
});



app.post('/estudiantes/:id', async (req, res) => {
    try {
        const { nombre, edad } = req.body;
        const estudiante = await Estudiantes.findByIdAndUpdate(req.params.id,{ nombre, edad });
        res.redirect('/');
    } catch (error) {
        res.json({});
    }
});

app.delete('/estudiantes/:id', async (req, res) => {
    try {
        const estudiante = await Estudiantes.findByIdAndRemove(req.params.id,{useFindAndModify: false})
        return res.status(200).json({ message: "eliminado" });
    } catch (error) {
        return res.status(200).json({ message: "no eliminado" });
    }
});

connectDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Ejecutando en el puerto ${PORT}`);
    });
});