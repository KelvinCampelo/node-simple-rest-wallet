function DespesaDAO(connection){
  this._connection = connection;
}

DespesaDAO.prototype.salva = function (despesa, callback) {
  this._connection.query('INSERT INTO despesas SET ?', despesa, callback);
}

DespesaDAO.prototype.atualiza = function (despesa, callback) {
  this._connection.query('UPDATE despesas SET status=? where id = ?',
    [despesa.status,despesa.id], callback);
}

DespesaDAO.prototype.lista = function (callback){
  this._connection.query('SELECT * FROM despesas', callback);
}

DespesaDAO.prototype.buscaPorId = function (id, callback){
  this._connection.query('SELECT * FROM despesas where id= ?',[id], callback);
}

module.exports = function (){
  return DespesaDAO;
}
