 $(document).ready(function() {  
	
		 $('#usuario').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
			 llenarTablaRoles();
		 });
		 
		 $('#unidad').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
			 getSelectUnidad();
		 });

		 $('#btnGuardar').on('click', function(){
			 guardarDato();
			});
		 
 });

	
function llenarTablaRoles() {	 
	quitRow( "detallesListas" );
	var usuario= $('#usuario' ).val();
	if (usuario!="" ) {	
	//ShowDelay('Cargando listado de roles','');
	
	

		swal({
			  title: 'Cargando....',
			  //type: 'success',
			  timer: 2500,
			  onOpen: () => {
			    swal.showLoading()
			  }
			}).then((result) => {
			  if (result.dismiss === swal.DismissReason.timer) {
				  controladorRolesAPersonasRemoto.buscarRolesUsuarios(usuario,  {
				        callback:function(items) { 	
				        
				        	//swal({title: 'Cargado con éxito!',text: '', type: 'success',position: 'top-end',timer: 1500,showConfirmButton: false}).then(function() {false; });
							
							 for (var i=0; i<items.length; i++ )  {			
									var reg = items[i];
									var idUsuarioRol =  getHTML( reg.ID_USUARIO_ROL);
									var rol=   getHTML( reg.ROL_DESCRIPCION);
									var idRol =  getHTML( reg.ID_ROL);
							        pintaTabla( "detallesListas", i+1 ,idUsuarioRol,rol,idRol);			
						        } 			
								$('#filaBoton').show();
							    $('#filaPrivilegio').show();
						}	
						,errorHandler:function(errorString, exception) { 
							swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');
						}
					});	
			   
			  }
			})
	
		  }  else  {
		  $('#filaBoton').hide();
		    $('#filaPrivilegio').hide();
	}
	
}


 function pintaTabla( table, consecutivo,idUsuarioRol,rol,idRol){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row = document.createElement( "TR" );
	var valchecked="";
	if (idUsuarioRol!="")
	  valchecked="checked";
	var html =  "<input type='checkbox' name='idRolUsuario_"+idRol+"' id='idRolUsuario_"+idRol+"' value='"+idUsuarioRol+"' "+valchecked+"> <input type='hidden' name='idRol' id='idRol' value='"+idRol+"'> ";	
    row.appendChild( Td("",centro ,"", html )); 		
 	row.appendChild( Td(rol,izquierda, "", "" ) ); 
 	tabla.appendChild( row );
 }
 

function guardarDato(){	
	
   var error="";
   var usuario= $('#usuario' ).val();
	var lista=checkboxSeleccionadosRoles();
		//ShowDelay('Guardando informaci�n del rol','');
		/*
	    controladorRolesAPersonasRemoto.guardarRolUsuario(lista,usuario,{
			 callback:function(items) {	  
 	  		   CloseDelay("Rol guardada con éxito",2000, function(){
					   $('#usuario' ).val('');			   
				});
				quitRow( "detallesListas");
				$('#filaPrivilegio').hide();	
				$('#filaBoton').hide();
 		     }	
								,errorHandler:function(errorString, exception) { 
								   swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');    
								}
			});*/
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
					  controladorRolesAPersonasRemoto.guardarRolUsuario(lista,usuario,{
					        callback:function(items) {
							
								swal("Good job!", "Rol guardada con éxito!", "success");
								$('#usuario' ).val('');	
								quitRow( "detallesListas");
								$('#filaPrivilegio').hide();	
								$('#filaBoton').hide();
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


function checkboxSeleccionadosRoles( ) {
	var checkbox = document.forma.idRol;
	var datos    = new Array();
	var sel=0;
	if ( checkbox != null ) {	
	var checkboxLength =checkbox.length;		
	if (isNaN(checkboxLength))	
	    checkboxLength = 0;	
	if (checkbox.length > 0 ) {		
	 for( var i=0; i < checkboxLength; i++ ){
	     var vidRol = checkbox[i].value;
		 var vidRolUsuario= $('#idRolUsuario_'+vidRol).val();		 
		 var vchecado=0;
		 if ($('#idRolUsuario_'+vidRol).prop('checked'))
		   vchecado=1;
		 var map = {idRol: vidRol, idRolUsuario: vidRolUsuario, checado:vchecado};
	     if(vidRolUsuario!='' || vchecado == 1) {
		    datos[sel]=map;
		    sel = sel + 1;
	       }
	   }
	}
	else {	   
		 var vidRol = checkbox.value;
		 var vidRolUsuario= $('#idRolUsuario_'+vidRol).val();		 
		  var vchecado=0;
		 if ($('#idRolUsuario_'+vidRol).prop('checked'))
		   vchecado=1;
		 var map = {idRol: vidRol, idRolUsuario: vidRolUsuario, checado:vchecado};
 	     if(vidRolUsuario!='' || vchecado == 1) 
		    datos[0]=map;
	   }
	}
	return datos;
}  


function getSelectUnidad() {
	
	 var idUnidad=$('#unidad').val(); 
	 dwr.util.removeAllOptions("usuario");
	 if (idUnidad !="" ){
	controladorRolesAPersonasRemoto.getUsuariosUnidad(idUnidad, {
        callback:function(items) { 				
		 dwr.util.addOptions('usuario',{ '':'[Seleccione]' });
		 dwr.util.addOptions('usuario',items,"CVE_PERS", "NOMBRE_COMPLETO" );		
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');          				     	  
        }
    }); 
	 }
 }
 