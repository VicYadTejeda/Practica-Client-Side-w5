const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const Image = require("nordic/image");
const { injectI18n } = require("nordic/i18n");

const restClient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

function View(props) {
  const { i18n, message, imagesPrefix, translations } = props;
  const [products, setProducts] = React.useState(null);

  //pasamos las props y las providers
  const preloadedState = {
    i18n,
    message,
    imagesPrefix,
    translations,
  };

  React.useEffect(() => {
    restClient.get("/get-products").then((response) => {
      console.log(` aqui es`, response.data);
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      {/* Carga Carga las props en el objeto window parseadas por serialize*/}
      <Script>
        {/* conecta los provedores con el client pasado atraves de las props*/}
        {`
                    window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
                      isJSON: true,
                    })}
                    console.log('%cPRoductspage is loaded!', 'color: blue')
                `}
      </Script>
      {/* Carga las dependencias necesarias*/}
      <Script src="vendor.js" />
      {/* Carga el archivo app/client/products.js en el navegador del usuario (cliente)*/}
      <Script src="products.js" />

      <h2>{message}</h2>
      {/* Para usar la imagen proveniente del assets solo colocamos el nombre en la etiqueta src */}
      {products ? (
        <ul>
          {products.map((prod) => (
            <li key={prod.id} style={{ listStyleType: "none" }}>
              <h4>{i18n.gettext(prod.title)}</h4>
              <a href={prod.permalink} target="_blank">
                <Image src={prod.thumbnail} alt={prod.title} lazyload="off" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No se encontró el producto</h2>
      )}

      <Image src="demo-image.jpg" alt="image-DEmo" lazyload="off" />
    </>
  );
}

module.exports = injectI18n(View);
