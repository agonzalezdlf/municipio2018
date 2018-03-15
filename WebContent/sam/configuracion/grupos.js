/**
Descripcion: Codigo controlador para la pagina grupos.jsp
Autor      : Mauricio Hernandez
Fecha      : 26/10/2009
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*onClick="
*/


$(document).ready(function() {
	
	$('#btnGrabar').on('click', function(){
		guardar();
	});
	
	$('#btnGrabar').on('click', function(){
		limpiar();
	});
	
	$('#tipo').on('change', function(){
		pintarTablaDetalles();
		// alert( this.value );
	});
});

function limpiar(){
	
	 $('#descripcion').val('');
	 $('#estatus').prop('checked',true);			 
	 $('#clave').val('');
}

function guardar(){	
	
	var error="";
	var titulo ='Advertencia - Informacion no válida';
	if ( $('#descripcion').val()=="")  error += 'Descripción</br>';	
	if ( $('#tipo').val()=="")  error += 'Tipo</br>';	
	if ( error=="") {	
	var estatus='ACTIVO';
	if (!$('#estatus').prop('checked'))	
	   estatus='INACTIVO';	
	ShowDelay('Guardando grupo','');
    controladorGruposRemoto.guardarGrupo($('#clave').val(),$('#descripcion').val(),estatus,$('#tipo').val(),{
			 callback:function(items) {				 
	  			 CloseDelay("Grupo guardado con éxito", 2000, function(){pintarTablaDetalles();});
 		     }	
								,errorHandler:function(errorString, exception) { 
								   swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
								}
			});		}else swal(error,titulo);	
			
}



 function pintarTablaDetalles() {
	quitRow("detallesTabla");
	var estatus='ACTIVO';
	if (!$('#estatus2').val('checked'))	
	   estatus='INACTIVO';	
	   ShowDelay('Cargando grupos ' + $('#tipo').val(),'');
		
				
	controladorGruposRemoto.getGruposEstatus(estatus,$('#tipo').val(), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
				
 		     	pintaTabla( "detallesTabla", i+1 ,this.ID_GRUPO_CONFIG,this.GRUPO_CONFIG,this.ESTATUS,this.TIPO);
 		     	
 		     	
        }); 	
            swal.closeModal();
			
			//limpiar();
            //swal.hideLoading(); 
            //swal.disableLoading ()
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
        }
    }); 

 }
 
  function pintaTabla( table, consecutivo,id,descripcion,estatus,tipo){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+id+"' >";
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick=\"editar("+id+",'"+descripcion+"','"+estatus+"','"+tipo+"')\" >"; 		
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(descripcion,"","","") );	  
	row.appendChild( Td(tipo,centro,"","") );	  
	row.appendChild( Td(estatus,centro,"","") );
    row.appendChild( Td("",centro,"",htmlEdit) );	
	tabla.appendChild( row );
 }


 function editar(id,descripcion,estatus,tipo) {
		 $('#descripcion').val(descripcion);
		 if (estatus=='ACTIVO')
		   $('#estatus').prop('checked',true);			 
		 else
		   $('#estatus').prop('checked',false);
		 $('#clave').val(id);
		 $('#tipo').val(tipo);
 }


  function eliminar(){
	  var checkRetenciones = [];
     $('input[name=claves]:checked').each(function() {checkRetenciones.push($(this).val());	 });	 
	 if (checkRetenciones.length > 0 ) {
		 swal({
			  title: 'Estas seguro?',
			  text: "El cambio no podra revertirse!",
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Si, Cancelar!',
			  cancelButtonText: 'No, Abortar!',
			  confirmButtonClass: 'btn btn-success',
			  cancelButtonClass: 'btn btn-danger',
			  buttonsStyling: false
			}).then(function (r) {
			  if(r){
			ShowDelay('Deshabilitando beneficiario','');
			controladorGruposRemoto.eliminarGrupo(checkRetenciones, {
				callback:function(items) {
				   CloseDelay("Grupo eliminado con éxito", 2000, function(){pintarTablaDetalles();});
				   
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
				jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
				}
			});
		

			}
			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  if (dismiss === 'cancel') {
			    swal(
			      'Abortado',
			      'Tu requisicion no fue modificada :)',
			      'error'
			    )
			  }
			})
		/*	
		 jConfirm('¿Confirma que desea eliminar el grupo?','Confirmar', function(r){
			 	if(r){
						ShowDelay('Eliminando el grupo','');
						controladorGruposRemoto.eliminarGrupo(checkRetenciones, {
							callback:function(items) {
							   CloseDelay("Grupo eliminado con éxito", 2000, function(){pintarTablaDetalles();});
							   
							} 					   				
							,
							errorHandler:function(errorString, exception) { 
							jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
							}
						});
					}
		})
		*/	 
	 } else 
	    swal('','Es necesario que seleccione un elemento de la lista','error');
			
			
	 }
 