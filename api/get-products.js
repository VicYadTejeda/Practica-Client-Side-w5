/**
 * Ejercitación 1
 *
 * Aquí deberás crear el endpoint con el método GET, el cual consuma
 * el servicio que devuelve los productos de la API de MeLi.
 *
 * Comando para correr el test: `npm run test:unit:watch get-products`
 */
const router = require("nordic/ragnar").router();
const service = require("../services/productsService");

router.get('/', (req, res) => {
  const { siteId } = req.platform;
  const { name , offset, limit}= req.query

  service
    .getProducts(siteId, name , offset, limit)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
