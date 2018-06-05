var banadecuacion = false;
$(document).ready(function(){
	$('#cmdBuscar').on('click', function(){
		Buscar();
	});
	
	$('#cmdexportar').on('click', function(){
		//Calcular();
		//GeneraExcel();
	});

	$('#cboadecuacion').on('changed.bs.select', function (e) {
        var selected = $(this).find("option:selected").val();
        var StatusArray = ($(this).selectpicker('val') != null ? $(this).selectpicker('val').toString().split(',') : []);

        if (StatusArray.indexOf("0") != -1) {
            if (!banadecuacion) {
                $(this).find('option[value=0]').prop('selected', false).removeAttr('selected');
                $(this).selectpicker('refresh');
                banadecuacion = true;
            }
            else {
                $(this).selectpicker('deselectAll');
                $(this).find('option[value=0]').prop('selected', true);
                $(this).selectpicker('refresh');
                banadecuacion = false;
            }
        }
        else {
            if (StatusArray.indexOf("0") == -1) //No se encontro 0
            {
                $(this).find('option[value=0]').prop('selected', false).removeAttr('selected');
                $(this).selectpicker('refresh');
            }
            else //0 Encontrado
            {
                $(this).selectpicker('deselectAll');
                $(this).find('option[value=0]').prop('selected', true);
                $(this).selectpicker('refresh');
            }
        }
});

	Calcular();
});

function Calcular()
{
	var total_amp = 0;
	$('[id=div_global_amp]').each(function(index, element){
		total_amp = 0;
		//alert('Tipo: ' +  $(element).data('tipoadec') + ', Recurso: ' + $(element).data('idrecurso'));
    	$('input[id=HTotal_amp][data-idrecurso="' + $(element).data('idrecurso') + '"][data-tipoadec="' + $(element).data('tipoadec') + '"]').each(function(){
			total_amp += parseFloat($(this).val());
			//alert('Valor: ' + $(this).val() + ', Suma: ' + total_amp);
		});
		$(this).html(total_amp.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
	});

	var total_red = 0;
	$('[id=div_global_red]').each(function(index, element){
		total_red = 0;
		//alert('Recurso: ' + $(element).data('idrecurso'));
    	$('input[id=HTotal_red][data-idrecurso="' + $(element).data('idrecurso') + '"][data-tipoadec="' + $(element).data('tipoadec') + '"]').each(function(){
			total_red += parseFloat($(this).val());
			//alert('Valor: ' + $(this).val() + ', Suma: ' + total_amp);
		});
		$(this).html(total_red.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
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