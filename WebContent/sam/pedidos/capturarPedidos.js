var subtotal =0;

var total =0;
var indices = [];
$(document).ready(function() {
	
	$('.selectpicker').selectpicker();
	
	$('#txtfecha').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
	
	$('#checkall').on('click', function(){setCheckAll('chkconcepto');});
	$('#checkall').prop('checked',true);
	setCheckAll('chkconcepto');
	
	$("#checkall").on('click', function() {
		$('input:checkbox').not(this).prop('checked', this.checked);
	 });
	
	
	$('#cmdguardarPedido').on('click', function(){guardarPedido();});
	$('#cmdguardarPedido2').on('click', function(){guardarPedido();});
	$('#cmdborrarConceptos').on('click', function(){borrarLotes()});
	$('#cmdcerrar').on('click', function(){cerrarPedido();});
	$('#cmdenviarPedido').on('click', function(){enviarLotesPedido();});
	$('#cmdsincronizar').on('click', function(){_muestraImportarLotes();});
	
	
	 
	 //$("input:checkbox[name='one']")
	 if($('#CVE_PED').val()=='0'||$('#CVE_PED').val()=='') $('#cboiva').val(1);
	 $('#txtcontrato').focus();
	 
	 
	 /*
		
	 //Configura los tabuladores
	 $('#tabuladores').tabs();
	 $('#tabuladores').tabs('enable',0);
	 
	  $('#ui-datepicker-div').hide();
	 */
	 
	$('[data-unitprice=precio]').on('blur', function(){
		getTotales();
	});
	$('[data-unitprice=precio]').on('focus', function(){
		getTotales();
	});
	
	$('[data-unitprice=precio]').on('keypress', function(event){
		if(event.keyCode == 13)
		{
			getEnter($(this).data('idmovto'), event);
		}
		event.keyCode =0;
	});
	
	$('[data-chkconcepto="concepto"]').on('click', function(){
		habilitarConcepto($(this).is(':checked'), $(this).data('idmovto'));
	});
	
	$('#txtieps').on('blur', function(){
		getTotales();
	});
	
	$('#txtdescuento').on('blur', function(){
		getTotales();
	});
	
	$('#w-input-search').autocomplete({
		serviceUrl: '${pageContext.request.contextPatch}/getListaBeneficiarios',
		paramName: "NCOMERCIA",
		delimiter: ",",
		transformResult: function (response ){
				
			return {
				suggestions: $.map($.parseJSON(response), function(item){
					return {value:item.NCOMERCIA, data:item.CLV_BENEFI};
				})
			};
				
		}
	});
	
});

//**********************************************************************************************************************
//*********************  PROCESO PARA GUARDAR EL PEDIDO  ***************************************************************
/*funcion para guardar el pedido*/
function guardarPedido(){
	var error="";
	var checks = []; 
	
 	if ($('#CVE_REQ').val()=='') { 
 		   swal({title: 'Error!',text: 'No hay ninguna requisicion para el pedido actual',type: 'error',confirmButtonText: 'Cerrar'});return false;
 	}
		
 	if ($('#txtfecha').val()==''){ 
		   swal({title: 'Error!',text: 'Es necesario establecer la fecha del pedido',type: 'error',confirmButtonText: 'Cerrar'});return false;
		   }
	

 	if ($('#txtfechaentrega').val()=='') { 
		   swal({title: 'Error!',text: 'Es necesario establecer el tiempo de entrega',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
	
 	if ($('#xBeneficiario').selectpicker('val')=='') { 
 		 swal({title: 'Error!',text: 'Es necesario selecionar el beneficiario',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
	
 	if ($('#txtcondicionespago').val()=='') { 
 		swal({title: 'Error!',text: 'Es necesario escribir las condiciones de pago',type: 'error',confirmButtonText: 'Cerrar'});return false;
	}
 	
 	var checks = [];
	$('input[id=chkconcepto]:checked').each(function() 
		{ 
			checks.push($(this).val()); 
			if($('#txtpreciounit'+$(this).val()).val()==''||$('#txtpreciounit'+$(this).val()).val()=='0')
			{error="El precio de algún lote en el pedido no es válido, verifique y vuelva a intentar esta operación";}
			
	});	
 	
 	
 	
 	
	if(checks.length==0 ){
		swal({title: 'Error!',text: 'Es necesario seleccionar un lote de la requisición',type: 'error',confirmButtonText: 'Cerrar'});return false;
  	}
	 if (error!=""){
		 swal({title: 'Error!',text: error,type: 'error',confirmButtonText: 'Cerrar'});return false;
	 }
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea guardar la informacion del pedido?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			 
			   _guardarPedido();
		  // For more information about handling dismissals please visit
		  // https://sweetalert2.github.io/#handling-dismissals
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal(
		      'Cancelado',
		      'El pedido no se guardo',
		      'error'
		    )
		  }
		})
}


/*funcion que permite guardar fisicamente el pedido*/
function _guardarPedido(){
	
	var checks = [];
	var notas = [];
	var precio_unit = [];
	var cantidad = [];
	var num_ped = $('#cve_pedido_text').val();
	
	
	
	
	
	$('input[id=chkconcepto]:checked').each(function() { 
					
		checks.push($(this).val());
		notas.push($('#txtnota'+$(this).val()).val());
		precio_unit.push($('#txtpreciounit'+$(this).val()).val());
		cantidad.push($('#txtcantidad'+$(this).val()).val());
	});
		
	
	controladorPedidos.guardarPedido($('#CVE_PED').val(), $('#CVE_REQ').val(), $('#txtfecha').val(), $('#txtcontrato').val(), $('#txtfechaentrega').val(), $('#xBeneficiario').selectpicker('val'), $('#txtcondicionespago').val(), $('#txtlugarentrega').val(),$('#txtdescripcion').val(), checks, cantidad, notas, precio_unit, $('#txtiva').val(), $('#cboiva').val(), $('#txtdescuento').val(),{
			  callback:function(items){
				  		if(items.EVENT==true){
							$('#CVE_PED').val(items.CVE_PED);
						  	$('#cve_pedido_text').text(items.NUM_PED);
							var cve = items.CVE_PED;
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
									document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').val();  
								   
								  }
								})
							
						}
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal('','Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br><strong>Consulte a su administrador</strong>', 'error');   
			return false;
		}
	});	
}
//**********************************************************************************************************************
//********************* TERMINA PROCESO PARA GUARDAR EL PEDIDO  ***************************************************************
function getEnter(n, e){
	var j=0;
	if(e.keyCode == 13)	{
		for(j=0;j < indices.length; j++){
			
			if(n==indices[j]){
				$('#txtpreciounit'+(indices[j+1])).focus();
				$('#txtpreciounit'+(indices[j+1])).select();
				e.keyCode =0;
				return false;
			}
			e.keyCode =0;
		}
	}
}
//************************************************************************************************************************
//*****************   PROCESO PARA EL CIERRE DEL PEDIDO   ****************************************************************
/*Metodo para cerrar un pedido*/
function cerrarPedido(){
	var contador = 0;
	$('input[id=chkconcepto]:checked').each(function() 
		{ contador++;});	
	if(contador==0) {swal('','Para poder cerrar el pedido es necesario que exista por lo menos un lote', 'warning'); return false;}
	if(isNaN($('#txtiva').val())) {swal('','La cantidad especificada en el IVA no es válida', 'warning'); return false;} 
	
	swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea cerrar el pedido?',
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			  _cerrarPedido($('#CVE_PED').val(), $('#txtiva').val());
		  // For more information about handling dismissals please visit
		  // https://sweetalert2.github.io/#handling-dismissals
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal(
		      'Cancelado',
		      'El pedido no se guardo',
		      'error'
		    )
		  }
		})
		/*
	jConfirm('¿Confirma que desea cerrar el pedido?', 'Confirmar', function (r){
				if(r){
					_cerrarPedido($('#CVE_PED').val(), $('#txtiva').val());
				}
			});*/
}

/*Metodo interno para el cierra del pedido*/
function _cerrarPedido(cve_ped, iva){
	//ShowDelay('Cerrando pedido','');
	//swal({title:'Cerrando pedido',text:'demo',width:400,timer:1000});
	alert('Entro aqui _cerrarPedido');
	controladorPedidos.cerrarPedido(cve_ped, $('#TIPO_REQ').val(), iva,{
						callback:function(items){
							swal({
								  title: 'Cerrando',
								  //text: 'Pedido guardado con éxito!',
								  type: 'success',
								  timer: 4000,
								  onOpen: () => {
								    swal.showLoading()
								  }
								}).then((result) => {
								  if ( result.dismiss === swal.DismissReason.timer  ) {
									  swal("Pedido cerrado con éxito!");
									    $('#cmdcerrar').prop('disabled', true);
										$('#cmdguardarPedido').prop('disabled', true);
										getReportePedido($('#CVE_PED').val());
										document.location='lst_pedidos.action';  
								   
								  }
								})
						
						},
						errorHandler:function(errorString, exception) { 
							swal('',errorString, 'error');   
							return false;
						}
					});
}

//************************************************************************************************************************
//************************************************************************************************************************

/*Metodo para mostrar enviar lotes a otro pedido*/
function enviarLotesPedido(){
	var html = "";
	controladorPedidos.getComboPedidosRequisicion($('#CVE_REQ').val(),$('#CVE_PED').val(), {
		  callback:function(i){
				html = '<table width="350" border="0" cellspacing="0" cellpadding="0" align="center">' +
					   '<tr>' +
					   '<td height="27" align="center"><span class="TextoNegritaTahomaGris">Seleccione el n&uacute;mero de pedido:</span> '+ i+'</td>' +
					   '</tr>' +
					   '<tr>' +
					   '<td height="44" align="center">&nbsp;<input type="button" value="Exportar" id="cmdEnviarLotes" onClick="_enviarLotesPedido();" class="botones"/>&nbsp;' +
					   '<input type="button" value="Cancelar" id="cmdborrarConceptos" class="botones" onClick="$.alerts._hide();"/></td>' +
					   '</tr>'+
					   '</table>';	
				swal(html,'Exportar lotes a pedido', '','',0);
		  }
	});
}

/*Metodo para enviar los lotes seleccionados a otro pedido*/
function _enviarLotesPedido(){
	if($('#cbopedidos').attr('value')=='0') {swal('En número de pedido no es válido, seleccione un pedido');return false;}
	var id_ped_movto = [];
	var cve_ped_dest = $('#cbopedidos').attr('value');
	$('input[id=chkconcepto]:checked').each(function() { 
		id_ped_movto.push($(this).val());
	});
	$.alerts._hide();
	jConfirm('¿Confirma que desea exportar los lotes seleccionados al pedido <strong>'+cve_ped_dest+'</strong>?', 'Confirmar', function(r){
				if(r){
					ShowDelay('Exportando lotes','');
					controladorPedidos.moverLotes(id_ped_movto, $('#CVE_PED').attr('value'), cve_ped_dest, $('#txtdescuento').attr('value'), {
												  callback:function(i){
													  		CloseDelay('Lotes exportados con exito', 2000, function(){
																document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').attr('value');
															});
													  		
												  }
									});
				}
		});
}


//cargarLotes()
/*Metodo para sincronizar lotes al pedido*/
function enviarLotesdesderequi(){
	var html = "";
	controladorPedidos.getComboRequisicionaPedidos($('#CVE_REQ').val(),$('#CVE_PED').val(), {
		  callback:function(i){
				html = '<table width="350" border="0" cellspacing="0" cellpadding="0" align="center">' +
					   '<tr>' +
					   '<td height="27" align="center"><span class="TextoNegritaTahomaGris">Seleccione el n&uacute;mero de pedido:</span> '+ i+'</td>' +
					   '</tr>' +
					   '<tr>' +
					   '<td height="44" align="center">&nbsp;<input type="button" value="Exportar" id="cmdEnviarLotes" onClick="_muestraImportarLotes();" class="botones"/>&nbsp;' +
					   '<input type="button" value="Cancelar" id="cmdborrarConceptos" class="botones" onClick="$.alerts._hide();"/></td>' +
					   '</tr>'+
					   '</table>';	
				swal(html,'Exportar lotes a pedido', '','',0);
		  }
	});
}

/*Metodo para sincronizar los lotes seleccionados de la requisicion al pedido cuando son eliminados*/
function enviaLotesalPedido(){
	
	var cve_requisicion = $('#CVE_REQ').val();
	alert('Clave de requesiscion: ' +cve_requisicion);
	var id_ped_movto = [];
	var cve_ped_dest = $('#cbopedidos').attr('value');
	$('input[id=chkconcepto]:checked').each(function() { 
		id_ped_movto.push($(this).val());
	});
	$('input[id=chkreqmovto]:checked').each(function() { 
		ID_REQ_MOVTO.push($(this).val());
	});
	$.alerts._hide();
	jConfirm('¿Confirma que desea exportar los lotes seleccionados al pedido <strong>'+cve_ped_dest+'</strong>?', 'Confirmar', function(r){
				if(r){
					ShowDelay('Exportando lotes','');
					controladorPedidos.moverLotes_reqaped(ID_REQ_MOVTO, $('#CVE_PED').val(), cve_requisicion, $('#txtdescuento').val(), {
												  callback:function(i){
													  		CloseDelay('Lotes exportados con exito', 2000, function(){
																document.location='capturarPedidos.action?cve_ped='+$('#CVE_PED').attr('value');
															});
													  		
												  }
									});
				}
		});
}

function _muestraImportarLotes(){
	var cve_requisicion = $('#CVE_REQ').val();
	
	swal({
		  title: '',
		  text: 'Importar lotes desde una Requisición existente',
		  html:
			  '<iframe width="850" height="400" id="ventanaImportar" frameborder="0" src="../../sam/pedidos/muestraImportarp.action?cve_req='+cve_requisicion+'"></iframe>',//cve_req="'+'cve_requisicion+idVale='+$('#CVE_VALE').val()
		  width: 800,
		  confirmButtonText: 'Cerrar',
		  padding: 10,
		  animation: false
		})
}

/*----------------------- Carga los lotes seleccionados a otra requisicion ----------------------------------------------------*/
//----------------------  Viene de la pagina muestraImportarp del frame cargarLotes () -------------------------------------
function CargarLotesNuevos(lotes){
	
	cve_ped = $('#CVE_PED').val();
	cve_req = $('#CVE_REQ').val();
	iva = $('#txtiva').val();
	
	alert('El iva es: ' +iva);
	//swal('Agregando nuevos lotes');
	
	controladorPedidos.sincronizaPedidos(lotes, cve_req, cve_ped,iva, {
				callback:function(items) {
					if(items) {
											
						swal('Lotes importados con éxito');	
					}
					else
						swal('','La operacion ha fallado al importar lotes','error');
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
			}
	});
}


/*Metodo para mostrar el reporte PDF del pedido*/
function getReportePedido(clavePed) {
	$('#clavePedido').val(clavePed);
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
	$('#forma').attr('target',"");
}



/*funcion para habilitar los elementos del concepto*/

function habilitarConcepto(checked, id, bol){
	var valor =0;
	$('#cmdenviarPedido').prop('disabled', !checked);
	$('#txtenviarpedido').prop('disabled', !checked);
	$('#cmdguardarPedido').prop('disabled', false);
	$('#txtcantidad'+id).prop('disabled', !checked);
	$('#txtnota'+id).prop('disabled', !checked);
	$('#txtpreciounit'+id).prop('disabled', !checked);
	
	$("INPUT[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						valor++;
					}
				}
			});
	
	if(valor>=1) {
		$('#cmdenviarPedido').prop('disabled', false);
		$('#txtenviarpedido').prop('disabled', false);
	}
	else
	{
		$('#cmdenviarPedido').prop('disabled', true);
		$('#txtenviarpedido').prop('disabled', true);
	}
	
	calculatTotal(id, $('#txtcantidad'+id).attr('value'), $('#txtpreciounit'+id).prop('value'), checked); 
	
	if(!bol) getTotales();
}

/*Funcion para eleccionar todos los check del listado*/
function setCheckAll(check){	
	
	
	$("input[name='"+check+"'][type='checkbox']").prop('checked', $('#checkall').is(':checked'));
	$("input[id='"+check+"'][type='checkbox']").each(function(){ if($(this).val()!=0){															 
					habilitarConcepto($('#checkall').prop('checked'), $(this).val(), true);
				}
			});
		
	if(!$('#checkall').prop('checked')) {subtotal =0; $('#cmdguardarPedido').prop('disabled', true);}
	getTotales();
}


/*funcion para calcular el total del concepto*/
function calculatTotal(id, cantidad, precio, check){
	if(check) {
		$('#divcosto'+id).text('$'+formatNumber(cantidad*precio)+' ');
	}
	else{
		$('#divcosto'+id).text('$ 0.00 ');
	}
}

/*funcion para calucar subtotales y totales*/
function getTotales(){
	ieps =0;
	subtotal =0;
	subtotalsieps=0;
	total = 0;
	var valor = 0;
	var i =0;
	var tablita = "";
	$("input[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						
						subtotalsieps =  subtotalsieps + ($('#txtcantidad'+$(this).val()).val()*$('#txtpreciounit'+$(this).val()).val());
						$('#divcosto'+$(this).val()).text('$'+formatNumber($('#txtcantidad'+$(this).val()).val()*$('#txtpreciounit'+$(this).val()).val()));
						if(isNaN($('#txtpreciounit'+$(this).val()).val())) valor++;
					}
				}
			});
	/*Comprueba valores numericos*/
	$("input[id='chkconcepto'][type='checkbox']").each(function(){ if($(this).val()!=0){ 														   
					if($(this).prop('checked')){
						if(isNaN($('#txtpreciounit'+$(this).val()).val())) {
							tablita = tablita +   '<tr>'+
													'<td align="center">'+$('#Lote'+$(this).val()).val()+'</td>'+
													'<td align="right">'+$('#txtpreciounit'+$(this).val()).val()+'&nbsp;</td>'+
												  '</tr>';
							i++;
							$('#txtpreciounit'+$(this).val()).prop('val','');				
						}
						if(valor==i&&valor!=0) 
							jAlert("Hay valores numericos no válidos en precios unitarios, quite los separadores de Miles(<strong>,</strong>) o simbolos especiales(¿?-/*@#$%&_;:<>{}...) .Los lotes afectados son los siguientes:<br><br><table align='center' height='22' class='listas' width='243' border='0' cellspacing='0' cellpadding='0'><tr><th width='89' align='center'>Lote</td><th width='154' align='right'>Precio Unitario&nbsp;</td>  </tr>"+tablita+"</table>","Advertencia");	
						
					}
				}
			});
	
	
	var ieps = $('#txtieps').val();
	
	if(isNaN($('#txtieps').val())){jAlert('El valor númerico del <strong>IEPS</strong> no es valido, vuelva a escribirlo', 'Advertencia'); return false;}
	if($('#txtieps').val()=='') $('#txtieps').prop('value', '0');
	
	subtotal = subtotalsieps +Number($('#txtieps').val());
	
	
	$('#divsubtotal').text('$'+formatNumber(subtotal+Number(ieps)));
	
	
	
	
	if(isNaN($('#txtdescuento').val())){jAlert('El valor númerico del <strong>descuento</strong> no es valido, vuelva a escribirlo', 'Advertencia'); return false;}
	
	var descuento = $('#txtdescuento').val();
	
	/*Aplicacion del Iva si lo requiere*/
	var iva = 0.0;
	if($('#cboiva').val()==0) $('#txtiva').prop('value', '0');
	if($('#cboiva').val()==1) {
		
			iva = redondeo(subtotal*0.16);
			$('#txtiva').prop('value', iva);
		
	}
	if($('#cboiva').val()==2){
		iva = ($('#txtiva').val()*1);
		$('#txtiva').prop('value', iva);
	}
		
	
	
	/*Aplicar descuento si es requerido*/
	if($('#txtdescuento').val()=='') $('#txtdescuento').prop('value', '0');
	if($('#txtdescuento').val()!=''){
		if((subtotal - descuento) < 0 ) {jAlert('El monto del descuento no puede ser mayor al subtotal, vuelva a escribirlo','Advertencia'); $('#txtdescuento').prop('value', ''); $('#txtdescuento').focus(); return false;}
		subtotal = subtotal - descuento ;
		total = subtotal + iva;
	}
	else 
		total = (subtotal)  + iva ;
		
	$('#divtotal').text('$'+formatNumber(redondeo(total)));
	/*
	var n = 1.7777;    
	n.round(2); // 1.78
	*/
}

function getTotalesMasIva(){
	var iva_temp = 0.00;
	if($('#cboiva').val()==1||$('#cboiva').val()==2) {
		//if($('#txtiva').attr('value')=='0'||$('#txtiva').attr('value')=='') 
			iva_temp = (1* $('#txtiva').val());
		//else 
		//	iva_temp = ($('#txtiva').attr('value')*1)+subtotal;
	}
	total = subtotal + iva_temp;
	$('#divtotal').text('$'+formatNumber(redondeo(total)));
}

/*funcion para obtener un arreglo de los ids seleccionados*/
function getCheckValues(check){
	var values = Array();
	$("INPUT[id='"+check+"']:checked").each(function(){ if($(this).val()!=0) values.push($(this).val());});
	return values.join(",");
}

/******************************   FUNCIONES ADICIONALES DE LOS PEDIDOS   ****************************************************/
/****************************************************************************************************************************/
/*funcion para borrar los conceptos seleccionados*/
function borrarLotes(){
	var checkConceptos = [];
     $('input[name=chkconcepto]:checked').each(function() {checkConceptos.push($(this).val());});	
  	 var cve_ped = $('#CVE_PED').val();
	 var cve_req = $('#CVE_REQ').val();
	 if (checkConceptos.length>0){
		 swal({
			  title: 'Es seguro?',
			  text: '¿Confirma que desea cerrar el pedido?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonText: 'Sí, gaurdar!',
			  cancelButtonText: 'No, abortar!',
			  timer: 4000,
			  showLoaderOnConfirm: true,
			  preConfirm: function(email) {
				    return new Promise(function(resolve, reject) {
				      setTimeout(function() {
				        if (email === 'taken@example.com') {
				          reject('This email is already taken.');
				        } else {
				          resolve();
				          controladorPedidos.eliminarLotesPedido(checkConceptos, cve_ped, $('#txtdescuento').val(), {
								callback:function(items) {
									
									setTimeout(function(){
									    swal("Lotes eliminados con éxito!");
									    mostrarTablaLotes($('#CVE_PED').val());
									  }, 2000);
								} 					   				
								,
								errorHandler:function(errorString, exception) { 
									swal('',"Fallo la operacion:<br>Error::"+errorString+"-message::"+exception.message+"-JavaClass::"+exception.javaClassName+".<br>Consulte a su administrador",'error');          
								}
							});  
				        }
				      }, 2000);
				    });
				  },
				  allowOutsideClick: false
				
			}).then((result) => {
				  
			  if (result.value  ) {
				
							
			  
			  } else if (result.dismiss === swal.DismissReason.cancel) {
				  		swal('Cancelado','Proceso cancelado','error')
			  }
			});
		 
				
	 }else 
	    swal('','Es necesario que seleccione por lo menos un lote del listado', 'warning');
		
}

/****************************************************************************************************************************/
/****************************************************************************************************************************/
/*funcion para mostrar el listado de conceptos*/
function mostrarTablaLotes(cve_ped){
	var cont =0;
	var total = 0;
	quitRow("listasConceptos");
	controladorPedidos.getConceptos(cve_ped, {
						   callback:function(items) { 
						   		jQuery.each(items,function(i){
									 cont++;
									 pintaTablaLotes('listasConceptos', this);				   
									 if(items.length==cont) pintarTotalConceptos('listasConceptos', cve_ped);
								});
						   }
	});
	
}

/*funcion para pintar las filas de los subtotales*/
function pintarTotalConceptos(table, cve_ped){
	/*Primera fila*/
	//appendNewRow(table, [Td('', izquierda, '', '<input type="button" value="Borrar lotes" id="cmdborrarConceptos" class="botones" onClick="borrarLotes()" />&nbsp;<input type="button" value="Enviar lotes a otro pedido" id="cmdenviarPedido" class="botones" onClick="enviarLotesPedido()" disabled/>', 6),
	//					 ]);
}

/*Funcion para pintar las filas de los conceptos*/
function pintaTablaLotes(table, obj){
	/*Filas de los conceptos*/
	appendNewRow(table, [Td('', centro , '', '<input type="checkbox" onClick="habilitarConcepto(this.checked, '+obj.ID_PED_MOVTO+')" name="chkconcepto" id="chkconcepto" value="'+obj.ID_PED_MOVTO+'">'),
						 Td('', centro , '', '<input type="hidden" value="'+obj.PED_CONS+'" id="Lote'+obj.PED_CONS+'">'+obj.PED_CONS),
				 		 Td('', centro , '', '<input type="text" class="input" style="width:100%;text-align:center" onBlur="getTotales()" disabled value="'+obj.CANTIDAD+'" id="txtcantidad'+obj.ID_PED_MOVTO+'">'),
						 Td(obj.UNIDMEDIDA, centro , '', ''),
						 Td('', centro , '', '<textarea rows="3" class="textarea" maxlength="300" style="width:99%" disabled id="txtnota'+obj.ID_PED_MOVTO+'">'+obj.DESCRIP+'</textarea>'),
						 Td('$ '+obj.PRECIO_EST, derecha, '', ''),
						 Td('', centro , '', '<input type="text" onBlur="getTotales()" class="input" style="width:95%; text-align:right; padding-right:5px" disabled value="'+formatNumber(obj.PRECIO_ULT, '')+'" data-txtpreciounit="'+obj.ID_PED_MOVTO+'" id="txtpreciounit'+obj.ID_PED_MOVTO+'">'),
						 Td('', derecha, '', '<div align="right" id="divcosto'+obj.ID_PED_MOVTO+'">'+formatNumber((obj.CANTIDAD*obj.PRECIO_ULT), '$')+'</div>')]);
}

