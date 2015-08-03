var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId

//router.get('/quizes(\\?busqueda=:quizPregunta', quizController.busca);
router.get('/quizes/all',                    quizController.index);
router.get('/quizes/:quizId(\\d+)',          quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',   quizController.answer);
router.get('/quizes/author',                 quizController.author);
router.get('/quizes/search',                 quizController.busca);
router.get('/quizes/result',                 quizController.result);

module.exports = router;
