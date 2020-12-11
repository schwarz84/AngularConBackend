'use strict'

var express = require('express');

// Importo el controlador del project
var projectController = require('../controller/projectController');

var router = express.Router();

// Crear El middelware

var multipart = require('connect-multiparty');

var mutipartMiddelware = multipart({uploadDir: './uploads'});



router.get('/home', projectController.home);
router.get('/project/:id?', projectController.getProject);
router.get('/projects', projectController.getProyects);
router.get('/get-image/:image', projectController.getImageFile);

router.post('/test', projectController.test);
router.post('/save-project', projectController.saveProject);

router.post('/upload-image/:id',mutipartMiddelware,  projectController.uploadImage);

router.put('/update-project/:id', projectController.updateProject);

router.delete('/delete-project/:id', projectController.deleteProject);

module.exports = router;
