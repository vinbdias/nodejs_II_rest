const LivroController = require('../controllers/LivroController');
const livroController = new LivroController();

const Livro = require('../models/Livro');

module.exports = app => {

    const livroRoutes = LivroController.routes();

    app.route(livroRoutes.livros)
        .get(livroController.lista());

    app.route(livroRoutes.newLivro)
        .post(Livro.validacoes(), livroController.save());

    app.route(livroRoutes.livro)
        .get(livroController.detail())
        .put(livroController.edit())
        .delete(livroController.delete());
};