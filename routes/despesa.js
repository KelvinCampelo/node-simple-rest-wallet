module.exports = function (app) {
  const despesa = app.controllers.despesa;
  app.get('/despesas/despesa', despesa.getDespesas);
  app.get('/despesas/despesa/:id', despesa.getDespesa);
  app.post('/despesas/despesa', despesa.postDespesa);
  app.put('/despesas/despesa/:id', despesa.putDespesa);
  app.delete('/despesas/despesa/:id', despesa.deleteDespesa);
};
