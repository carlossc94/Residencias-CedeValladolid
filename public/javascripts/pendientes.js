$(function(){

	$('#tbl-pendientes #btn-eliminar').click(function(e){
		e.preventDefault();
		var elemento=$(this);
		var id=elemento.parent().parent().find('#id_pendiente').text();

		$('.ui.small.test.modal').modal('show');

		$('.ui.positive.right.labeled.icon.button').click(function(e){
			$.ajax({
			url:'/dashboard/panel/pendiente',
			method:'post',
			data:{id:id},
			success: function(res){
				if(res.res){
					elemento.parent().parent().remove();
				}
			}
		});
		});
	});
});