$(document).ready(function() {
  var imagen="../../imagenes/cal.gif";	
  var formatFecha="dd/mm/yy";	
  $('#cmdbuscar').click(function(event){iniciarBusqueda();});
 
  $('#cbodependencia').change(function (event){cargaraAlmacenes($('#cbodependencia').val());});
  $('#cmdAperturar').click(function(event){aperturarEntradas();});
  $('#cmdcancelar').click(function(event){cancelarEntradas();});
  //getBeneficiarios('txtbeneficiario','ID_PROVEEDOR');
  
	//Inicializa el componente para los pedidos y fechas
  	$('.selectpicker').selectpicker();
	
//----------- Filtrado por fechas -------------------
	$('#txtfechaInicial').datetimepicker({
		format: 'DD/MM/YYYY'
	});
	$('#txtfechaFinal').datetimepicker({
		format: 'DD/MM/YYYY',
	    useCurrent: false //Important! See issue #1075
	});
	$("#txtfechaInicial").on("dp.change", function (e) {
	    $('#txtfechaFinal').data("DateTimePicker").minDate(e.date);
	});
	$("#txtfechaFinal").on("dp.change", function (e) {
	    $('#txtfechaFinal').data("DateTimePicker").maxDate(e.date);
	});
});

function validarEntrada(idEntrada){
	jConfirm('¿Confirma que desea validar la entrada de almacén?','Confirmar', function(r){
			if(r){
				ShowDelay('Validando Entrada','');
					controladorListadoEntradasDocumentosRemoto.validarEntrada(idEntrada, {
						callback:function(items) { 		
						 	CloseDelay('Entrada validada con éxito');
						 	iniciarBusqueda();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
				});
			}
	   },async=false );
	   
}

function aperturarEntradas(){
	var checkClaves = [];
     $('input[name=chkentradas]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		jConfirm('¿Confirma que desea aperturar la(s) entrada(s) seleccionada(s)?','Confirmar', function(r){
			if(r){
					//ShowDelay('Aperturando Entrada(s)','');
					controladorListadoEntradasDocumentosRemoto.aperturarEntrada(checkClaves, {
						callback:function(items) { 		
						 	CloseDelay('Entrada(s) aperturada(s) con éxito');
						 	iniciarBusqueda();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
				    });
			}
	   },async=false );
	 
	 } 
	else 
	    jAlert('Es necesario seleccionar por lo menos una Entrada del listado', 'Advertencia');
}


function cancelarEntradas(){ //Por boton Cancelar, en el listado de entradas..
	var checkClaves = [];
     $('input[name=chkentradas]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		jConfirm('¿Confirma que desea cancelar la(s) entrada(s) seleccionada(s)?','Confirmar', function(r){
			if(r){
					ShowDelay('Cancelando Entrada(s)','');
					controladorListadoEntradasDocumentosRemoto.cancelarEntrada(checkClaves, {
						callback:function(items) { 		
						 	CloseDelay('Entrada(s) cancelada(s) con éxito');
						 	iniciarBusqueda();
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
				    });
			}
	   },async=false );
	 
	 } 
	else 
	    jAlert('Es necesario seleccionar por lo menos una Entrada del listado', 'Advertencia');
}


function iniciarBusqueda(){
	//if($('#cboprestadorservicio').selectpicker('val')=='');
	pedido=$('#txtpedido').val();
	id_proveedor=$('#cboproveedor').selectpicker('val');
	
	//if($('#txtfechaInicial').val()!=''&&$('#txtfechaFinal').val()==''||$('#txtfechaFinal').val()!=''&&$('#txtfechaInicial').val()=='') {jAlert('El rango de fecha seleccioando para la busqueda no es valido', 'Advertencia'); return false;}
	var s = '?cbodependencia='+$('#cbodependencia').selectpicker('val')+'&id_almacen='+$('#cboalmacen').val()+"&fechaInicial="+$('#txtfechaInicial').val()+"&fechaFinal="+$('#txtfechaFinal').val()+"&id_tipo_documento="+$('#cbotipodocumento').val()+"&cboproveedor="+id_proveedor+"&id_pedido="+pedido+"&proyecto="+$('#txtproyecto').val()+"&partida="+$('#txtpartida').val()+"&num_documento="+$('#txtdocumento').val()+"&folio="+$('#txtfolio').val();
	document.location = s;
}

function editarDccumento(id_entrada, status){
	if(status==1) 
		document.location = 'entradas.action?id_entrada='+id_entrada;
	if(status==0)
		document.location = '../entradas/captura_documentos.action?id_entrada='+id_entrada;
	if(status==''||status==' ')
		document.location = '../entradas/captura_documentos.action?id_entrada='+id_entrada;
	
}

function cargaraAlmacenes(idDependencia) {
     dwr.util.removeAllOptions("cboalmacen");
	 controladorListadoEntradasDocumentosRemoto.getAlmacenes(idDependencia, {
        callback:function(items) { 		
			dwr.util.addOptions('cboalmacen',{ 0:'[Seleccione]'});
			dwr.util.addOptions('cboalmacen',items,"ID_ALMACEN", "DESCRIPCION");
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
			jError(errorString,'Error');          
        }
    },async=false ); 
 }
 
function getReporteEntrada(id_entrada) {
	$('#ID_ENTRADA').attr('value', id_entrada);
	//$('#frmreporte').attr("action","../reportes/entradas.action");
	$('#frmreporte').attr("target","impresion");
	$('#frmreporte').submit();
    $('#frmreporte').attr("target","");

}

function getReportePedido(cve_ped)
{
	$('#clavePedido').attr('value',cve_ped);
	$('#frmreporte').attr('target',"impresion_pedido");
	$('#frmreporte').attr("action", "../../sam/reportes/rpt_pedido.action");
	$('#frmreporte').submit();
	$('#frmreporte').attr('target',"");
	$('#frmreporte').attr('action',"../reportes/entradas.action");
}

function cancelarDocumento(id_documento){
		jConfirm('&iquest;Confirma que desea cancelar la entrada actual?','Cancelar entrada', function(r){
			if(r){
					 controladorListadoEntradasDocumentosRemoto.cancelarDocumento(id_documento, {
						callback:function(items) {
							if(items=="") CloseDelay('Entrada cancelada con exito', iniciarBusqueda());
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						jError(errorString, 'Error');          
					 }
				    });
			}
	   });	 
}

function getListadoEntradas()   {
	$('#frmreporte').attr('target',"impresionlistadoEntradas");
	$('#frmreporte').attr('action',"../reportes/rpt_listado_entrada.action");
	$('#frmreporte').submit();
	$('#frmreporte').attr('target',"");
	$('#frmreporte').attr('action',"lst_entradas.action");
}