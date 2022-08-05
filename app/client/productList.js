const React = require("react");
const ProductsView = require("../pages/productList/view");
const hydrate = require("nordic/hydrate");

const { products } = window.__PRELOADED_STATE__;

hydrate(
  <ProductsView products={products} />,
  document.getElementById("root-app")
);
