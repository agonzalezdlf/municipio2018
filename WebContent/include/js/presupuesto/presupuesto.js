/*Metodo para mostrar el presupuesto*/
function __getPresupuesto(idproyecto, proyecto, partida, mes,  ctrl_presupuesto, ctrl_disponible, tipoGasto){
	var cve_vale = $('#CVE_VALE').val();
	if(typeof(cve_vale)=='undefined') cve_vale = 0;
	if(typeof(proyecto)=='undefined') proyecto = 0;
	//alert("entra uno")$('#selector').val().length
	//alert(proyecto);
	if(proyecto!=''&&partida!=''&&proyecto.length<=4&&partida.length==5){
		
			__limpiarPresupuestoSaldo(ctrl_presupuesto, ctrl_disponible);
			/*Obtiene el presupuesto de manera normal*/
			
		
			if(cve_vale==0){
				controladorProyectoPartida.getPresupuesto(idproyecto, proyecto, partida, parseInt(mes),tipoGasto, 0, {
					callback:function(items){
						//alert("entra dos")
						if (items.length > 0)
							jQuery.each(items,function(i) {
									$('#'+ctrl_presupuesto).val(formatNumber(parseFloat(this.PREACTUAL),'$'));
									$('#'+ctrl_disponible).val(formatNumber(parseFloat(this.DISPONIBLE),'$'));							
							});
						else {
							$('#ID_PROYECTO').val('0');
							$('#txtproyecto').val('');
							$('#txtpartida').val('');
							$('#'+ctrl_presupuesto).val('');
							$('#'+ctrl_disponible).val('');
							swal('','El programa ó partida especificados no existe ó no tiene privilegios para visualizarlo','warning');	  
						}
							
					}
					,
				errorHandler:function(errorString, exception) { 
					__limpiarPresupuesto(ctrl_presupuesto, ctrl_disponible);
					swal('Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br>Consulte a su administrador');   
					return false;
				}
				});
			}
			/*Obtiene el presupuesto atravez del vale 03/04/2012*/
			if(cve_vale!=0){
				controladorProyectoPartida.getListaValesPresupuesto(cve_vale, idproyecto, partida, 0, mes, {
						callback:function(items){
						if (items.length > 0)
							jQuery.each(items,function(i) {
									$('#'+ctrl_presupuesto).val(formatNumber(parseFloat(this.TOTAL),'$'));
									$('#'+ctrl_disponible).val(formatNumber(parseFloat(this.DISPONIBLE),'$'));						
							});
						else {
							$('#ID_PROYECTO').val('0');
							$('#txtproyecto').val('');
							$('#txtpartida').val('');
							$('#'+ctrl_presupuesto).val('');
							$('#'+ctrl_disponible).val('');
							swal('',"El programa ó partida especificados no existe ó no tiene privilegios para visualizarlo - Vales", "warning");	  
						}
							
					}
					,
					errorHandler:function(errorString, exception) { 
						__limpiarPresupuesto(ctrl_presupuesto, ctrl_disponible);
						swal('','Fallo la operacion:<br>Error::'+errorString+'-message::'+exception.message+'-JavaClass::'+exception.javaClassName+'.<br>Consulte a su administrador','warning');   
						return false;
					}
				});
			}

	}
	else{
		$('#ID_PROYECTO').val('0');
		__limpiarPresupuesto(ctrl_presupuesto, ctrl_disponible);
	}
}

/*Metodo para limpiar los controles del presupuesto*/
function __limpiarPresupuesto(ctrl_presupuesto, ctrl_disponible){
	$('#txtpartida').val('');
	__limpiarPresupuestoSaldo(ctrl_presupuesto, ctrl_disponible);
}


function __limpiarPresupuestoSaldo(ctrl_presupuesto, ctrl_disponible){
	$('#'+ctrl_presupuesto).val('0.00');
	$('#'+ctrl_disponible).val('0.00');
}

/*Listado para el presupuesto del vale 05/03/2012*/
function __listadoPresupuestoVale(idproyecto, proyecto, partida, mes, tipoGasto, idDependencia, idVale){
	swal({
	    title: 'Informacion Presupuestal del Vale',
	    width: 800,
	    html:
	       	'<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'&idVale='+idVale+'"></iframe>', 
	   })
	//jWindow('<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'&idVale='+idVale+'"></iframe>','Informacion Presupuestal del Vale', '','Cerrar ',1);
}

/*Listado para el presupuesto del contrato 19/05/2013*/
function __listadoPresupuestoContrato(idproyecto, proyecto, partida, mes, tipoGasto, idDependencia, cve_contrato){
	swal({
	    title: 'Informacion Presupuestal del Contrato',
	    width: 800,
	    html:
	       	'<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'&cve_contrato='+cve_contrato+'"></iframe>', 
	   })
	//jWindow('<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'&cve_contrato='+cve_contrato+'"></iframe>','Informacion Presupuestal del Contrato', '','Cerrar ',1);
}

function __listadoPresupuesto(idproyecto, proyecto, partida, mes, tipoGasto, idDependencia ){
	//swal({
	   // title: 'Informacion Presupuestal',
	    //width: 800,
	    //html:
	      // 	'<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'"></iframe>', 
	   //})
	swal({
		  title: 'Informacion Presupuestal',
		  width: 800,
		  html: '<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'"></iframe>',
		})
	//jWindow('<iframe width="800" height="410" name="consultaPre" id="consultaPre" frameborder="0" src="../../sam/consultas/muestra_presupuesto.action?idproyecto='+idproyecto+'&proyecto='+proyecto+'&partida='+partida+'&mes='+mes+'&tipoGasto='+tipoGasto+'&unidad='+idDependencia+'"></iframe>','Informacion Presupuestal', '','Cerrar ',1);
}


/*Devuelve el presupuesto de la pantalla hija*/
/*  Carga el presupuesto en la Requisicion */
function __regresaPresupuesto(ID, proyecto, partida, pre_actual, disponible){
	
	$('#txtpresupuesto').val(formatNumber(pre_actual,'$')); 
	$('#txtdisponible').val(formatNumber(disponible,'$')); 
	$('#txtdisponible').data('disponible',disponible); 
	
	$('#txtproyecto').val(proyecto);
	$('#txtpartida').val(partida);
	$('#CLV_PARTID').val(partida);
	$('#ID_PROYECTO').val(ID);
	swal.close();
	//$(".swal2-container.swal2-fade.swal2-shown").remove();//Cierra la ventana modal.
	//$.alerts._hide();
	//costumFunction();
}
