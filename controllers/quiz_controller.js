var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId

exports.load = function(req, res, next, quizId) {
   models.Quiz.find(quizId).then(
     function(quiz) {
       if (quiz) {
         req.quiz = quiz;
         next();
       } else { next(new Error('No existe quizId=' + quizId));}
     }
    ).catch(function(error) { next(error);});
  };

// GET /quizes/:id
exports.show = function(req, res) {
     res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/search
exports.busca = function(req, res) {
     res.render('quizes/search');
};


// GET /quizes/result
exports.result = function(req, res, next) {
    var busqueda = req.query.busqueda.replace(" ", "%");
    console.log("lo que buscamos es %"+busqueda+"%");
    models.Quiz.findAll({where: ["pregunta like ?", "%"+busqueda+"%"]}).then(
     function(quizes) {
       if (quizes) {
         res.render('quizes/index', {quizes: quizes});
       } else { 
           next(new Error('No existe ninguna pregunta con esas palabras'));
       }
     }
    ).catch(function(error) { next(error);});
};

// GET /quizes/all
exports.index = function(req, res) {
   models.Quiz.findAll().then(
     function(quizes) {
       res.render('quizes/index', {quizes: quizes});
     }
   ).catch (function (error) { next (error);});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado ='Incorrecto'; 
  if (req.query.respuesta === req.quiz.respuesta){
      resultado= 'Correcto';
   }
   res.render('quizes/answer',{quiz:req.quiz, respuesta: resultado});
};

// GET /quizes/author
exports.author = function(req, res) {
    res.render('quizes/author', {author: 'Miguel Sánchez'});
};
