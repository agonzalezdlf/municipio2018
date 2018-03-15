/**
Descripcion: Codigo controlador para la pagina beneficiario.jsp
Autor      : Mauricio Hernandez
Fecha      : 21/05/2010
*/

/**
*Al iniciar la pagina carga los eventos a los controles del formulario
*/

$(document).ready(function() {  
	
	
	$('#municipal').hide();//
	
	
	 $('#cmdcerrar').click(function (event){window.parent.compruebaVariable();});
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
  	
  	$('.selectpicker').selectpicker('refresh');
  	
});

function DatosBeneficiarios(){
	
	var tipoBeneficiario = $('#tipo').val();
	/*Retorna si vale cero*/
	if(tipoBeneficiario=='0') return false;
	
	/*
	switch(tipoBeneficiario){
	
		case '0': //Municipio
					
		break;
		case 'MP': //Municipio
			
			$('#municipal').show();
			$('#rlegal').hide();
		break;
		case 'PF': //Municipio
			
			$('#municipal').hide();
			$('#rlegal').hide();
		break;
		case 'PM': //Municipio
			
			$('#municipal').hide();
			$('#rlegal').show();
		break;
	}*/
	
	
	//alert('Selecionaste la opcion: ' + $('#tipo').val());
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
			 //$('#tipo').attr('value','');
}


function verificarBanco() {
	if ($('#banco').value=="") {
	   $('#idBanco').attr('value','');
	   $('#noCuenta').attr('value','');
	   $('#tipoCuenta').attr('value','');
	}
}
//Implementar la funcion valida.............. 2018
function valida(){
	if(clabeb.length<18){
		alert('La clabe debe contener 18 digitos');
		return false;
	}
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
	 var fecha_altab=$('#fecha_altab').val('');
	 var fecha_bajab=$('#fecha_bajab').val('');
	 //swal('Oops...','Something went wrong!','error') swal('El Tipo de beneficiario no es válido','warning')
	 if ( tipo=="0") {swal('Oops...','El Tipo de beneficiario no es válido!','warning'); return false;}
	 if ( fecha_altab=="") {swal('Oops...','El Tipo de beneficiario no es válido!','warning'); return false;}
	 
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
	
	 
	var vigencia='1';
	
	if (!$('#vigencia').attr('checked'))	
	   vigencia='0';
	
	ShowDelay('Guardando Beneficiario','');        //clave, razonSocial,responsable2,rfc, curp, telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb, fecha_alta
    controladorBeneficiarioRemoto.guardarBeneficiario(clave,razonSocial,responsable,responsable2,rfc, curp, telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,fecha_altab,{
			 callback:function(items) {
				 $('#idProveedor').attr('value', items);
				 window.parent.cambiarVariable(razonSocial);
				 swal("Good job!", "Beneficiario Guardado con éxito!", "success");
				 CloseDelay("Beneficiario guardado con éxito", 2000, function(){
					 limpiar();
					
					 buscarBeneficiario();
					 
				 });
 		     }	
			,errorHandler:function(errorString, exception) { 
			   jError(errorString, 'Error'); 
			}
		});		
}

 function buscarBeneficiario() {
	 if($('#razonSocial').attr('value')==''){jAlert('El nombre del beneficiario es un campo requerido, escriba un nombre válido','Advertencia'); return false;}
	 quitRow("beneficiarios");
	 var idBene;
	 ShowDelay('Buscando Beneficiario','');
	controladorBeneficiarioRemoto.getBeneficiarios($('#razonSocial').attr('value'), {
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
           jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
        }
    }); 

 }

  function pintaTabla( table, consecutivo,id,nombre,rfc,domicilio,tipo,vigencia){
	  alert('Entro aqui');
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
	 quitRow("beneficiariosHijos");
	controladorBeneficiarioRemoto.getBeneficiariosHijos($('#clave').attr('value'), {
        callback:function(items) { 		
            jQuery.each(items,function(i) {
		     var domicilio = this.DOMIFISCAL+" "+this.COLONIA+" "+this.CIUDAD +" "+ this.ESTADO;
 		     pintaTabla( "beneficiariosHijos", i+1 ,this.ID_PROVEEDOR,this.NCOMERCIA,this.RFC,domicilio,this.TIPOBENEFI,this.VIGENCIA);
        }); 					   						
			if (items.length > 0 ) 
			   $('#tr_hijos').show();
			else {
			   $('#tr_hijos').hide();			    
			}
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
           jError("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");      
        }
    }); 

 }
 
 function editar(id) {
	 
	ShowDelay('Cargando el beneficiario para edición','');	
	controladorBeneficiarioRemoto.getBeneficiario(id,{
    callback:function(items) { 
    	
    		
			 _closeDelay();	
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