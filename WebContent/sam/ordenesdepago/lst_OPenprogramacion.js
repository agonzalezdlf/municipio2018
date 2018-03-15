$(document).ready(function() {  
	
	
		 //$("#txtfecha").datepicker({showOn: 'button', buttonImage: '../../imagenes/cal.gif', buttonImageOnly: true,dateFormat: 'dd/mm/yy'});
		 $('#btnBuscar').click(function(event){buscarOpMes();})
		 $('#cmdvalidar').click(function(event){validarOP();});
		 //$("#txtfechanueva").datepicker({showOn: 'button', buttonImage: '../../imagenes/cal.gif', buttonImageOnly: true,dateFormat: 'dd/mm/yy'});
		 
		 $('#txtfechanueva2').datetimepicker({
				format: 'DD/MM/YYYY'
			});
});

function DevolverOP(){
	var now = new Date();
	var checkClaves = [];
	
	$('input[id=chkOP]:checked').each(function() { checkClaves.push($(this).val());});
	
	if (checkClaves.length>0){
		 
		 if(fecha=='') {swal('','La fecha de validacion para la Orden de Pago no es válida', 'warning'); return false;}
		 
		 swal({
			  title: '¿Estas seguro?',
			  text: "Los cambios no podran revertirse",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sí, recibir',
			  cancelButtonText: 'No, cancelar!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false,
			  reverseButtons: true
			}).then((result) => {
			  if (result.value) {
				  ShowDelay('Validando Orden(es) de Pago','');
				  ControladorLst_OPenprogramacionRemoto.DevolucionOP(checkClaves, fecha,{
						callback:function(items) { 	
							CloseDelay('Validacion Aplicada con éxito',2000, function(){setTimeout("buscarOpMes();",1000);});	 	
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
					 }
				    });
			    swal('','Ordenes de pago recepcionadas con éxito!','success'
			    )
			  } else if (
			    // Read more about handling dismissals
			    result.dismiss === swal.DismissReason.cancel
			  ) {
			    swal('Abortado','No se recepciono la orden de pago','error'
			    )
			  }
			})
	 }
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
}


//Metodo para ejercer las ordenes de pago 
function validarOP()
{
	var now = new Date();
	var checkClaves = [];
	var fecha = $('#txtfechanueva2').val();
	//recuperar las claves a ejercer
     $('input[id=chkOP]:checked').each(function() { checkClaves.push($(this).val());});	
	 if (checkClaves.length>0){
		 
		 if(fecha=='') {swal('','La fecha de validacion para la Orden de Pago no es válida', 'warning'); return false;}
		 
		 swal({
			  title: '¿Estas seguro?',
			  text: "Los cambios no podran revertirse",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Sí, recibir',
			  cancelButtonText: 'No, cancelar!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false,
			  reverseButtons: true
			}).then((result) => {
			  if (result.value) {
				  ShowDelay('Validando Orden(es) de Pago','');
				  ControladorLst_OPenprogramacionRemoto.fechaValidacionOrdenPago(checkClaves, fecha,{
						callback:function(items) { 	
							CloseDelay('Validacion Aplicada con éxito',2000, function(){setTimeout("buscarOpMes();",1000);});	 	
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
					 }
				    });
			    swal('','Ordenes de pago recepcionadas con éxito!','success'
			    )
			  } else if (
			    // Read more about handling dismissals
			    result.dismiss === swal.DismissReason.cancel
			  ) {
			    swal('Abortado','No se recepciono la orden de pago','error'
			    )
			  }
			})
		/* jConfirm('¿Confirma que desea aplicar fecha de validación a las ordenes de pago seleccionadas?','Confirmar', function(r){
			if(r){
					ShowDelay('Validando Orden(es) de Pago','');
					ControladorLst_OPenprogramacion.fechaValidacionOrdenPago(checkClaves, fecha,{
						callback:function(items) { 	
							CloseDelay('Validacion Aplicada con éxito',2000, function(){setTimeout("buscarOpMes();",1000);});	 	
					 } 					   				
					 ,
					 errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
					 }
				    });
			}
	   });*/
	 }
	 else 
	    swal('','Es necesario que seleccione por lo menos una Orden de Pago para realizar esta acción','warning');
}


//funcion para bu{-}scar ordenes de pago segun criterio del mes
function buscarOpMes(){
	var s = "?&mes="+$('#cbomes').val();
	document.location = s;
}

function getReporteOP(clave) {
	$('#cve_op').attr('value',clave);
	$('#forma').attr('action',"../reportes/formato_orden_pago.action");
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
}