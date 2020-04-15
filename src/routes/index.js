const express = require('express');
const router = express.Router();
const Estudiante = require('../model/Estudiante');

router.get('/', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.render('index', {
    estudiantes
  });
});

router.post('/add', async (req, res, next) => {
  const estudiante = new Estudiante(req.body);
  await estudiante.save();
  res.redirect('/');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const estudiante = await Estudiante.findById(id);
  estudiante.status = !estudiante.status;
  await estudiante.save();
  res.redirect('/');
});


router.get('/edit/:id', async (req, res, next) => {
  const estudiante = await Estudiante.findById(req.params.id);
  console.log(estudiante)
  res.render('edit', { estudiante });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Estudiante.update({_id: id}, req.body);
  res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Estudiante.remove({_id: id});
  res.redirect('/');

  var fs = require('fs');
  var https = require('https');
  var express = require('express');
  const PORT = 443;
      
  var app = express();
  https.createServer({
      key: fs.readFileSync('Escuela.key'),
      cert: fs.readFileSync('Escuela.crt')
  }, app).listen(PORT, function(){
      console.log("My https server listening on port " + PORT + "...");

  });
});

module.exports = router;
