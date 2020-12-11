'use strict'

var Project = require('../models/project');

var fs = require('fs');

var path = require('path');

var controller = {

    home: function(req, res) {
        return res.status(200).send({
            message: "Soy la Home"
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el Test"
        });
    },

    saveProject: function(req, res) {
        var project = new Project();
        
        var params = req.body;
        
        project.name        = params.name;
        project.description = params.description;
        project.category    = params.category;
        project.langs       = params.langs;
        project.year        = params.year;
        project.image       = null;
        
        project.save((err, projectStored) => {
           if(err) return res.status(500).send({
               message: "Error al guardar"
           });
           
           if(!projectStored) return res.status(404).send({
               message: "No se puedo guardar el objeto"
           });
           
           return res.status(200).send({
            //    project: params
               project: projectStored
           });
        });
    },

    getProject: function(req, res) {
        var projectId = req.params.id;
        
        if(projectId == null) return res.status(404).send({
            message: "No ingreso Id"
        });
        
        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({
                message: "Error al recuperar los datos"
            });
            
            if(!project) return res.status(404).send({
                message: "El proyecto no existe"
            });
            
            return res.status(200).send({
                project
            });
        })
    },
    
    getProyects: function(req, res) {
        Project.find({}).exec((err, projects) => {
             
            if(err) return res.status(500).send({
                message: "Error al recuperar los datos"
            });
            
            if(!projects) return res.status(404).send({
                message: "La peticion no devolvio resultados"
            });
            
            return res.status(200).send({
                projects
            });
            
        });
    },
    
    updateProject: function(req, res) {
    	var projectId = req.params.id;
        var update    = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
            
            if(err) return res.status(500).send({
                message: "No se pudo actualizar por un error"
            });

            if(!projectUpdated) return res.status(404).send({
                message: "No hay nada que actualizar"
            });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req, res) {
	    var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({
                message: 'No se pudo borrar por un error'
            });

            if(!projectDeleted) return res.status(404).send({
                message: 'No existe proyecto a borrar'
            });

            return res.status(200).send({
                project: projectDeleted
            });
        });
    },
    
    uploadImage: function(req, res) {
        var projectId = req.params.id;
        
        var faild = 'No se cargo imagen';
        
        // console.log(req);
        
        if(req.files) {
            
            var filePath = req.files.image.path;
            var filePathSplit = filePath.split('\\');
            var fileName = filePathSplit[1];
            
            // Mejora para que solo se pueda subir imagenes
            var extension = fileName.split('\.');
            
            
            if (extension[1] == 'png' || extension[1] == 'jpg' || extension[1] == 'jpeg' || extension[1] == 'gif') {
                
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true},(err, projectUpdated) => {
                    
                    if(err) return res.status(500).send({
                        message: 'No se puedo actualizar la imagen'
                    });
                
                    if(!projectUpdated) return res.status(404).send({
                        message: 'No existe projecto al cual actualizar la imagen'
                    });
                    
                    return res.status(200).send({
                        project: projectUpdated
                    });
                    
                });
            } else {
                
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: 'El archivo no tiene la extension correcta'
                    });
                    
                });
            }          
            
        } else {
            return res.status(500).send({
                message: faild
                // response: req.name
            });
        }
    },
    
    getImageFile: function(req, res) {
        var file = req.params.image;
        var pathFile = './uploads/' + file;
        
        fs.access(pathFile, fs.constants.F_OK, (err) => {
            if(!err) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(200).send({
                    message: 'No tiene imagen el proyecto'
                });
            }
        });
    }
};

module.exports = controller;
