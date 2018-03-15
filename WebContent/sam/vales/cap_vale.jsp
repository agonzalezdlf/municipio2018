<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html >
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Vales - Captura de Vales</title>

<script type="text/javascript" src="../../include/js/jquery-2.1.3.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>


<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>


<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>

<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>


<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorProyectoPartida.js"> </script>
<script type="text/javascript" src="../../dwr/interface/controladorListadoValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"> </script>  
<script type="text/javascript" src="../../dwr/util.js"> </script>  

<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<script type="text/javascript" src="../../include/js/jquery-impromptu.2.3.js"></script>
<script type="text/javascript" src="../../include/js/componentes/componentes.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>


<script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="cap_vale.js?x=<%=System.currentTimeMillis()%>"></script>






</head>
<body  >
<table width="100%" align="center"><tr><td><h1>Vales - Captura de Vales</h1></td></tr></table>
<form name="forma" id="forma" method="post" enctype="multipart/form-data">
<input type="hidden" name="cve_val"  id="cve_val"value='<c:out value="${vale.CVE_VALE}"/>'/>
<input type="hidden" name="claveBeneficiario" id="claveBeneficiario" value='<c:out value="${vale.CLV_BENEFI}"/>'/>
<input type="hidden" name="tipoBeneficiario" id="tipoBeneficiario" />


<div class="col-sm-12">
	<div class="panel with-nav-tabs panel-primary">
		<div class="panel-heading">
	 		<ul class="nav nav-tabs responsive">
	 			<li class="active" id="maestro"><a href="#fragment-pedidos" data-toggle="tab">Información general</a></li>
                <li id="detalle"><a href="#fragment-movimientos" data-toggle="tab" id="lotes">Movimientos</a></li>
         	</ul>
		</div><!--close panel con navtabas-->
		<div class="panel-body">
		 	<div class="tab-content">
		 		<!--fragment-requisicion-->
		 	 	<div class="tab-pane fade in active" id="fragment-pedidos">
		 	 			<form class="form-horizontal">
		 	 					
				 	 		 	
				 	 		 	<!--Perdiodo de ejecución -->
			                  <div class="row">
			                    <div class="form-group">
			                    	<div class="control-label col-sm-3">Vale:</div>
			                    	<div class="col-md-5">	
			                    		<div style="text-align:left;font-size: 20px;" id="div_vale"><c:out value="${vale.NUM_VALE}"/></div>
			                    	</div>
			                     	
			                    </div>
			                  </div>  
			                  <br/>
			           		   <!--Unidad administrativa-->
			           		   <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3">Unidad administrativa:</div>
				                     <div class="col-md-5">	
										    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
								      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
								      		</sec:authorize>
								       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
								       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
								            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
								              			<option value="<c:out value="${item.ID}"/>" 
								              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
								             			<c:out value="${item.DEPENDENCIA}"/></option>
								           			</c:forEach>
								          		</select>
								        	</sec:authorize>
								       </div>
			                      </div>
			                    </div><!--Cierra Unidad administrativa-->
			                    <div class="row">&nbsp;</div>
			                  <!-- Tipo de Gasto-->
			                    <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3">*Tipo de Gasto:</div>
			                        <div class="col-sm-5">
			                            <select name="tipoGasto" class="selectpicker form-control input-sm m-b" data-live-search="true" id="tipoGasto" title="Tipo de gasto" style="width:100%">
			                                <c:forEach items="${tipodeGasto}" var="item" varStatus="status">                  
			                                  <option value='<c:out value="${item.ID}"/>'
			                                  	<c:if test="${item.ID==tipoGasto}">selected</c:if>><c:out value='${item.RECURSO}'/>
			                                  </option>
			                                </c:forEach>
			                            </select>
			                        </div>
			                      </div>
			                    </div>
			                    <div class="row">&nbsp;</div>
			                    <!--Fecha y Periodo -->
				                  <div class="row" style="border-bottom:15px !important;">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">Fecha:</div>
				                         <div class="col-sm-2">
												<input name="fecha" placeholder="Fecha" type="text" class="form-control sm" id="fecha" style="text-align:center; margin-bottom: 8px;"  value='<c:out value="${vale.FECHA}"/>'  maxlength="15" />
											</div>
											<label class="control-label col-sm-1" for="txtproyecto">Periodo:</label>
											<div class="col-sm-2">
												<select name="cbomes" class="selectpicker form-control input-sm m-b" title="Periodo" style="width:103px" id="cbomes" >
										            <c:forEach items="${meses}" var="item" varStatus="status">
										              <option value='<c:out value="${item.mes}"/>'
										                <c:if test="${item.MES==vale.MES}"> selected </c:if>>
										               <c:out value="${item.DESCRIPCION}"/>
										                </option>
										              </c:forEach>
										         </select>
											</div>
				                     </div>
				                  </div> 
				                  <!--Tipo de vale y Contrato -->
				                  <div class="row">
				                    <div class="form-group">
				                    	<div class="control-label col-sm-3 ">Tipo de vale:</div>
				                        	<div class="col-sm-2">
												<select name="tipoVale" class="selectpicker form-control input-sm m-b" id="tipoVale" title="Tipo de vale" style="width:160px">
									            	<c:forEach items="${tiposVales}" var="item" varStatus="status">
										            	<option value="<c:out value='${item.clave_vale}'/>" <c:if test="${item.CLAVE_VALE==vale.TIPO}"> selected </c:if>>
										            	<c:out value="${item.TIPO_VALE}"/>
										            </c:forEach>
									        	 </select>
											</div>
											<label class="control-label col-sm-1" for="txtproyecto">Contrato:</label>
											<div class="col-sm-2">
												<div class="input-group">
													<input type="text" class="form-control" placeholder="Número de contrato" name="txtnumcontrato" id="txtnumcontrato" >
														<div class="input-group-btn">
														<!-- <img src="../../imagenes/search_16.png" alt="Mostrar presupuesto" name="img_contrato"  id="img_contrato" style="cursor:pointer" align="absmiddle"/> <img src="../../imagenes/cross.png" id="img_quitar_contrato" width="16" height="16" alt="Quitar contrato" title="Quitar contrato" align="absmiddle" style="cursor:pointer" /> -->
															<button class="btn btn-info" id="muestra_contratos" name="muestra_contratos"><i class="glyphicon glyphicon-search"></i></button>
															<input name="CVE_CONTRATO" type="hidden"  id="CVE_CONTRATO" value="${vale.CVE_CONTRATO}" />
														</div>
												</div>
							                </div>
				                     </div>
				                  </div> 
								 <div class="row">&nbsp;</div>
			                   	<!--Beneficiario -->
			                  <div class="row">
			                    <div class="form-group">
			                     	<div class="control-label col-sm-3 ">Prestador del servicio:</div>
			                        <div class="form-group col-sm-5">
			                        	<select class="selectpicker form-control input-sm" data-live-search="true" style="width:100%" id="cboBeneficiario" name="cboBeneficiario" title="Seleccione un Beneficiario...">
										   	<c:forEach items="${beneficiarios}" var="item" varStatus="status">
									      	<option value='<c:out value="${item.CLV_BENEFI}"/>'
									   	 	<c:if test='${item.CLV_BENEFI==cboBeneficiario}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
									      	</option>
											</c:forEach>    
										</select>
										<input type="hidden" id="CVE_BENEFI" value="0" />
									</div>	  
								</div>
			                  </div>   
			                  <!--Justificacion -->
			                  <div class="row">
			                    <div class="form-group">
			                     	<div class="control-label col-sm-3 ">*Justificaci&oacute;n:</div>
			                        <div class="form-group col-sm-5">
			                        	<input name="justificacion" type="text" class="form-control sm" id="justificacion"  value='<c:out value="${vale.JUSTIF}"/>' maxlength="400" onBlur="upperCase(this)">
									</div>	  
								</div>
			                  </div>   
			                  <!--Documentación -->
			                  <div class="row">
			                    <div class="form-group">
			                     	<div class="control-label col-sm-3 ">*Documentación:</div>
			                        <div class="form-group col-sm-5">
			                        	<textarea id="documentacion" name="documentacion" rows="4" class="form-control sm" wrap="virtual" onBlur="upperCase(this)" maxlength="800"><c:out value="${vale.DOCTO_COMP}"/></textarea>
									</div>	  
								</div>
			                  </div>   
			                  <!--Perdiodo de ejecución -->
			                  <div class="row">
			                    <div class="form-group">
			                     	<div class="control-label col-sm-3 ">Periodo de ejecución:</div>
			                    </div>
			                  </div>  
			                  <br/>
			  				   <!--Fecha inicial, final y maxima-->
			                  <div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">Inicial</div>
			                        <div class="col-sm-2">
			                           	<input type="text" placeholder="Inicial" id="fechaInicial" name="fechaInicial"  maxlength="15" value='<c:out value="${vale.FECHA_INI}"/>' class="form-control sm" style="text-align:center; width:130px;margin-bottom: 8px;"/>
			                           </div>
										<!-- <label class="control-label col-sm-1" for="txtproyecto">Marca::</label> -->
										<div class="col-sm-2">
											<input type="text" placeholder="Final" id="fechaFinal" name="fechaFinal" class="form-control sm" maxlength="15" value='<c:out value="${vale.FECHA_FIN}"/>' style="text-align:center; width:130px" />
										</div>
										<!-- <label class="control-label col-sm-1" for="cbomeses">Modelo:</label> -->
										<div class="col-sm-2">
											<input type="text" placeholder="Fecha máxima" id="fechaMaxima" name="fechaMaxima" maxlength="20" class="form-control sm" value='<c:out value="${vale.FECHA_MAX}"/>' style="text-align:center; width:130px" />
										</div>
			                     </div>
			                  </div> 
			                  <!--Perdiodo de ejecución -->
			                  <div class="row">
			                    <div class="form-group">
			                     	<div class="control-label col-sm-3 ">Archivo:</div>
			                     	<div class="col-sm-2">
			                     		<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" />
			                     	</div>
			                    </div>
			                  </div>
			                   <div class="col-sm-6 col-sm-offset-3">
			                    	<table width="100%" border="0"  align="center" cellpadding="0" cellspacing="0" class="table">
							    <tr >
							      <th height="30"  >&nbsp;</th>
							      <td colspan="5" height="30">
							        
							        <table width="80%" border="0"  align="left" cellpadding="0" cellspacing="0" class="table table-hover" id="listasArchivo">
							          <thead>
							            <tr >
							              <th width="59%" height="20"  align="center">Archivo</th>
							              <th width="16%"  align="center">Tamaño</th>
							              <th width="14%"  align="center">Tipo</th>
							              <th width="6%"  align="center">&nbsp;</th>
							              </tr>
							            </thead>
							          <tbody>
							            </tbody>
							          </table>
							        
							        </td>
							    </tr>
							   
							    
							    <tr >
							      <td height="13" colspan="6" align="center">
							        <c:if test="${regresar=='SI'}"></c:if>      </td>
							    </tr>
							  </table>
			                    </div>  	
			  				  <!--Botones-->
			             	  <div class="row">&nbsp;</div>
			                  <div class="row">
			                    <div class="form-group">
			                        <div class="control-label col-sm-3 ">&nbsp;</div>
			                      		<div class="col-sm-2">
			                      		<input name="cmdcerrar" id="cmdcerrar"  disabled="disabled" type="button" class="btn btn-cerrar" value="Cerrar">
										<input name="cmdnuevo" id="cmdnuevo" type="button" value="Nuevo"  class="btn btn-primary">
										<input name="xGrabar" id="xGrabar" type="button" class="btn btn-success" value="Guardar">
									</div>
								</div>
			                  </div>  
			                  
			        </form><!--form-horizontal-->
		 	 	</div>
				<!--fragment-conceptos-->
				<div class="tab-pane fade" id="fragment-movimientos">
					
					<form class="form-horizontal" id="frmDoc" name="frmDoc" method="post" enctype="multipart/form-data">
	 	 			<!--Unidad administrativa Presupuesto de la Unidad-->
			           		   <div class="row">
			                      <div class="form-group">
			                        <div class="control-label col-sm-3">Presupuesto de la Unidad</div>
				                     <div class="col-md-5">	
										    <select name="cboUnidad2" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cboUnidad2" title="Seleccione la unidad administrativa">
								            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
								              			<option value="<c:out value="${item.ID}"/>" 
								              			<c:if test="${item.ID==cboUnidad2}"> selected </c:if> >
								             			<c:out value="${item.DEPENDENCIA}"/></option>
								           			</c:forEach>
								          	</select>
								      </div>
			                      </div>
			                    </div><!--Cierra Unidad administrativa-->
					
				             <!--Programa, Partida-->
				                  <div class="row" style="border-bottom:15px !important;">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">*Programa:</div>
				                         	<div class="col-sm-2">
												<input placeholder="Proyecto" type="text" class="form-control sm" name="txtproyecto" id="txtproyecto" maxlength="4" style="margin-bottom: 8px;"/>
												<input type="hidden" id="ID_PROYECTO" value="0"/>
											</div>
											<label class="control-label col-sm-1" for="txtproyecto">*Partida:</label>
											<div class="col-sm-2">
												<div class="input-group">
												<div class="input-group-btn">
												<input placeholder="Partida" type="text" id="txtpartida" name="txtpartida" class="form-control sm" maxlength="5"  onKeyPress=" return keyNumbero( event );"/>
												<button type="button" class="btn btn-info" id="cmdpresupuesto" name="cmdpresupuesto">
				      								<span class="glyphicon glyphicon-search"></span>
				      								<!-- <img src="../../imagenes/search_16.png" alt="Mostrar presupuesto" name="img_presupuesto" onclick="muestraPresupuesto()"  id="img_presupuesto" style="cursor:pointer" align="absmiddle"/> -->
				    							</button>
				    							</div>
											</div>
											</div>
									</div>
				                  </div> 
				            <!--Presupuesto, Disponible-->
				                  <div class="row">
				                    <div class="form-group">
				                        <div class="control-label col-sm-3 ">Presupuesto:</div>
				                      		<div class="col-sm-2">
												<input type="text" placeholder="Presupuesto" name="txtpresupuesto" id="txtpresupuesto" class="form-control sm" disabled="disabled" style="margin-bottom: 8px;" />
											</div>
											<label class="control-label col-sm-1" for="txtfecha">*Disponible:</label>
											<div class="col-sm-2">
												<input type="text" placeholder="Disponible" id="txtdisponible" data-disponible="" name="txtdisponible" class="form-control sm" disabled="disabled" />
											</div>
				                    </div>
				                  </div>
				                  <!--Observaciones -->
				                  <div class="row">
				                    <div class="form-group">
				                     	<div class="control-label col-sm-3 ">Observaciones:</div>
				                        <div class="col-sm-5">
				                        	<textarea  name="txtdetalle"  id="txtdetalle"  cols="80" rows="4" wrap="virtual" class="form-control sm" maxlength="500"></textarea>
				                        </div>	  
									</div>
				                  </div>   
				           		  <!--Documentación -->
				                  <div class="row">
				                    <div class="form-group">
				                     	<div class="control-label col-sm-3 ">Importe:</div>
				                        <div class="col-sm-5">
				                        	<input type="hidden" id="ID_DETALLE" value="0"/>
                    						<input type="hidden" id="IMPORTE_TOTAL" value="0"/>
				                        	<input  name="txtimporteDet"  id="txtimporteDet" class="form-control sm" onkeypress="return keyNumbero(event);"/>
				                        </div>	  
									</div>
				                  </div>   
				           		  <!--Documentación -->
				                  <div class="row">
				                    <div class="form-group">
				                     	<div class="control-label col-sm-3 "></div>
				                     		<div class="col-sm-2">
			                      				<input name="cmdagregar" id="cmdagregar" type="button" class="btn btn-success" value="Agregar" style="width:80px"/>
                    							<input name="cmdnuevoconcepto" id="cmdnuevoconcepto" onClick="limpiar()" style="width:80px" type="button" class="btn btn-primary" value="Nuevo"/>
											</div>  	
				           				</div>
									</div>			           	
				           			<div class="row">
				           				<div class="form-group">
				           					<div class="col-sm-5 col-sm-offset-3">
				           						<table class="table table-hover" id="listaDetalles">
									                  <thead>
									                    <tr >
									                      <th width="4%" height="20"  align="center"><img src="../../imagenes/cross.png" name="imgborradetalle" id="imgborradetalle" width="16" height="16" style='cursor: pointer;' /></th>
									                      <th width="28%"  align="center">Unidad Administrativa</th>
									                      <th width="31%"  align="center">Notas</th>
									                      <th width="12%"  align="center">Programa</th>
									                      <th width="10%" align="center">Partida</th>
									                      <th width="12%"  align="center">Importe</th>
									                      <th width="3%"  align="center">&nbsp;</th>
									                    </tr>
									                  </thead>
									                  <tbody>
									                  </tbody>
									                </table>
				           					</div>
				           				</div>
				           			</div>
				</form><!--form tab2primary-->
			 	</div><!--fragment-conceptos-->
			 </div><!--tab-content-->
		</div><!--panel-body-->
	</div><!--Cierra Panel with-nav-->
</div><!--col-12-->








</form>
</body>
</html>
