$(document).ready(function(){
	$('#cmdBuscar').on('click', function(){
		Buscar();
	});
	
	$('#cmdexportar').on('click', function(){
		
		GeneraExcel();
	});

	//Calcular();
});
	
function Calcular()
{
	var total_amp = 0;
	$('#div_global_amp').each(function(index, element){
		alert('Recurso: ' + $(element).data('idrecurso'));
    	$('input[id=HTotal_amp][data-idrecurso="' + $(element).data('idrecurso') + '"]').each(function(){
			alert('Valor: ' + $(this).val());
		});
	});
}

function Buscar()
{
	$('#forma').submit();
}

function GeneraExcel()
{
	clavunidad=$('#cbUnidad').selectpicker('val');
	clavgasto=$('#cbotipogasto').selectpicker('val'); 
	clavproyecto=$('#txtproyecto').val();
	clavpartida=$('#txtpartida').val();
	var clavecapitulo = $('#cbocapitulo').selectpicker('val');
	
	//$('#CveOrdenOP').val($('#cve_op').val());
	
	$('#xidunidad').val(clavunidad);
	$('#xidgasto').val(clavgasto);
	$('#xproyecto').val(clavproyecto);
	$('#xpartida').val(clavpartida);
	$('#xcapitulo').val(clavecapitulo);
	
	$('#frmExcel').submit();
}