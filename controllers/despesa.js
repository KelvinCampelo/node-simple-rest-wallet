module.exports = function (app) {
	const DESPESA_CRIADO = "CRIADO";
	const DESPESA_CONFIRMADO = "CONFIRMADO";
	const DESPESA_CANCELADO = "CANCELADO";
	const DespesaController = {
		getDespesas: (req, res) => {
			var connection = app.persistencia.connectionFactory();
			var despesaDAO = new app.persistencia.DespesaDAO(connection);
			despesaDAO.lista(function(erro,resultado){
				if (erro){
					console.log('Erro ao consultar o banco: '+erro);
					res.status(500).send(erro);
					return;
				} else {
					res.json(resultado);
				}
			});
    },
		getDespesa: (req, res) => {
			var id = req.params.id;
			console.log('consultando despesa ' +id);
			var connection = app.persistencia.connectionFactory();
			var despesaDAO = new app.persistencia.DespesaDAO(connection);

			despesaDAO.buscaPorId(id, function (erro, resultado){
				if (erro){
					console.log('Erro ao consultar o banco: '+erro);
					res.status(500).send(erro);
					return;
				} else {
					console.log('Despesa encontrada ' + JSON.stringify(resultado));
					res.json(resultado);
				}
			});
		},
    postDespesa: (req, res) => {
			req.assert("descricao","Descrição é Obrigatório").notEmpty();
			req.assert("mes", "Mês é obrigatório").notEmpty();
			req.assert("ano", "Ano é obrigatório").notEmpty();
			req.assert("valor","Valor é obrigatório e deve ser um decimal")
			.notEmpty().isFloat();
			var erros = req.validationErrors();
			if (erros){
				console.log("erro de validação encontrado");
				res.status(400).send(erros);
				return;
			}
			var despesa = req.body;
			despesa.status = DESPESA_CRIADO;
			var connection = app.persistencia.connectionFactory();
			var despesaDAO = new app.persistencia.DespesaDAO(connection);
			despesaDAO.salva(despesa, function(erro,resultado){
				if (erro) {
					console.log("Erro no banco " + erro);
					res.status(500).send(erro);
				} else {
					despesa.id =  resultado.insertId;
					res.location('despesas/despesa/'+despesa.id);
					var response = {
						dados_da_despesa : despesa,
						links: [
							{
								href: "http://localhost:300/pagamentos/pagamento/" +
								despesa.id,
								rel:"confirmar",
								method: "PUT"
							},
							{
								href: "http://localhost:300/pagamentos/pagamento/" +
								despesa.id,
								rel:"cancelar",
								method: "DELETE"
							}
						]
					}
					res.status(201).json(response);
				}

			});
    },
    putDespesa: (req, res) => {
			var despesa = {};
			var id = req.params.id;
			despesa.id = id;
			despesa.status = DESPESA_CONFIRMADO;
			var connection = app.persistencia.connectionFactory();
			var despesaDAO = new app.persistencia.DespesaDAO(connection);
			despesaDAO.atualiza(despesa, function(erro){
				if (erro){
					res.status(500).send(erro);
					return;
				}
				res.send(despesa);
			});
    },
    deleteDespesa: (req, res) => {
			var despesa = {};
			var id = req.params.id;
			despesa.id = id;
			despesa.status = DESPESA_CANCELADO;
			var connection = app.persistencia.connectionFactory();
			var despesaDAO = new app.persistencia.DespesaDAO(connection);
			despesaDAO.atualiza(despesa, function(erro){
				if (erro){
					res.status(500).send(erro);
					return;
				}
				res.status(204).send(despesa);
			});
    }
	};
	return DespesaController;
};
