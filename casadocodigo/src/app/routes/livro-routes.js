const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const Livro = require('../models/Livro');

module.exports = app => {

    const livroRoutes = LivroController.routes();

    app.route(livroRoutes.livros)
        .get(livroController.lista())
        .post(Livro.validacoes(), livroController.save());        

    app.route(livroRoutes.livro)
        .delete(livroController.delete())
        .put(livroController.edit())
        .get(livroController.detail());
};