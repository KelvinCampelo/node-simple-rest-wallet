module.exports = function (app) {

  const despesa = app.controllers.despesa;

  app.get('/despesas', despesa.getDespesas);
  app.get('/despesas/:id', despesa.getDespesa);
  app.post('/despesas', despesa.postDespesa);
  app.put('/despesas/:id', despesa.putDespesa);
  app.delete('/despesas/:id', despesa.deleteDespesa);

};