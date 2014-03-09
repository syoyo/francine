module.exports = function(app, models) {
  var User = models.User;
  app.get('/users', function(req, res, next) {
    User.list(function(err, users) {
      if(err) {
        next(err);
      } else {
        var str = JSON.stringify(users, null, "  ");
        res.header('Content-Type', 'application/json');
        res.send(str);
      }
    });
  });

  app.get('/login', function(req, res, next) {
    if(req.session.user) {
      res.redirect('/');
    } else {
      res.render('login');
    }
  });

  app.post('/login', function(req, res, next) {
    if(req.session.user) {
      res.redirect('/');
      return;
    }

    User.login(req.body.name, req.body.password, function(err, user) {
      if(err) {
        next(err);
        return;
      }

      if(user == null) {
        req.flash('info', 'username or password is incorrect');
      } else {
        req.session.user = user;
      }
      res.redirect('/');
    });
  });

  app.get('/register', function(req, res, next) {
    if(req.session.user) {
      res.redirect('/');
      return;
    }
    res.render('register');
  });

  app.post('/register', function(req, res, next) {
    User.register(req.body.name, req.body.password, req.body.confirm, function(err) {
      if(err) {
        next(err);
        return;
      };
      req.flash('info', 'registed');
      res.redirect('/login');
    });
  });

  app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
  });
};
