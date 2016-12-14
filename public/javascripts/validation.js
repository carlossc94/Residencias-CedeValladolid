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

$('.form.registro').form({
      nombre: {
        identifier: 'nombre',
        rules: [
          {
            type   : 'empty',
            prompt : 'Nombre no puede estar vacío'
          }
        ]},
      email: {
        identifier: 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Email no puede estar vacío'
          },
          {
            type: 'regExp[/[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})/g]',
            prompt : 'Este no es un correo valido'
          }
        ]},
        pass: {
        identifier: 'pass',
        rules: [
          {
            type   : 'empty',
            prompt : 'Password no puede estar vacío'
          }
        ]}  
    })
});