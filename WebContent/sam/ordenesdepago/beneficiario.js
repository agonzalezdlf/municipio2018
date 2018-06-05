/**
Descripcion: Codigo controlador para la pagina beneficiario.jsp
Autor      : Mauricio Hernandez, Israel Hernandez & Abraham Gonzalez
Fecha      : 20/05/2018
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/

$(document).ready(function() {  
	
	
	$('#municipal').hide();//
	
	
	 $('#cmdcerrar').on('click', function(){
		 //$('.selectpicker').selectpicker('refresh');
		 //windows.parent.selectpicker.selectpicker('refresh');
		 window.parent.swal.close();});//window.parent.swal.close();--window.parent.compruebaVariable();
  	 $('#cmdguardar').click(function(event){guardar();});
  	 
  	$('#fecha_altab').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
  	$('#fecha_bajab').datetimepicker({
		format: 'DD/MM/YYYY',
		
	});
  
  	$('#tipo').on('change',function(event){//El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
		DatosBeneficiarios();
	});
  	
  	$('.selectpicker').selectpicker();
  	
    
  	
});
function cerrarmodal(){

	window.parent.swal.close();
	
}


function DatosBeneficiarios(){
	
	var tipoBeneficiario = $('#tipo').val();
	/*Retorna si vale cero*/
	if(tipoBeneficiario=='0') return false;
	
}

function limpiar(){
			
	 		 $('#idProveedor').val('');
	 		 $('#clave').val('');			 			 
			 $('#razonSocial').val('');
			 $('#responsable').val('');
			 $('#responsable2').val('');
			 $('#rfc').val('');
			 $('#curp').val('');
			 $('#telefono').val('');
			 $('#tipo').val('');
			 $('#calle').val('');
			 $('#colonia').val('');
			 $('#ciudad').val('');
			 $('#estado').val('');
			 $('#cp').val('');
			 $('#banco').val('');
			 $('#idBanco').val('');
			 $('#noCuenta').val('');
			 $('#clabeb').val('');
			 $('#tipoCuenta').val('');
			 $('#beneficiarioPadre').val('');
			 $('#idBeneficiarioPadre').val('');
			 $('#fecha_altab').val('');
			 $('#fecha_bajab').val('');
			 $('#vigencia').prop('checked',true);
			 quitRow("beneficiariosHijos");
			 $('#tr_hijos').hide();				 
			
}


function verificarBanco() {
	if ($('#banco').value=="") {
	   $('#idBanco').val('');
	   $('#noCuenta').val('');
	   $('#tipoCuenta').val('');
	}
}
//Implementar la funcion valida.............. 2018
function valida(){
	if(clabeb.length<18){
		alert('La clabe debe contener 18 digitos');
		return false;
	}
}


function restaFechas2 (f1,f2){
	
	var aFecha1 = f1.split('/');
	var aFecha2 = f2.split('/');
	var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]); 
	var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]); 
	var dif = fFecha2 - fFecha1;
	var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
	return dias;
}

function guardar(){			
     var error="";
	 var clave= $('#idProveedor').val();			 			 
	 var razonSocial=$('#razonSocial').val();
	 var responsable=$('#responsable').val();
	 var responsable2=$('#responsable2').val();
	 var rfc=$('#rfc').val();
	 var curp=$('#curp').val();
	 var telefono=$('#telefono').val();
	 var tipo=$('#tipo').val();
	 var calle=$('#calle').val();
	 var colonia=$('#colonia').val();
	 var ciudad=$('#ciudad').val();
	 var estado=$('#estado').val();
	 var cp=$('#cp').val();
	 var idBanco=$('#cbobanco').val();
	 var noCuenta=$('#noCuenta').val();
	 var clabeb=$('#clabeb').val();
	 var tipoCuenta=$('#tipoCuenta').val();
	 var idBeneficiarioPadre=$('#idBeneficiarioPadre').val();
	 //$('#fecha').val()
	 var fecha_altab=$('#fecha_altab').val();
	 var fecha_bajab=$('#fecha_bajab').val();
	 //swal('Oops...','Something went wrong!','error') swal('El Tipo de beneficiario no es válido','warning')
	 if ( tipo=="0") {swal('Oops...','El Tipo de beneficiario no es válido!','warning'); return false;}
	 if ( fecha_altab=="") {swal('Oops...','La fecha de alta no es válida!','warning'); return false;}
	 if ( fecha_bajab=="") {swal('Oops...','La fecha de baja no es válida!','warning'); return false;}
	 
	 if(tipo=="PM"){
		 if ( rfc=="")  {swal('','El RFC no es válido','warning'); return false;}
		 if ( razonSocial=="")  {swal('','La Razón Social no es válida', 'warning'); return false;}
		 //if ( responsable=="")  {swal('','El Responsable no es válido', 'warning'); return false;}
		 if ( calle=="") {swal('','La Calle no es válida', 'warning'); return false;}
		 if ( colonia=="")  {swal('','La Colonia no es válida', 'warning'); return false;}
		 if ( estado=="")  {swal('','El Estado no es válido', 'warning'); return false;}
		 if ( ciudad=="")  {swal('','La Ciudad no es válida', 'warning'); return false;}
		 if ( cp=="")  {swal('','El Codigo postal no es válido', 'warning'); return false;}
		 if ( noCuenta=="") {swal('','La Cuenta debe ser capturada.', 'warning'); return false;}
		 if ( clabeb=="") {swal('','La Cuenta debe ser capturada.', 'warning'); return false;}
		 if (clabeb.length!=18){swal('','La CLABE debe contener 18 digitos.','warning');return false;}
	 }
	 else
	 {
		 if ( razonSocial=="")  {swal('La Razón Social no es válida', 'warning'); return false;}
	 }
	
	 var vigencia=restaFechas2(fecha_altab,fecha_bajab);

	
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar la informacion del beneficiario?',
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
				  
					  controladorBeneficiarioRemoto.guardarBeneficiario(clave,razonSocial,responsable,responsable2,rfc, curp, telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,fecha_altab,fecha_bajab,{
							 callback:function(items) {
								 $('#idProveedor').val(items);
								 window.parent.cambiarVariable(razonSocial);
								 swal("Good job!", "Beneficiario Guardado con éxito!", "success");
								 
								 cerrarmodal();
								 limpiar();
								 //buscarBeneficiario();
												
				 		     }	
							,errorHandler:function(errorString, exception) { 
								swal('',errorString, 'error'); 
							}
						});	
				   
				  }
				})
		  
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal(
		      'Cancelado',
		      'El beneficiario no se guardo',
		      'error'
		    )
		  }
		})
}

 function buscarBeneficiario() {
	 alert('Entro a buscarBeneficiario');
	 if($('#razonSocial').val()==''){sawl('','El nombre del beneficiario es un campo requerido, escriba un nombre válido','warning'); return false;}
	 quitRow("beneficiarios");
	 var idBene;
	 ShowDelay('Buscando Beneficiario','');
	controladorBeneficiarioRemoto.getBeneficiarios($('#razonSocial').val(), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
				_closeDelay();
			   idBene=this.ID_PROVEEDOR;
			 var domicilio = this.DOMIFISCAL+" "+this.COLONIA+" "+this.CIUDAD +" "+ this.ESTADO;
 		     pintaTabla( "beneficiarios", i+1 ,this.ID_PROVEEDOR,this.NCOMERCIA,this.RFC,domicilio,this.TIPOBENEFI,this.VIGENCIA);
 		     
        }); 					   						
			
			if (items.length > 0 ){ 
			  limpiar();
			  if (items.length!=1)
			   $('#formaBusqueda').show();
			    else {
				$('#formaBusqueda').hide();
			   editar(idBene);
				}
			  
			}
			else 
			      $('#formaBusqueda').hide();
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
        }
    }); 

 }

  function pintaTabla( table, consecutivo,id,nombre,rfc,domicilio,tipo,vigencia){
	alert('Entro aqui pintaTabla');
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );
    var htmlCheck = "<input type='checkbox' name='claves' id='claves' value='"+id+"' >";
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick=\"editar("+id+")\" >"; 		
	if (table !='beneficiariosHijos')
	  row.appendChild( Td("",centro,"",htmlCheck) );
	else
   	   	row.appendChild( Td(consecutivo,centro,"","") );
		row.appendChild( Td(nombre,"","","") );	  
		row.appendChild( Td(rfc,centro,"","") );	  
		row.appendChild( Td(domicilio,izquierda,"","") );
		row.appendChild( Td(tipo,centro,"","") );
		row.appendChild( Td(vigencia,centro,"","") );
	if (table !='beneficiariosHijos')
    row.appendChild( Td("",centro,"",htmlEdit) );	
	tabla.appendChild( row );
 }
 
 
 
 function buscarBeneficiarioHijos() {
	 alert('Entro aqui buscarBeneficiarioHijos');
	 quitRow("beneficiariosHijos");
	controladorBeneficiarioRemoto.getBeneficiariosHijos($('#clave').val(), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
		     var domicilio = this.DOMIFISCAL+" "+this.COLONIA+" "+this.CIUDAD +" "+ this.ESTADO;
 		     pintaTabla( "beneficiariosHijos", i+1 ,this.ID_PROVEEDOR,this.NCOMERCIA,this.RFC,domicilio,this.FECHA_ALTA,this.FECHA_BAJA,this.TIPOBENEFI,this.VIGENCIA);
        }); 					   						
			if (items.length > 0 ) 
			   $('#tr_hijos').show();
			else {
			   $('#tr_hijos').hide();			    
			}
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');      
        }
    }); 

 }
 
 function editar(id) {
	 alert('Entro aqui editar');
	ShowDelay('Cargando el beneficiario para edición','');	
	controladorBeneficiarioRemoto.getBeneficiario(id,{
    callback:function(items) { 
    	
    		
			 //_closeDelay();	
			 $('#idProveedor').val(items.ID_PROVEEDOR);
			 $('#clave').val(items.CLV_BENEFI);
			 $('#razonSocial').val(items.NCOMERCIA);
			 $('#responsable').val(items.BENEFICIAR);
			 $('#responsable2').val(items.BENEFICIA2);
			 $('#rfc').val(items.RFC);
			 $('#curp').val(items.CURP);
			 $('#telefono').val(items.TELEFONOS);
			 $('#tipo').val(items.TIPOBENEFI);
			 $('#calle').val(items.DOMIFISCAL);
			 $('#colonia').val(items.COLONIA);
			 $('#ciudad').val(items.CIUDAD);
			 $('#estado').val(items.ESTADO);
			 $('#cp').val(items.CODIGOPOST);
			 $('#banco').val(items.BANCO);
			 $('#idBanco').val(items.CLV_BNCSUC);
			 $('#noCuenta').val(items.NUM_CTA);
			 $('#clabeb').val(items.CLABE);
			 $('#tipoCuenta').val(items.TIPO_CTA);
			 $('#beneficiarioPadre').val(items.BENEFICIARIO);
			 $('#idBeneficiarioPadre').val(items.CLAVE_PADRE);
			 $('#fecha_altab').val(items.FECHA_ALTA);
			 $('#fecha_bajab').val(items.FECHA_BAJA);
			  if (items.VIGENCIA=='ACTIVO')
		        $('#vigencia').attr('checked',true);			 
		      else
		        $('#vigencia').attr('checked',false);		   
			    buscarBeneficiarioHijos();
    } 					   				
    ,
    errorHandler:function(errorString, exception) { 
        jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
}
},async=false );
	
}

 
 
  function eliminar(){
	  var checkBeneficiarios = [];
     $('input[name=claves]:checked').each(function() {checkBeneficiarios.push($(this).val());	 });	 
	 if (checkBeneficiarios.length > 0 ) {
	 ShowDelay('Eliminando movimientos de beneficiario','');
	 
     controladorBeneficiarioRemoto.eliminarBenificiario(checkBeneficiarios, {
        callback:function(items) {
		   CloseDelay("Se eliminaron satisfactoriamente los movimientos", 2000, function(){
			   	buscarBeneficiario();
			});
		   
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
		jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");    
        }
    }); } else 
	    jInformation("Es necesario que seleccione un elemento de la lista");

 }