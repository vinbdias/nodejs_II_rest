const { validationResult } = require('express-validator/check');

const LivroDao = require('../infra/LivroDao');
const db = require('../../config/database');


class LivroController {

    static routes() {

        return {            
            livros: '/livros',
            livro: '/livros/:id'            
        };
    }


    lista() {

        return (request, response) => {                          

            const livroDao = new LivroDao(db);
            livroDao.lista()
                .then(livros => response.status(200).json(livros))
                .catch(error => console.log(error));
        };
    }

    save() {

        return (request, response) => {      
            
            const livroDao = new LivroDao(db);

            const errors = validationResult(request);      
            
            console.log('entrou');

            if (!errors.isEmpty())
                return response.status(400)
                                .json(                    
                                    {
                                        livro: {
                                            id: '',
                                            titulo: request.body.titulo,
                                            preco: request.body.preco,
                                            descricao: request.body.descricao
                                        },
                                        validationErrors: errors.array()
                                    }
                                );

            livroDao.adiciona(request.body)
                .then(livro => response.status(201).json(livro))
                .catch(error => console.log(error));
        };
    }

    edit() {

        return (request, response) => {            

            const livroDao = new LivroDao(db);

            livroDao.atualiza(request.body)
                .then(livro => response.status(200).json(livro))
                .catch(error => console.log(error));
        };        
    }

    delete() {

        return (request, response) => {            

            const id = request.params.id;

            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                .then(() => response.status(200).end())
                .catch(error => console.log(error));
        };
    }

    detail() {

        return (request, response) => {            

            const id = request.params.id;
            const livroDao = new LivroDao(db);

            livroDao.buscaPorId(id)
                .then(livro => response.status(200).json(livro))
                .catch(error => console.log(error));
        };
    }    
}

module.exports = LivroController;