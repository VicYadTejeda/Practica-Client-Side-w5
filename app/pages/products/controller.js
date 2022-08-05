const React = require('react');
const View = require('./view');
const config = require('nordic/config');
const ImageProvider = require('nordic/image/provider');
const I18nProvider = require('nordic/i18n/I18nProvider');
 // Se realiza la configuracion para que se pueda usar una imagen guardada dentro de la carpeta assets
const imagesPrefix = config.assets.prefix;

exports.render = function render(req, res) {
    
    const Products = props => (
        <I18nProvider i18n={req.i18n}>
          <ImageProvider prefix={imagesPrefix}>
            <View {...props} />
          </ImageProvider> 
        </I18nProvider>
      )

    res.render(Products, {
        message: 'Lista de productos',
        imagesPrefix,
        translations: req.translations 
    });
};