  module.exports = function(app) {
      app.use('/listing', require('./carListing'));
      app.use('/brand', require('./brand'));
      app.use('/color', require('./color'));
      app.use('/fuel', require('./fuel'));
  }