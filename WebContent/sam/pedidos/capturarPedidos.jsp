<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html><head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
	<script type="text/javascript" src="../../dwr/interface/controladorPedidos.js"> </script>
	<script type="text/javascript" src="../../dwr/interface/controladorProyectoPartida.js"> </script>
	<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>   
	<script type="text/javascript" src="../../dwr/engine.js"> </script>
    <script type="text/javascript" src="../../include/js/jquery.maxlength.js"></script>
    <script type="text/javascript" src="../../include/js/jquery.bestupper.min.js"></script>
    <script type="text/javascript" src="../../include/js/toolSam.js"></script>
    <script type="text/javascript" src="../../include/js/presupuesto/presupuesto.js"></script>
    <script type="text/javascript" src="../../include/js/otros/productos.js"></script>
    <script type="text/javascript" src="capturarPedidos.js?x=<%=System.currentTimeMillis()%>"></script>
	<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>

	<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
	<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
	<link rel="stylesheet" href="../../include/css/style-tabs.css" type="text/css"/>


	<link rel="stylesheet" href="../../include/css/boostrap-select/dist/css/bootstrap-select.css" type="text/css">
	<script type="text/javascript" src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>
	<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
	<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
	<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
	<!-- <link rel="stylesheet" href="../../include/js/sweetalert2/6.6.2/sweetalert2.css" type="text/css"> -->

	<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.4.1/core.js"></script>


<!--  
	<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
    <link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
	<script type="text/javascript" src="../../include/js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
	
	
		<script type="text/javascript" src="../../include/js/jquery-1.5.min.js"></script>
	
	
	
    <script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
    
    <script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
    
    <script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script> 
    
   <script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
   <script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
  
   <link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
   <link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
   <script type="text/javascript" src="../../include/js/jquery-ui/jquery-ui.1.12.1.min.js"></script>
   <link rel="stylesheet" href="../../include/js/jquery-ui/jquery-ui-1.12.1.min.css" type="text/css" />
   <link rel="stylesheet" href="../../include/css/black-tie/jquery-ui-1.7.3.custom.css" type="text/css" />
   <link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />
    
    <link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
	<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
    <script src="../../include/css/jquery.tiptip.js"></script>
    
	<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
	<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
    -->
  
<title>Pedidos - Captura de Pedido de la Requisicion No.</title>
</head>

<body>
<form name="forma" id="forma" method="get" action="../reportes/rpt_pedido.action">
<input type="hidden" name="clavePedido" id="clavePedido"  value="">

<h1 class="h1-encabezado">&nbsp;Pedidos - Captura de Pedido de la Requisicion No. <c:out value='${modelo.NUM_REQ}'/></h1>

<div class="col-sm-12" id="tabsOrdenesEnca">
<!-- Tabs para Pedidos-->
    <div id="tabuladores">
    	<div class="panel with-nav-tabs panel-primary">
    		 <div class="panel-heading">
		          <ul class="nav nav-tabs responsive" id="tabsOrdenesPane" name="tabsOrdenesPane">
		                <li class="active"><a href="#tabsCabe" data-toggle="tab">Información general</a></li>
		                <li><a href="#tabsCon" data-toggle="tab">Lotes</a></li>
		          </ul>
		     </div>
		     <div class="panel-body">
		     	 <div class="tab-content">
		     	 	 <!--Tab Encabezado-->
              		 <div class="tab-pane fade in active" id="tabsCabe">
              		 	<form class="form-horizontal">
              		 		<strong>Nota:</strong> La información marcada con (*) es requerida.
              		 		 <input type="hidden" id="CVE_REQ"  name="CVE_REQ" value="<c:out value='${cve_req}'/>"/>
                    		 <input type="hidden" id="CVE_PED" name="CVE_PED" value="<c:out value='${cve_ped}'/>" />
                    		 <input type="hidden" id="TIPO_REQ" name="TIPO_REQ" value="<c:out value='${map.TIPO}'/>" />
              		 		<!--No. Requisicion-->
              		 		<div class="row">
		                    	<div class="form-group" style="padding-bottom:15px;padding-top: 10px;">
			                    	<div class="control-label col-sm-3">No. Requisición :</div>
		                        	<div class="col-sm-9">
		                          		<div  id="cve_pedido" style="font-weight:bold"><c:out value='${modelo.NUM_REQ}'/></div>
		                        	</div>
		                      	</div>
		                    </div>
		                    <!--No. Pedido-->
		                    <div class="row">
			                	<div class="form-group">
			                    	<div class="control-label col-sm-3">Pedido No:&nbsp;</div>
			                    	<div class="col-md-5">	
			                    		<div  id="cve_pedido_text" style="font-weight:bold"><c:out value='${map.NUM_PED}'/></div>
			                    	</div>
			                     </div>
			                </div> 
			                <!--Fecha-->
			                <div class="row">
				                <div class="form-group">
				                	<div class="control-label col-sm-3 ">*Fecha pedido:</div>
				                    	<div class="form-group col-sm-3">
				                        	<div class="input-group date">
				                            	<input name="txtfecha" type="text" class="form-control" id="txtfecha" value="" style="width:100%" maxlength="10"/>
				                              	<span class="input-group-addon">
				                                <span class="glyphicon glyphicon-calendar"></span>
				                              	</span>
				                          	</div>
				                          	<input name="fecha2" type="hidden" class="input" id="fecha2" value="<c:if test="${cve_ped==0||cve_ped==NULL}"><%=new java.util.Date()%></c:if><c:out value='${map.FECHA_PED}'/>" style="width:111px" maxlength="10"/>
				                        </div>
				                     <div class="form-group col-sm-6">&nbsp;</div>
				                 </div>
			                 </div>
			                 <!--Contrato-->
			                 <div class="row">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">Contrato:</div>
			                        <div class="form-group col-sm-3">
			                            <input name="txtcontrato"  type="text"  class="form-control" id="txtcontrato" value="<c:out value='${map.CONTRATO}'/>" maxlength="30" onBlur="upperCase(this)"  style="width:100%" />
			                        </div>
			                     </div>
			                 </div>
			                  <!--Contrato-->
			                 <div class="row"style="display:none">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">Concurso:</div>
			                        <div class="form-group col-sm-3">
			                            <input name="txtconcurso"  type="text"  class="form-control" id="txtconcurso" value="<c:out value='${map.CVE_CONCURSO}'/>" maxlength="30" onBlur="upperCase(this)" style="width:100%" />
			                        </div>
			                     </div>
			                 </div>
			                 <!--Tiempo de entrega-->
			                 <div class="row">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">*Tiempo de entrega:</div>
			                        <div class="form-group col-sm-3">
			                        	<input name="txtfechaentrega" type="text" class="form-control" class="input" id="txtfechaentrega"  value="<c:out value='${map.FECHA_ENTREGA}'/>" onBlur="upperCase(this)" size="28" maxlength="25" />
			                        </div>
			                     </div>
			                 </div>
			                 <!--Beneficiario-->
			                 <div class="row">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">Seleccione un Beneficiario:</div>
			                        <div class="form-group col-sm-6">
			                            <select name="xBeneficiario" class="selectpicker form-control input-sm m-b" data-live-search="true" id="xBeneficiario" style="width:100%">
			                              <c:forEach items="${beneficiarios}" var="item" varStatus="status">
			                                    <option value='<c:out value="${item.clv_benefi}"/>'
			                                    <c:if test='${item.clv_benefi==map.CLV_BENEFI}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
			                              </c:forEach>
			                            </select>
			                        </div>
			                        
			                    </div>
			                  </div>
			                  <!--Condiciones de pago-->
			                  <div class="row">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">*Condiciones de pago:</div>
			                        <div class="form-group col-sm-3">
			                        	<input type="text" id="txtcondicionespago" class="form-control" maxlength="25" onBlur="upperCase(this)" value="<c:out value='${map.CONDICION_PAGO}'/>"/>
			                        </div>
			                     </div>
			                  </div>
			                  <!--Lugar de entrega-->
			                  <div class="row">
			                 	<div class="form-group">
			                    	<div class="control-label col-sm-3 ">Lugar de entrega:</div>
			                        <div class="form-group col-sm-3">
			                        	<input type="text" id="txtlugarentrega" class="form-control" onBlur="upperCase(this)" maxlength="40" value="<c:out value='${map.ENTREGA}'/>"/>
			                        </div>
			                     </div>
			                  </div>
			                  <!--Notas-->
				              <div class="row">
				              	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Notas:</div>
				                    	<div class="form-group col-sm-3">
				                        	<textarea id="txtdescripcion" name="txtdescripcion" onBlur="upperCase(this)" rows="4" class="form-control" wrap="virtual" maxlength="200"><c:if test="${map.NOTAS!=null}"><c:out value='${map.NOTAS}'/></c:if><c:if test="${map.NOTAS==null}"><c:out value='${observa}'/></c:if></textarea>
				                        </div>
				                        
				                    </div>
				              </div>
				              <!--Programa-->
				              <div class="row">
				              	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Programa:&nbsp;</div>
				                    	<div class="form-group col-sm-5">
				                        	<c:out value='${modelo.N_PROGRAMA}'/> - <c:out value='${modelo.DECRIPCION}'/>
				                        </div>
				                       
				                    </div>
				              </div>
				              <!--Partida-->
				              <div class="row">
				              	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Partida:&nbsp;</div>
				                    	<div class="form-group col-sm-5">
				                        	<c:out value='${modelo.CLV_PARTID}'/> - <c:out value='${modelo.PARTIDA}'/>
				                        </div>
				                      
				                    </div>
				              </div>
				              <!--Presupuesto-->
				              <div class="row">
				              	<div class="form-group">
				                	<div class="control-label col-sm-3 ">Presupuesto</div>
				                	<div class="form-group col-sm-9">
				                		<table style="width:80%" class="listasDetalles table table-hover">
						                    <thead >  
						                      <tr>
						                        <th width="66" style="text-align:center" height="20"><strong>Mes</strong></th>
						                        <th width="89" style="text-align:center"><strong>Autorizado</strong></th>
						                        <th width="92" style="text-align:right"><strong>Precomprometido</strong></th>
						                        <th width="101" style="text-align:right"><strong>Comprometido</strong></th>
						                        <th width="88" style="text-align:right"><strong>Ejercido</strong></th>
						                        <th width="78" style="text-align:right"><strong>Disponible</strong></th>
											  </tr>
											</thead>  
						                      <c:forEach items="${presupuesto}" var="item" varStatus="status"> 
						                      <tr>
						                        <td height="23" style="text-align:center"><c:out value='${mesActivo}'/></td>
						                        <td height="23" style="text-align:center">$<fmt:formatNumber value="${item.AUTORIZADO}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						                        <td style="text-align:right"><c:if test="${item.PRECOMPROMETIDO>0}"><a title="Mostrar pre-compromisos" href="javascript:mostrarConsultaCompromiso(<c:out value='${modelo.ID_PROYECTO}'/>,'<c:out value='${modelo.N_PROGRAMA}'/>', '<c:out value='${modelo.CLV_PARTID}'/>', <c:out value='${mes}'/>, 'PRECOMPROMETIDO')"></c:if>$<fmt:formatNumber value='${item.PRECOMPROMETIDO}' pattern="###,###,###.00"/></a>&nbsp;</td>
						                        <td style="text-align:right"><c:if test="${item.COMPROMETIDO>0}"><a title="Mostrar compromisos" href="javascript:mostrarConsultaCompromiso(<c:out value='${modelo.ID_PROYECTO}'/>,'<c:out value='${modelo.N_PROGRAMA}'/>', '<c:out value='${modelo.CLV_PARTID}'/>', <c:out value='${mes}'/>, 'COMPROMETIDO')"></c:if>$<fmt:formatNumber value='${item.COMPROMETIDO}' pattern="###,###,###.00"/></a>&nbsp;</td>
						                        <td style="text-align:right"><c:if test="${item.EJERCIDO>0}"><a title="Mostrar ejercido" href="javascript:mostrarConsultaCompromiso(<c:out value='${modelo.ID_PROYECTO}'/>,'<c:out value='${modelo.N_PROGRAMA}'/>', '<c:out value='${modelo.CLV_PARTID}'/>', <c:out value='${mes}'/>, 'EJERCIDO')"></c:if>$<fmt:formatNumber value='${item.EJERCIDO}' pattern="###,###,###.00"/></a>&nbsp;</td>
						                        <td style="text-align:right">$<fmt:formatNumber value="${item.DISPONIBLE}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						                      </tr>
						                      </c:forEach>
						                    </table>
						                    <input class="btn btn-danger" name="cmdcerrar" id="cmdcerrar" value="Cerrar" onclick="" style="width:120px" <c:if test="${cve_ped==0||cve_ped==NULL}">disabled</c:if> type="button">
						                    <input class="btn btn-success" name="cmdguardarPedido" id="cmdguardarPedido" <c:if test="${cve_ped==0}">disabled</c:if> value="Guardar" style="width:120px" type="button">
							  				
							  				
				                	</div>
				                    	
				                        <div class="form-group col-sm-7">&nbsp;</div>
				                    </div>
				              </div>
				              
				              
              		 	</form>
              		 </div>
              		 <div class="tab-pane" id="tabsCon">
              		 	<form class="form-horizontal">
              		 		<div id="fragment-conceptos" align="left">
              		 			<!--Partida-->
				              	<div class="row">
				              		<div class="form-group" style="margin-left: 20px;margin-right: 20px;">
				                    	<div class="form-group">
				                        	<table class="listasDetalles table table-striped" id="listasConceptos">
						                        <thead>
						                          <tr >
						                            <th width="2%" height="20"  align="center"><input type="checkbox" id="checkall" name="checkall" value="0"/></th>
						                            <th width="3%" align="center">Lote</th>
						                            <th width="6%" align="center">Cantidad</th>
						                            <th width="7%" align="center">Unidad</th>
						                            <th width="53%" align="center">Descripci&oacute;n del art&iacute;culo</th>
						                            <th width="10%" align="center">Precio Area</th>
						                            <th width="10%" align="center">Precio Unit.</th>
						                            <th width="9%"  align="center">Costo</th>
						                          </tr>
						                        </thead>
						                        <tbody>
						                          <c:forEach items="${mov}" var="item" varStatus="status"> 
						                          <tr>
						                            <td align="center" style="border-right:none"><input data-chkconcepto="concepto" data-idmovto="<c:if test="${cve_ped!=''}"><c:out value='${item.ID_PED_MOVTO}'/></c:if><c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if>" type="checkbox" id="chkconcepto" name="chkconcepto" value="<c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if><c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if>"/></td>
						                            <td align="center" style="border-right:none"><c:out value='${item.REQ_CONS}'/><input type="hidden" value="${item.REQ_CONS}" id="Lote<c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if><c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if>"></td>
						                            <td align="center" style="border-right:none"><input type="text" class="form-control" style="width:90%;text-align:center" onBlur="getTotales()" disabled value="<fmt:formatNumber value="${item.CANTIDAD}"  pattern="##.00" />" id="txtcantidad<c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if><c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if>"> </td>
						                            <td align="center" style="border-right:none">&nbsp;<c:out value='${item.UNIDMEDIDA}'/></td>
						                            <td align="left" style="border-right:none"><strong><c:out value='${item.ARTICULO}'/></strong><textarea rows="3" class="form-control" maxlength="300"  style="width:100%;" disabled id="txtnota<c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if><c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if>"><c:if test="${cve_ped!=null}"><c:out value='${item.DESCRIP}'/></c:if><c:if test="${cve_ped==null}"><c:out value='${item.NOTAS}'/></c:if></textarea></td>
						                            <td align="right" style="border-right:none">$ <fmt:formatNumber value="${item.PRECIO_EST}"  pattern="#,###,###,##0.00" />&nbsp;</td>
						                            <td align="center" style="border-right:none"><input data-unitprice="precio" data-idmovto="<c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if><c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if>" type="text" class="form-control" style="width:90%; text-align:right; padding-right:5px" disabled value='<fmt:formatNumber value="${item.PRECIO_ULT}"  pattern="##########.00" />' id="txtpreciounit<c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if><c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if>"></td>
						                            <td align="center"><div align="right" id="divcosto<c:if test="${cve_ped==null}"><c:out value='${item.ID_REQ_MOVTO}'/></c:if><c:if test="${cve_ped!=null}"><c:out value='${item.ID_PED_MOVTO}'/></c:if>">$ 0.00&nbsp;</div></td>
						                          </tr>
						                          </c:forEach>
						                          
						                          <tr>
						                            <td colspan="8"  align="center"><table style="background-color:#FFF" width="100%" height="88" border="0" cellspacing="0" cellpadding="0">
						                              <tr>
						                                <td width="78%" height="22" align="left" style="border-right:none; border-bottom:none; background:#FFF"><c:if test="${cve_ped!=null}">
						                                  <table width="600" border="0" cellspacing="0" cellpadding="0" align="left" bgcolor="#FFFFFF">
						                                    <tr>
						                                      <td bgcolor="#FFFFFF" width="30%" align="center" id="filaPedido"><div class="buttons tiptip">
						                                      	<input class="btn btn-danger" name="cmdborrarConceptos" id="cmdborrarConceptos" value="Eliminar lotes" style="width:150px;" type="button">
						                                        
						                                      </div></td>
						                                      <td bgcolor="#FFFFFF" width="30%" align="center" id="filaReq"><div class="buttons tiptip">
						                                        <input class="btn btn-danger" name="cmdenviarPedido" id="cmdenviarPedido" value="Exportar lotes" style="width:150px;margin-left: 5px;" type="button">
						                                        
						                                      </div></td>
						                                      <td bgcolor="#FFFFFF" width="19%" align="center" id="filaReq"><div class="buttons tiptip">
						                                      	<input class="btn btn-success" name="cmdguardarPedido2" id="cmdguardarPedido2" value="Guardar" style="width:150px;margin-left: 5px;" type="button">
						                                        
						                                      </div></td>
						                                      <td bgcolor="#FFFFFF" width="19%" align="center" id="filaReq"><div class="buttons tiptip">
						                                      	<input class="btn btn-success" name="cmdsincronizar" id="cmdsincronizar" value="Sincronizar Requisicion" style="width:180px;margin-left: 5px;" type="button">
						                                        
						                                      </div></td>
						                                    </tr>
						                                  </table>
						                                </c:if></td>
						                                <td align="right" width="13%" style="background:#FFF" height="30"><strong>Subtotal:<strong></strong></strong></td>
						                                <td width="9%" style="background:#FFF"><div align="right" id="divsubtotal">$ 0.00</div></td>
						                              </tr>
						                              <tr>
						                                <td rowspan="3" align="left" style="background:#FFF"></td>                    
						                                <td height="30" align="right" style="border-left:none; background:#FFF">IEPS:</td>
						                                <td style="background:#FFF"><input type="text" id="txtieps" class="form-control" style="width:95%; text-align:right; padding-right:3px" onKeyPress="return keyNumbero(event);" value='<fmt:formatNumber value="${map.IEPS}"  pattern="##########.00" />'/></td>
						                              
						                              </tr>
						                              <tr>
						                                
						                                <td height="50" align="right" style="border-left:none; background:#FFF">Descuento:</td>
						                                <td style="background:#FFF"><input type="text" id="txtdescuento" class="form-control" style="width:95%; text-align:right; padding-right:3px" onKeyPress="return keyNumbero(event);" value='<fmt:formatNumber value="${map.DESCUENTO}"  pattern="##########.00" />' /></td>
						                              </tr>
						                              <tr>
						                                <td  height="35" align="right" style="border-left:none; background:#FFF">
						                                <select name="cboiva" class="form-control" id="cboiva" onChange="getTotales();">
						                                  <option value="0" <c:if test="${map.TIPO_IVA==0}"> selected</c:if>>Sin I.V.A</option>
						                                  <option value="1" <c:if test="${map.TIPO_IVA==1}">selected</c:if>>Con 16% I.V.A</option>
						                                  <option value="2" <c:if test="${map.TIPO_IVA==2}">selected</c:if>>I.V.A Personalizado</option>
						                                </select></td>
						                                <td style="background:#FFF"><input type="text" id="txtiva" class="form-control" style="width:95%;margin-left: 3px; text-align:right; padding-right:3px" value="${map.IVA}" onBlur="getTotalesMasIva()" onKeyPress="return keyNumbero(event);"/></td>
						                              </tr>
						                              <tr>
						                             	<td rowspan="3" align="left" style="background:#FFF"></td> 
						                                <td width="13%" height="30" align="right" style="border-left:none; background:#FFF"><strong>Total:</strong></td>
						                                <td width="9%" style="background:#FFF"><div align="right" id="divtotal">$ 0.00</div></td>
						                              </tr>
						                            </table></td>
						                          </tr>
						                          </tbody>
						                     </table>
				                        </div>
				                     </div>
				             	 </div>
              		 		</div>
              		 		
              		 	</form>
              		 </div>
		     	 </div>
		     </div> 
    	</div>
    </div>
</div>
<!--  
<div style="display:none"> Concurso:</div>
<div style="display:none"><input name="txtconcurso" type="text" class="input" id="txtconcurso" style="width:100px"  value="<c:out value='${map.CVE_CONCURSO}'/>"  /></div>
-->
 
 
</form>
</body>
</html>