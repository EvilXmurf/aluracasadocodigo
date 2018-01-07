module.exports = function(app) {
	var listaProdutos = function(req, res, next) {
        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.lista(function(erros, results){

            if(erros){
                return next(erros);
            }

            res.format({
                html: function(){
                    res.render("produtos/lista",{lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });

        });
        connection.end();
     };

     var addProduto = function(req,res) {
        var produto = req.body;

		req.assert('titulo','Titulo é obrigatório').notEmpty();
		req.assert('preco','Formato inválido').isFloat();
		var erros = req.validationErrors();

		if(erros){
			res.format({
			    html: function(){
			        res.status(400).render('produtos/form',{errosValidacao:erros,produto:produto});
			    },
			    json: function(){
			        res.status(400).json(erros);
			    }
			})
		    return;
		}

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.salva(produto,function(erros,resultado){
        	console.log(erros);
        	res.redirect('/produtos');
        });
        connection.end();
    };

    var loadForm = function(req, res){
    	res.render('produtos/form', {errosValidacao:{}, produto:{}});
    };

    //Lista de produtos
    app.get('/produtos', listaProdutos);
	
	// Carrega Form
    app.get('/produtos/form', loadForm);

	//Salvar produto
	app.post("/produtos", addProduto);
}
