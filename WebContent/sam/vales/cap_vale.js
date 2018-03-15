var nLotes;

$(document).ready(function(){
	
  var options = { 
        beforeSubmit:  showRequest,  
        success:       showResponse, 
        url:       '_subirArchivo.action',
        type:      'post', 
        dataType:  'json'
    }; 
  $('#frmDoc').submit(function(){
  	$('#CVE_VALE').val($('#cve_val').val());
		$(this).ajaxSubmit(options);
		return false;
	});
 /*
   $('#forma').submit(function(){
		$(this).ajaxSubmit(options);
		return false;
   });
   */
   $('#fecha').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date(),
	});
  /*----------------------   Fechas por rango  ----------------------------*/
   $('#fechaInicial').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date(),	
		
	});
		
	$('#fechaFinal').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date(),
	    //useCurrent: false //Important! See issue #1075
	});
	$('#fechaInicial').on('dp.change', function (e) {
	    $('#fechaFinal').data('DateTimePicker').minDate(e.date);
	});
	$('#fechaFinal').on('dp.change', function (e) {
	    $('#fechaInicial').data('DateTimePicker').maxDate(e.date);
	});
	/*****************************************************************************/
	
	$('#fechaMaxima').datetimepicker({
		format: 'DD/MM/YYYY',
		minDate: new Date(),
	    //useCurrent: false //Important! See issue #1075
	});
	
	$('#fechaFinal').on('dp.change', function (e) {
	    $('#fechaMaxima').data('DateTimePicker').minDate(e.date);
	});
	$('#fechaMaxima').on('dp.change', function (e) {
	    $('#fechaFinal').data('DateTimePicker').maxDate(e.date);
	});
	
	
   //El metodo on asigna uno o mas controladores de eventos para los elementos seleccionados.
   $('#tipoVale').on('change',function(event){
	   cambioTipoVale();
   });
   
   //Mostrar si es vale de anticipo de obra los contratos 
   $('#muestra_contratos').on('click',function(event){
	   muestraContratos();
	   event.preventDefault();
	   return false;
   });
   
   $('#xGrabar').on('click',function(event){
	   guardar();
   });
   
   $('#cmdnuevo').on('click',function(event){
	   limpiar();
   });
   
   
   cambioTipoVale();
   
   
   if ($('#cve_val').val()!=0&&$('#cve_val').val()!='')
		$('#cmdcerrar').prop('disabled','');
		
   $('#cmdagregar').on('click',function(event){
	   agregarEdidatConcepto();
   });
   $('#cmdnuevoconcepto').on('click',function(event){
	   limpiarDetalles();
   });
   
   $('#cmdpresupuesto').on('click',function(event){
	   muestraPresupuesto();
   });
	
  
   if($('#cve_val').val()!=0){
		//$('#tabuladores').tabs('enable', 1);
		$('.nav-tabs a[href="#fragment-pedidos"]').tab('show');
		mostrarDetallesArchivos();
		mostrarDetalles();
	}
	$('#ui-datepicker-div').hide();
	
	$('#cmdcerrar').on('click',function(event){
		cerrarVale();
	   });
	
	$('.nav-tabs a[href="#fragment-pedidos"]').tab('show');//Carga mostrando el primer tabs
	
	/*deshabilita tabs*/
    //$('a[href="#fragment-movimientos"]').removeAttr('data-toggle');
    
    /*habilita tabs*/
    //$('a[href="#fragment-movimientos"]').addClass('data-toggle');
  
	$('#imgborradetalle').on('click',function(event){
		eliminarDetalle();
	}) 
	$('#cmdnuevoconcepto').on('click',function(event){
		limpiar();
	}) 
	
    
  $('#txtproyecto').blur(function(event){__getPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),  'txtpresupuesto','txtdisponible','');});	
  $('#txtpartida').blur(function(event){__getPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),  'txtpresupuesto','txtdisponible','');});
  $('#img_quitar_contrato').click(function(event){removerContrato();});
 
  if ($('#txtproyecto').attr('value')!="" && $('#txtpartida').attr('value')!="" )
     __getPresupuesto($('#ID_PROYECTO').attr('value'),$('#txtproyecto').attr('value'),$('#txtpartida').attr('value'), $('#cbomes').attr('value'),  'txtpresupuesto','txtdisponible','');

});




function getcontratoDocumento(num_contrato, cve_contrato, idRecurso, clv_benefi, proyecto, clv_partid, importe, ncomercia)
{
	$('#CVE_CONTRATO').val(cve_contrato);
	$('#txtnumcontrato').val(num_contrato);
	$('#CLV_BENEFI').selectpicker('val', clv_benefi);
	//$('#claveBeneficiario').selectpicker('val', clv_benefi);
	//$('#beneficiario').selectpicker('val', ncomercia);
	_closeDelay();
	
	
	//cargarDetallesContrato(num_contrato, cve_contrato, idRecurso, clv_benefi, proyecto, clv_partid, importe);
}

function agregarEdidatConcepto(){
	if($('#ID_PROYECTO').val()==''||$('#ID_PROYECTO').val()=='0') {swal('','El programa escrito no es valido','warning'); return false;}
	if($('#txtpartida').val()=='') {swal('','La partida escrita no es valida','warning'); return false;}
	if($('#txtimporteDet').val()=='') {swal('','El importe escrito no es valido','warning'); return false;}
	ShowDelay('Agregando concepto','');
	controladorValesRemoto.agregarConcepto($('#ID_DETALLE').val(), $('#cve_val').val(), $('#ID_PROYECTO').val(), $('#txtpartida').val(), $('#txtimporteDet').val(), $('#txtdetalle').val(), {
		callback:function(items){
					if(items=='')
						{
							CloseDelay("Concepto agregado con exito");
							limpiarDetalles();
							mostrarDetalles();
							nLotes++;
					}
					else{
						_closeDelay();
						swal(items,'Error');
					}
						
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');       
				}
		});
}

function mostrarDetalles(){
	var cont=0;
	var total=0;
	quitRow("listaDetalles");
	$('#cmdcerrar').prop('disabled',true);
	controladorValesRemoto.getDetallesVales($('#cve_val').val(), {
						   callback:function(items) { 
						   		jQuery.each(items,function(i){
									$('#cmdcerrar').prop('disabled',false);
									//$("#maestro").removeClass("active");
									//$("#detalle").addClass("active");
									//$('a[href="#fragment-movimientos"]').addClass('data-toggle');
									//$('a[href="#fragment-movimientos"]').addClass('data-toggle');
									 cont++;
									 total+= this.IMPORTE; 
									 $('#IMPORTE_TOTAL').val(total);
									 pintaTablaConceptos('listaDetalles', this.ID_MOV_VALE, this.ID_DEPENDENCIA, this.DEPENDENCIA, this.ID_PROYECTO, this.CLV_PARTID, this.N_PROGRAMA, this.DESCRIPCION, this.IMPORTE);				   
									 if(items.length==cont) 
										 pintarTotalConceptos('listaDetalles', $('#IMPORTE_TOTAL').val(),cont); 
									 
								});
						   }
	});
}

function pintaTablaConceptos(table, ID_MOV_VALE, ID_DEPENDENCIA, DEPENDENCIA, ID_PROYECTO, CLV_PARTID, N_PROGRAMA, DESCRIPCION, IMPORTE){
	var tabla = document.getElementById(table).tBodies[0];
 	var row =   document.createElement( "TR" );    
	var htmlCheck = "<input type='checkbox' name='chkdetalle' id='chkdetalle' value='"+ID_MOV_VALE+"'>";
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt='Editar'  width=\"16\" height=\"16\" border=\"0\" onClick=\"editarConcepto("+ID_MOV_VALE+","+ID_PROYECTO+","+ID_DEPENDENCIA+",'"+N_PROGRAMA+"','"+CLV_PARTID+"','"+DESCRIPCION+"','"+IMPORTE+"')\" >"; 		
	
	row.appendChild( Td("",centro,"",htmlCheck));
	row.appendChild( Td(DEPENDENCIA,izquierda,"",""));
	row.appendChild( Td(DESCRIPCION,izquierda,"",""));
	row.appendChild( Td(N_PROGRAMA,centro,"",""));
	row.appendChild( Td(CLV_PARTID,centro,"",""));
	row.appendChild( Td(formatNumber(IMPORTE, '$'),derecha,"",""));
	row.appendChild( Td("",centro,"",htmlEdit));	
	tabla.appendChild(row);
}

function editarConcepto(idDetalle, idProyecto, ID_DEPENDENCIA, proyecto, clv_partid, nota, importe){
	
	$('#ID_DETALLE').val( idDetalle);
	$('#ID_PROYECTO').val( idProyecto);
	$('#txtdetalle').val( nota);
	$('#txtimporteDet').val(getHTML(importe));
	$('#txtproyecto').val( proyecto);
	$('#txtpartida').val(clv_partid);
	$('#cboUnidad2').selectpicker('val',ID_DEPENDENCIA);
	
	
	__getPresupuesto($('#ID_PROYECTO').val(), $('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),  'txtpresupuesto','txtdisponible',$('#tipoGasto').selectpicker('val'));
}

function pintarTotalConceptos(tabla, importe_total, cont){
	var tabla = document.getElementById(tabla).tBodies[0];
 	var row =   document.createElement( "TR" );    
	row.height = 20;
	var htmlEdit = '<strong>'+formatNumber(importe_total, '$')+'</strong>';
	row.appendChild( Td('',derecha,'','<strong >Total Vale: </strong>',5));
	row.appendChild( Td('',derecha,"",htmlEdit));
	row.appendChild( Td('',centro,'',''));	
	tabla.appendChild(row);
}

function limpiarDetalles(){
	$('#txtproyecto').val('');
	$('#txtpartida').val('');
	$('#ID_PROYECTO').val('0');
	$('#ID_DETALLE').val('0');
	$('#txtdetalle').val('');
	$('#txtimporteDet').val('');
	$('#txtpresupuesto').val('');
	$('#txtdisponible').val('');
	
}

function eliminarDetalle(){
	 var chkdetalle = [];
     $('input[name=chkdetalle]:checked').each(function() { chkdetalle.push($(this).val());});	
	 if (chkdetalle.length>0){
		 swal({
			 title: "Es seguro?",
			    text: "Los cambios no podran revertirse!",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: '#3085d6',
			    cancelButtonColor: '#d33',
			    confirmButtonClass: 'btn btn-success',
			    cancelButtonClass: 'btn btn-danger',
			  	confirmButtonText: 'Si, aceptó!',
			  	cancelButtonText: 'No, canceló!',
			  	buttonsStyling: false,
			  	reverseButtons: true
			    
			}).then((result) => {
			  if (result.value) {
				  ShowDelay('Eliminando conceptos','');
				  controladorValesRemoto.eliminarDetalles(chkdetalle, $('#cve_val').attr('value'), {
						callback:function(items) {
							
						limpiarDetalles();
						mostrarDetalles();
						//window.parent.cambiarVariable(rellenaCeros(items.toString(),6));	
						FinDelay('Conceptos eliminados con éxito');	
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal("Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador");          
					}
				});
					//swal('Guardado!','Vale guardado satisfactoriamente.','success');
			  // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			  } else if (result.dismiss === 'cancel') {
				  swal('Cancelado','El proceso fue cancelado con exito!','error')
			  }
			})
	} 
	else 
	    swal('','Es necesario que seleccione por lo menos un concepto del listado', 'warning');
 }

function regresar(){
  document.location ="lista_vales.action";
}

function muestraPresupuesto(){
	if($('#txtproyecto').val()==''||$('#txtpartida').val()=='')
		$('#ID_PROYECTO').val('0');
		$('#txtpartida').val('0');
		
		
		var idUnidad = $('#cboUnidad2').selectpicker('val');
		
		if(idUnidad==null||idUnidad=="") idUnidad =0;
		
		alert('Valor de id_unidad es: ' +idUnidad);
		if($('#CVE_CONTRATO').val()!='0'&&$('#CVE_CONTRATO').val()!='')	{
			
			var tipo_gto = $('#tipoGasto').selectpicker('val');
			if(typeof(tipo_gto)=='undefined') tipo_gto =0;
			if($('#txtvale').val()=='') $('#CVE_VALE').val('');
			
			//if($('#CVE_CONTRATO').attr('value')==''||$('#CVE_CONTRATO').attr('value')=='0') {jAlert('Es necesario seleccionar un Vale para mostrar su informacion presupuestal', 'Advertencia'); return false;}
			
			__listadoPresupuestoContrato($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(),tipo_gto, 0, $('#CVE_CONTRATO').val());
		}
		else	
			__listadoPresupuesto($('#ID_PROYECTO').val(),$('#txtproyecto').val(),$('#txtpartida').val(), $('#cbomes').val(), $('#tipoGasto').selectpicker('val'), idUnidad);
}

function cerrarVale(){
/*jConfirm('¿Confirma que desea cerrar el Vale y enviarlo para su pago a Finanzas ?','Confirmar', function(r){
	if(r){*/
	  var checkVales = [];
     checkVales.push($('#cve_val').val());	 
	 if (checkVales.length > 0 ) {
		 swal({
			 title: "Es seguro?",
			    text: "¿Confirma que desea cerrar el Vale y enviarlo para su pago a Finanzas?",
			    type: "warning",
			    showCancelButton: true,
			    confirmButtonColor: '#3085d6',
			    cancelButtonColor: '#d33',
			    confirmButtonClass: 'btn btn-success',
			    cancelButtonClass: 'btn btn-danger',
			  	confirmButtonText: 'Si, cerrar!',
			  	cancelButtonText: 'No, cancelar!',
			  	buttonsStyling: false,
			  	reverseButtons: true
			    
			}).then((result) => {
			  if (result.value) {
				  ShowDelay('Cerrando Vale', '');
				  controladorListadoValesRemoto.cerrarVale(checkVales, {
				        callback:function(items) {
							jQuery.each(items,function(i){
								if(this.ESTADO=='SI'){
									FinDelay('Vale cerrado con éxito',2000, function(){limpiar();});	
									
									//CloseDelay('Vale cerrado con éxito', function(){limpiar();});
									getReporteVale($('#cve_val').val());
									limpiar();
								}
								else
									swal('','No se ha podido cerrar el Vale, es posible que no tenga suficiencia presupuestal en algunos de los conceptos agregados', 'error');
							});
				      },
				        errorHandler:function(errorString, exception) { 
						swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'warning');    
				        }
				       });
					//swal('Guardado!','Vale guardado satisfactoriamente.','success');
			  // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			  } else if (result.dismiss === 'cancel') {
				  swal('Cancelado','El proceso fue cancelado con exito!','error')
			  }
			})
		
	 } else 
	    swal("Es necesario que seleccione un elemento de la lista", "Advertencia");					
	 }
	
  //});

/*Carga el vale desde el listado para edicion del mismo*/
function cambioTipoVale(){
	
	
		
	if ($("#tipoVale").val()!=1 )  {
		$("#ejefechaCom").show();
		$("#ejefecha").show();
	}else {
		$("#ejefechaCom").hide();
	 	$("#ejefecha").hide();
		$('#fechaInicial').val('');
	 	$('#fechaFinal').val('');
	 	$('#fechaMaxima').val('');
	}	

	if ($("#tipoVale").val()!='GC' ) 
	  $('#tipoBeneficiario').val(2);
	 else
	  $('#tipoBeneficiario').val( 1);	 
	
	
	if ($("#tipoVale").val()=='FR')
		$('#tipoBeneficiario').val(1);
		
	//if ($("#tipoVale").val()!="" )
		
		//$('#tipoGasto').selectpicker('val',ID_RECURSO);
		//$('#cboBeneficiario').selectpickert('val',CLV_BENEFI);
		
}



function limpiar(){
		
	 	 $('#cve_val').val('');
	 	 $('#cbUnidad').selectpicker('val','');
		 $('#fecha').val('');
		 $('#tipoVale').val('');
		 $('#div_vale').html('');
		 //$('#importe').attr('value','');
		 $('#cboBeneficiario').selectpicker('val','');
		 $('#beneficiario').val('');
		 $('#justificacion').val('');
		 $('#txtproyecto').val('');
		 $('#txtpartida').val('');
		 $('#txtpresupuesto').val('');
		 $('#txtdisponible').val('');
		 $('#fechaInicial').val('');
		 $('#fechaFinal').val('');
		 $('#fechaMaxima').val('');
		 $('#documentacion').val('');
		 $('#tipoGasto').selectpicker('val','');
		 quitRow("listaDetalles");
		 limpiarDetalles();
}


function getReporteVale(clave) {
$('#cve_val').attr('value',clave);
$('#forma').attr('action',"../reportes/formato_vale.action");
$('#forma').attr('target',"impresion");
$('#forma').submit();
$('#forma').attr('target',"");
$('#forma').attr('action',"lista_vales.action");
}

function subirArchivo(){
	
	if($('#archivo').val()==''||$('#cve_val').val()==null|| $('#cve_val').val()==0)
		return false;
	_closeDelay();
	ShowDelay("Subiendo archivo al servidor");
	$('#frmDoc').submit();
	
}

function showRequest(formData, jqForm, options) { 
    return true; 
} 
 
function showResponse(data)  { 
 	if(data.mensaje){
		CloseDelay("Archivo guardado con éxito");
		mostrarDetallesArchivos();
		$('#archivo').val('');
	}
	else{
		_closeDelay();
		swal('',"No se ha podido cargar el archivo por algunas de las siguientes razones: <br>*Solo se permite un archivo por Vale<br>*El nombre del archivo es muy largo<br>*El nombre del archivo contiene caracteres no válidos<br>*Formato de archivo incorrecto, solo se aceptan *.PDF", 'error');
	}
} 

function mostrarDetallesArchivos(){
	var cve_vale = $('#cve_val').val();
	quitRow("listasArchivo");
	controladorValesRemoto.getArchivosVale(cve_vale, {
						callback:function(items) {
								jQuery.each(items,function(i){
									pintaTablaDetallesArchivos(this);
								});
					} 
					,
					errorHandler:function(errorString, exception) { 
						jError(errorString,"Error");          
					}
	});
}

function pintaTablaDetallesArchivos(m){
	 var htmlRemove = "<img src=\"../../imagenes/cross.png\" style='cursor: pointer;' alt=\"Eliminar\" width=\"16\" height=\"16\" border=\"0\" onClick=\"eliminarArchivo("+m.ID_ARCHIVO+")\" >";
	appendNewRow("listasArchivo", [Td('', izquierda , '', '<div style="height:20px">&nbsp;<a href="../'+m.RUTA+'['+m.ID_ARCHIVO+'] '+m.NOMBRE+'" target="_blank">['+m.ID_ARCHIVO+'] '+m.NOMBRE+'</a></div>'),
						 Td('', centro , '', parseInt(parseInt(m.TAMANO)/1024)+' kb'),
						 Td('', centro , '', m.EXT),
						 Td('', centro , '', htmlRemove)
				]);
}

function eliminarArchivo(idArchivo){
	jConfirm('¿Confirma que desea eliminar el archivo?','Eliminar', function(r){
		if(r){
				ShowDelay("Eliminando archivo");
				controladorValesRemoto.eliminarArchivoVale(idArchivo,{
						callback:function(map) {
							CloseDelay("Archivos eliminado con éxito");
							mostrarDetallesArchivos();
						},
						errorHandler:function(errorString, exception) { 
												jError(errorString, 'Error');          
						}
				});
		}
		});
}

function guardar(){		
	
		 //if($('#tipoGasto').selectpicker('val')==''){swal({title: 'Cerrado!',text: 'Tu requisición se cerro con éxito',type: 'success',timer: 4000,width: 400,})}/*{swal('','El tipo de gasto no es valido','warning'); return false;}*/
		 if ($('#fecha').val()==""){swal({title: '',text: 'La Fecha del Vale no es válida',type: 'warning',timer: 2000,width: 300,}); return false;}//{swal('','La Fecha del Vale no es válida','warning'); return false;}	
		 	
		 //if ($('#tipoGasto').attr('value')=="0")  {jAlert('El tipo de gasto no es válido','warning');return false;}	
		 
		 if ($('#cbomes').val()=="") {swal({title: '',text: 'El Periodo del Vale no es válido',type: 'warning',timer: 2000,width: 300,}); return false;}// {jAlert('','warning');return false;}
		 if ($('#tipoVale').val()=="") {swal({title: '',text: 'El Tipo del Vale no es válido',type: 'warning',timer: 2000,width: 300,}); return false;}//{jAlert('','warning');return false;}
		 if ($('#cboBeneficiario').selectpicker('val')=="") {swal({title: '',text: 'El Beneficiario del Vale no es válido',type: 'warning',timer: 2000,width: 300,}); return false;}//{jAlert('', 'warning');return false;}	
		 if ($('#justificacion').val()=="")  {swal({title: '',text: 'La Justificación del Vale no es válida',type: 'warning',timer: 2000,width: 300,}); return false;}//{jAlert('', 'warning');return false;}
		 if ($('#documentacion').val()=="")  {swal({title: '',text: 'La Documentacion comprobatoria no es válida',type: 'warning',timer: 2000,width: 300,}); return false;}//{jAlert('', 'warning'); return false;}
		 if ($('#fechaInicial').val()=="") {swal({title: '',text: 'La Fecha Incial no es válida',type: 'warning',timer: 2000,width: 300,}); return false;}// {jAlert('','warning');return false;}	
		 if ($('#fechaFinal').val()=="") {swal({title: '',text: 'La Fecha final no es válida',type: 'warning',timer: 2000,width: 300,}); return false;}// {jAlert('', 'warning');return false;}
		 if ((parseFloat($('#txtdisponible').val()) < parseFloat($('#importe').val()))&& $("#tipoVale").val()!='FR') {swal({title: '',text: 'El importe del Vale es mayor al presupuesto disponible',type: 'warning',timer: 2000,width: 300,}); return false;}// {jAlert('','warning');return false;}
		 
		 
		 swal({
			 title: "Es seguro?",
			    text: "Los cambios no podran revertirse!",
			    type: "warning",
			    showCancelButton: true,
			  	confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
			  	confirmButtonText: 'Si, guardar!',
			  	cancelButtonText: 'No, cancelar!',
			  	buttonsStyling: true,
			    
			}).then((result) => {
			  if (result.value) {
				  ShowDelay('Guardando vale','');
					controladorValesRemoto.guardarVale( 
							 $('#cve_val').val(), 
							 $('#tipoGasto').selectpicker('val'),	
							 $('#cbUnidad').val(),		 
							 $('#fecha').val(),
							 $('#tipoVale').val(),
							 $('#cboBeneficiario').selectpicker('val'),
							 $('#justificacion').val(),
							 $('#cbomes').val(),
							 $('#fechaInicial').val(),
							 $('#fechaFinal').val(),
							 $('#fechaMaxima').val(),
							 $('#documentacion').val(),
							 $('#CVE_CONTRATO').val(),
						 	{
						  callback:function(items) { 	    
							  $('#cve_val').val(items);
								
								$('#div_vale').html(rellenaCeros(items.toString(), 6));
								$('#cmdcerrar').prop('disabled','');		
								
								$('.nav-tabs a[href="#fragment-movimientos"]').tab('show');
								mostrarDetalles();
								subirArchivo();	 
								setTimeout(function() {
						            swal({title: "Felicidades!",text: "Vale guardado satisfactoriamente", type: "success",confirmButtonText: "Ok"}, 
						            		function(items) { if ($('#cve_val').val()==0) {
					 							getReporteVale($('#cve_val').val());
					 						} }, 1000)
						        });
								
						  },
						  errorHandler:function(errorString, exception) { 
								swal({text:'Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br><strong>Consulte a su administrador</strong>',timer:3000});   
								return false;
						  }
					});
			    
					//swal('Guardado!','Vale guardado satisfactoriamente.','success');
			  // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
			  } else if (result.dismiss === 'cancel') {
				  swal('Cancelado','El proceso fue cancelado con exito!','error')
			  }
			})
}