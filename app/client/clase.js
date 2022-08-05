const React = require('react');
const ClaseView = require('../pages/clase/view');
const hydrate = require('nordic/hydrate');

const { message } = window.__PRELOADED_STATE__;

// hydrate agrega los event listeners a los elementos. Luego, funciona como React.render()
hydrate(
    <ClaseView 
        message={message}
    />, 
    document.getElementById('root-app')
);

// index.html
{/* <main id="root-app">
    <ClaseView message={message}>
        código de ClaseView
    </ClaseView>
</main> */}
