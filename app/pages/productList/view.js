const React = require("react");
const Script = require("nordic/script");
const serialize = require("serialize-javascript");
const Image = require("nordic/image");

const restclient = require("nordic/restclient")({
  timeout: 5000,
  baseURL: "/api",
});

function View({ products }) {
  const [listProducts, setListProducts] = React.useState(products);
  const [offset, setOffset] = React.useState(0);
  const isMounted = React.useRef(false);

  const preloadedState = {
    products,
  };

  const handleOffset = () => {
    setOffset((prev) => prev + 10);
    console.log("click");
  };

  React.useEffect(() => {
    if (isMounted.current) {
      restclient
        .get("/get-products", {
          params: {
            offset,
          },
        })
        .then((response) => {
          setListProducts(response.data);
        });
    }
    isMounted.current = true;
  }, [offset]);

  return (
    <>
      <Script>
        {`
                    window.__PRELOADED_STATE__ = ${serialize(preloadedState, {
                      isJSON: true,
                    })}
                    console.log('%cClase page is loaded!', 'color: green')
                `}
      </Script>
      <Script src="vendor.js" />
      <Script src="productList.js" />

      <button onClick={handleOffset}> Más productos </button>
      <p>{offset}</p>
      {listProducts.length ? (
        <ul>
          {listProducts.map((prod) => (
            <li key={prod.id} style={{ listStyleType: "none" }}>
              <h4>{prod.title}</h4>
              <a href={prod.permalink} target="_blank">
                <Image src={prod.thumbnail} alt={prod.title} lazyload="off" />
              </a>
              <p> precio: {prod.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No se encontraron productos</h2>
      )}
    </>
  );
}

module.exports = View;
