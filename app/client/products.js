const React = require("react");
const View = require('../pages/products/view');
const hydrate = require("nordic/hydrate");
const I18n = require("nordic/i18n");
const I18nProvider = require("nordic/i18n/I18nProvider");
const ImageProvider = require('nordic/image/provider');

//cereamos una variable para poder hacer uso de las props guardadas en window.__PRELOADED_STATE__
const { message, imagesPrefix, translations } = window.__PRELOADED_STATE__;

//Generamos un nuevo i18 con la connfiguraciòn propia del lado del client
const i18n = new I18n({ translations });

// Con el logramos hacer nuestra página dinamica agregando los escuchadores de eventos
// Envolvemos los provaider con se encuentran en el controller para ser utilizados por el client
hydrate(
  <I18nProvider i18n={i18n}>
    <ImageProvider prefix={imagesPrefix}>
      <View message={message} />
    </ImageProvider>
  </I18nProvider>,
  document.getElementById("root-app")
);
