
//uedes usar $('#element').hide(velocidad, miFuncion) donde

$(document).ready(function() {  
	
	$('#municipal').hide();//
	$('#rlegal').hide();
	
  	$('#fecha_bajar').datetimepicker({
		format: 'DD/MM/YYYY',
	});

  
  	$('#fecha_altar').datetimepicker({
		format: 'DD/MM/YYYY',
	});
  	
  	$('#tipo').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
		DatosBeneficiarios();
	});
  	
   	$('#cmdguardar').on('click', function(){
   		guardarRep();
   	});	
 	$('#cmdcerrar').on('click', function(){
		cerrar();
   	});	
   	
  	$('.selectpicker').selectpicker();
  	
  	
  	
});

function limpiar(){
	//$('.selectpicker').selectpicker('deselectAll');
	$('.selectpicker').selectpicker('val','');
	$('#cbUnidad').selectpicker('val','');
	$('#responsable').val('');
	$('#replegal').val('');
	$('#rfc').val('');
	$('#fecha_bajar').val('');
	$('#fecha_altar').val('');
	$('#tipo').selectpicker('val','');
	
	
}
function DatosBeneficiarios(){
	
	var tipoBeneficiario = $('#tipo').val();
	/*Retorna si vale cero*/
	if(tipoBeneficiario=='0') return false;
	
	switch(tipoBeneficiario){
	
		case '0': /*Municipio*/
			alert('Municipio');
			
		break;
		case 'MP': /*Municipio*/
			alert('Municipio');
			$('#municipal').show();
			$('#rlegal').hide();
		break;
		case 'PF': /*Municipio*/
			alert('Prestador');
			$('#municipal').hide();
			$('#rlegal').hide();
		break;
		case 'PM': /*Municipio*/
			alert('Prestador');
			$('#municipal').hide();
			$('#rlegal').show();
		break;
	}
	
	
	
}

function cerrar(){
	window.parent.swal.close();
	
}

	function guardarRep(){
		
		 var id_beneficiario = $('#cboprestadorservicio').selectpicker('val');
		 var cbUnidad = $('#cbUnidad').selectpicker('val');
		 var titular =$('#responsable').val();
		 var replegal= $('#replegal').val();
		 var rfc= $('#rfc').val();
		 var fecha_bajar= $('#fecha_bajar').val();
		 var fecha_altar= $('#fecha_altar').val();
		 var tipo_benefi = $('#tipo').selectpicker('val');
		 
		 		 
		 if(tipo_benefi=="PM"){
			 if ( id_beneficiario=="")  {swal('','Beneficiario no válido','warning'); return false;}
			 if ( tipo_benefi=="")  {swal('','Tipo beneficiario no válido', 'warning'); return false;}
			 if ( replegal=="") {swal('','Debe capturar el representante legal', 'warning'); return false;}
			 $('#cbUnidad').selectpicker('val');	 
			 //if ( rfc=="") {swal('','La Calle no es válida', 'warning'); return false;}
				 
		 }
		 else
		 {
			 if ( responsable=="")  {swal('Debe capturar un responsable para la Unidad adminitrativa', 'warning'); return false;}
			 if ( cbUnidad=="")  {swal('Seleccione una Unidad Administrativa válida','warning'); return false;}
			 //if ( rfc=="") {swal('','La Calle no es válida', 'warning'); return false;}
		 }
		
		  
		/* 
		controladorRepresentanteRemoto.guardarRepresentantes(tipo_benefi,id_beneficiario,cbUnidad,titular,replegal,fecha_altar,fecha_bajar,rfc,{
					 callback:function(items) {
						
						 swal("Good job!", "Beneficiario Guardado con éxito!", "success");
						 CloseDelay("Beneficiario guardado con éxito", 2000, function(){
							 limpiar();
							
							 //buscarBeneficiario();
							 
						 });
		 		     }	
					,errorHandler:function(errorString, exception) { 
					   swal('',errorString, 'error'); 
					}
		});	*/
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea guardar la informacion del representante?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!'
			}).then((result) => {
			  if (result.value  ) {
				 
				  swal({
					  title: 'Guardando',
					  //text: 'Pedido guardado con éxito!',
					  type: 'success',
					  timer: 4000,
					  onOpen: () => {
					    swal.showLoading()
					  }
					}).then((result) => {
					  if (
					   
					    result.dismiss === swal.DismissReason.timer
					  ) {
					  
						  controladorRepresentanteRemoto.guardarRepresentantes(tipo_benefi,id_beneficiario,cbUnidad,titular,replegal,fecha_altar,fecha_bajar,rfc,{
								 callback:function(items) {
									 $('#id_beneficiario').val(items);
									 //window.parent.cambiarVariable(razonSocial);
									 swal("Good job!", "Representante Guardado con éxito!", "success");
									 
									 limpiar();
									
													
					 		     }	
								,errorHandler:function(errorString, exception) { 
									swal('',errorString, 'error'); 
								}
							});	
					   
					  }
					})
			  
			  } else if (result.dismiss === swal.DismissReason.cancel) {
			    swal( 'Cancelado','El representante no se guardo','info' )
			  }
			})
	}
	