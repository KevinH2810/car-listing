  module.exports = function(app) {
      app.use('/model', require('./carListing'));
      app.use('/listing', require('./availability'));
      app.use('/brand', require('./brand'));
      app.use('/color', require('./color'));
      app.use('/fuel', require('./fuel'));
      app.use('/login', require('./login'));
  }