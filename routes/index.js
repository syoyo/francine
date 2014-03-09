module.exports = function(app, models) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'francine' });
  });

  require('./user')(app, models);
  //require('./upload')(app, models, config);
};
