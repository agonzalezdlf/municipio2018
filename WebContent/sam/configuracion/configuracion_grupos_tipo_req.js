/**
Descripcion: Codigo controlador para la pagina grupos de vales
Autor      : Mauricio Hernandez León
Fecha      : 04/01/2010
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/
$(document).ready(function(){ 						   
$('#todos').click( function (event){ $('input[name=claves]').prop('checked', this.checked); });													
});						
						

function limpiar(){
		quitRow("detallesTabla");
		$('#grupo').val('');
}

 function pintarTablaDetalles() {
	
	quitRow("detallesTabla");
	var grupo=$('#grupo').val();	
	if (grupo!=""  ) {
	swal({
		  title: 'Cargando',
		  timer: 2000,
		  onOpen: () => {
		    swal.showLoading()
		  }
		}).then((result) => {
		  if (result.dismiss === swal.DismissReason.timer) {
			  controladorGruposTipoReqRemoto.getGrupoTipoReq(grupo, {
			        callback:function(items) {
			        	 jQuery.each(items,function(i) {
			  		    	pintaTabla( "detallesTabla", i+1 ,this.DESCRIPCION,getHTML(this.ID_GRUPO_TIPO_REQ),this.ID_TIPOREQUISICION);
			         	}); 					   	
			 			//swal("Good job!", "Grupo guardado con éxito!", "success");
			 			swal({title: 'Grupo cargado con éxito!',text: '', type: 'success',position: 'top-end',timer: 1500,showConfirmButton: false}).then(function() {false; });

					}	
					,errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');
					}
				});	
		   
		  }
		})
	}
 }

  function pintaTabla( table, consecutivo,descripcion, idclaveGrupo,idTipoReq){
	
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
	var selected="";
	if (idclaveGrupo!="")
	    selected="checked";
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+idTipoReq+"' "+selected+" >";
	row.appendChild( Td("",izquierda,"",htmlCheck) );
	row.appendChild( Td(descripcion,"","","") );
	tabla.appendChild( row );
 }
 
 
  function guardarValesGrupos(){
	 var checkVales = [];
     $('input[name=claves]:checked').each(function() {checkVales.push($(this).val());	 });
	 if($('#grupo').val()==0){swal('','El grupo seleccionado no es valido','warning'); return false;}
	 
	 swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar la informacion?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			 
			  swal({
				  title: 'Guardando',
				  type: 'success',
				  timer: 4000,
				  onOpen: () => {
				    swal.showLoading()
				  }
				}).then((result) => {
				  if (result.dismiss === swal.DismissReason.timer) {
					    controladorGruposTipoReqRemoto.guardarTipoReqGrupo(checkVales,grupo=$('#grupo').val(),{
					        callback:function(items) {
							
								swal("Good job!", "Grupo guardado con éxito!", "success");
								limpiar();
							}	
							,errorHandler:function(errorString, exception) { 
								swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');
							}
						});	
				   
				  }
				})
		  
		  } else if (result.dismiss === swal.DismissReason.cancel) {
			  swal('Cancelado','El beneficiario no se guardo','error')
		  }
		})
	 }