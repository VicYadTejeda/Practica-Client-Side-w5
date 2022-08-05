const React = require('react');
const Script = require('nordic/script');
const serialize = require('serialize-javascript'); // función que parsea datos.

function View (props) {
    const { message } = props; // props que recibe el componente desde el server-side rendering (controller)
    const [count, setCount] = React.useState(0);

    const preloadedState = {
        message,
    } // props que le enviaremos el navegador del usuario para el client-side rendering

    // Funciones manejadoras de eventos onClick de los botones 
    // que suman y restan.
    const handleAdd = () => {
        console.log('Sumé');
        setCount(count => count + 1);
    }

    const handleSubstract = () => {
        console.log('Resté');
        setCount(count => count - 1);
    }
    
    return (
        <>
            {/* Estos 3 Scripts van a ser copy paste en general, sólo con el cambio en el del nombre de la page */}
            {/* 1) Carga las props en el objeto window del navegador del usuario (client) */}
            <Script>
                {`
                    window.__PRELOADED_STATE__ = ${serialize(preloadedState, { isJSON: true })}
                    console.log('%cClase page is loaded!', 'color: green')
                `}
            </Script>
            {/* 2) Carga las dependencias en el navegador del usuario (client)*/}
            <Script src="vendor.js"/>
            {/* Carga el archivo app/client/clase.js en el navegador del usuario (cliente)*/}
            <Script src="clase.js"/>

            <h2>{message}</h2>

            {/* Código interactivo que no va a funcionar hasta que no hagamos la conexión con el client */}
            <button onClick={handleSubstract}>-</button>
            <span>{count}</span>
            <button onClick={handleAdd}>+</button>
        </>
    )
}

module.exports = View;