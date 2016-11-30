$(function(){
    $('.ui.form').form({
    fields: {
      titulo: {
        identifier: 'titulo',
        rules: [
          {
            type   : 'empty',
            prompt : 'El valor de Titulo no puede estar vacío'
          }
        ]
      },
      cuerpo: {
        identifier: 'cuerpo',
        rules: [
          {
            type   : 'empty',
            prompt : 'El valor de cuerpo no puede estar vacío'
          }
        ]
      }
    }
  });
});