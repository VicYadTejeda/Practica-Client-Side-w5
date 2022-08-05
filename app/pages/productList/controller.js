const React = require("react");
const View = require("./view");
const productsService = require("../../../services/productsService");
// Se realiza la configuracion para que se pueda usar una imagen guardada dentro de la carpeta assets

exports.fetchProducts = function fetchProducts(req, res, next) {
  const { name, offset, limit } = req.query;
  productsService
    .getProducts(req.platform.siteId, name, offset, limit)
    .then((response) => {
      res.locals.products = response;
      next();
    })
    .catch((err) => next(err));
};

exports.render = function render(req, res) {
  const Products = (props) => <View {...props} />;
  res.render(Products, {
    products: res.locals.products,
  });
};
