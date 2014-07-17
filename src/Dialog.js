define(function (require, exports, module) {
  'use strict';

  var Dialogs = brackets.getModule('widgets/Dialogs');
  var PreferencesManager = brackets.getModule("preferences/PreferencesManager");

  var template = require('text!res/template/dialog.html');

  exports.show = function () {
    var rendered = Mustache.render(template, {
      'CANCEL': 'CANCEL',
      'OK': 'OK',
      'PROXY': PreferencesManager.get('proxy') || '',
      'TITLE': 'Proxy'
    });
    
    var dialog = Dialogs.showModalDialogUsingTemplate(rendered);

    dialog.done(function (buttonId) {
      if(buttonId === Dialogs.DIALOG_BTN_OK) {
        PreferencesManager.set('proxy', dialog.getElement()[0].querySelector('input').value);
      }
    });
  };
});