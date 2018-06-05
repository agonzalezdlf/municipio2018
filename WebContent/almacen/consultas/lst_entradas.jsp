<!--
package mx.gob.municipio.centro.view.controller.almacen.consultas; 
ControladorListadoEntradasDocumentos 
-->
<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<title>Listado de Entradas de Documentos</title>

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">


<script type="text/javascript" src="../../include/js/jquery-2.1.3.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="lst_entradas.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>

<!-- Demo del autocomplit -->
<link rel="stylesheet"  href="../../include/js/jquery-ui/jquery-ui-1.12.1.min.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/jquery-ui/jquery-ui.1.12.1.min.js"></script>


<script type="text/javascript" src="../../include/js/toolSam.js"></script>


<script type="text/javascript" src="../../dwr/interface/controladorListadoEntradasDocumentosRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../dwr/util.js"> </script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>





<!-- 
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
<script src="../../include/css/jquery.tiptip.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />	
 -->

<style type="text/css">
<!--
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a:active {
	text-decoration: none;
}
-->
</style></head>
<body class="Fondo" >
<form action="../reportes/entradas.action"  method="get" id="frmreporte" name="frmreporte">
<div class="row col-md-offset-2">
          <h1 class="h1-encabezado"> Entradas - Listado de Entradas </h1>
</div>  
<input name="ID_PROVEEDOR" type="hidden" id="ID_PROVEEDOR" value="<c:out value='${id_proveedor}'/>" />
<input name="ID_ENTRADA" type="hidden" id="ID_ENTRADA" value="" />
<input name="clavePedido" type="hidden" id="clavePedido" value="" />

<div class="well">
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Unidad Administrativa:</div>
            	<div class="col-sm-3 form-group">
             		<sec:authorize ifNotGranted="ROLE_Almacen_PRIVILEGIOS_VER_UNIDADES_ADMINISTRATIVAS">
      					<c:out value="${nombreUnidad}"/>
        				<input type="hidden" id="cbodependencia" name="cbodependencia" value="<c:out value='${cbodependencia}'/>">
    				</sec:authorize>
    				<sec:authorize ifAllGranted="ROLE_Almacen_PRIVILEGIOS_VER_UNIDADES_ADMINISTRATIVAS">
    				<div class="styled-select">
	            		<select name="cbodependencia" id="cbodependencia" class="form-control" style="width:445px">
	                          <option value="0">[Seleccione]</option>
	                          <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
	                          <option value='<c:out value="${item.ID}"/>' 
	                            <c:if test='${item.ID==cbodependencia}'> selected </c:if>>
	                            <c:out value='${item.DEPENDENCIA}'/>
	                            </option>
	                          </c:forEach>
	             		</select>
          			</div>
       				</sec:authorize> 
                </div>
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Almacen:</div>
            	<div class="col-sm-3 form-group">
             		<select name="cboalmacen" class="form-control" id="cboalmacen" style="width:445px;">
			          <option value="0">[Seleccione]</option>
			          <c:forEach items="${almacenes}" var="item" varStatus="status"> <option value='<c:out value="${item.ID_ALMACEN}"/>' 
			            <c:if test='${item.ID_ALMACEN==id_almacen}'> selected </c:if>>
			            <c:out value='${item.DESCRIPCION}'/>
			            </option>
			          </c:forEach>
			        </select>
                </div>
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Tipo de documento:</div>
            	<div class="col-sm-3 form-group">
             		 <select name="cbotipodocumento" class="form-control" id="cbotipodocumento" style="width: 30%;">
				        <option value="0">[Seleccione]</option>
				        <c:forEach items="${tiposDocumentos}" var="item" varStatus="status"> <option value='<c:out value="${item.ID_TIPO_DOCUMENTO}"/>' 
				          <c:if test='${item.ID_TIPO_DOCUMENTO==id_tipo_documento}'> selected </c:if>
				          >
				          <c:out value='${item.DESCRIPCION}'/>
				          </option>
				        </c:forEach>
				      </select>
                </div>
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Por fecha desde:</div>
            	
             	<div class="col-sm-2 form-group">
        			<input placeholder="Desde" name="txtfechaInicial" type="text" id="txtfechaInicial" maxlength="10" class="form-control input-sm" style="width: 45%;" value="<c:out value='${fechaInicial}'/>">
	  			</div>
      			<div class="col-sm-2 form-group">
      				<input placeholder="Hasta" name="txtfechaFinal" type="text" id="txtfechaFinal" class="form-control input-sm" style="width: 45%;" value="<c:out value='${fechaFinal}'/>"  maxlength="10">
      			</div>
      			<div class="col-sm-3 form-group">
      				
      			</div>
                <div class="col-sm-2 form-group">
      				<input name="cmdbuscar" id="cmdbuscar" type="button" style="width: 110px;" class="btn btn-buscar" value="Buscar"/>
      			</div>
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Proyecto:</div>
            	
             	<div class="col-sm-2 form-group">
        			<input name="txtproyecto" type="text" placeholder="Proyecto" class="form-control input-sm" style="width: 45%;"  id="txtproyecto"  value="<c:out value='${proyecto}'/>" >
	  			</div>
      			<div class="col-sm-2 form-group">
      				<input name="txtpartida" type="text" placeholder="Partida" class="form-control input-sm" style="width: 45%;" id="txtpartida"  value="<c:out value='${partida}'/>" >
      			</div>
                
        </div>
	</div>
		<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Proveedor:</div>
            	<div class="col-sm-3 form-group">
             		 <select name="cboproveedor" class="selectpicker form-control input-sm" data-live-search="true" data-size="10" title="Seleccione un Beneficiario..." id="cboproveedor" style="width:100%">
                              <c:forEach items="${beneficiarios}" var="item" varStatus="status">
                                    <option value='<c:out value="${item.CLV_BENEFI}"/>'
                                    <c:if test='${item.CLV_BENEFI==id_proveedor}'>selected</c:if>><c:out value='${item.NCOMERCIA}'/>
                              </c:forEach>
             		</select>
                </div>
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	
            	<div class="control-label col-sm-3">Número documento:  </div>
             	<div class="col-sm-2 form-group">
        			<input name="txtdocumento" type="text" placeholder="Documento" style="width: 45%;" class="form-control input-sm"  id="txtdocumento"  value="<c:out value='${num_documento}'/>" >
	  			</div>
      			<div class="col-sm-2 form-group">
      				<input name="txtpedido" type="text" class="form-control input-sm" style="width: 45%;" placeholder="No. Pedido" id="txtpedido"  value="<c:out value='${id_pedido}'/>" >
      			</div>
                
        </div>
	</div>
	<div class="row">
    	<div class="form-group">
        	<div class="control-label col-sm-3 ">Número de folio:  </div>
            <div class="col-sm-2">
        		<input name="txtfolio" type="text" class="form-control input-sm" placeholder="Folio" id="txtfolio" style="width: 45%;" value="<c:out value='${folio}'/>" >
	  		</div>
      		<div class="col-sm-5">
        		
	  		</div>
            <div class="col-sm-2">
            	<sec:authorize ifAllGranted="ROLE_Almacen_PRIVILEGIOS_REPORTE_PDF_LISTADO_ENTRADAS">
    				<input name="cmdpdf" id="cmdpdf" onClick="getListadoEntradas()" style="width: 110px;"  title="Mostrar listado en formato PDF" type="button" class="btn btn-imprimir" value="Imprimir PDF" />
    			</sec:authorize>  
            </div>    
        </div>
	</div>
</div>

  <div>
		
		 
  </div>
<br />
<table width="95%" border="0" cellpadding="0" cellspacing="0" class="listasDetalles table table-hover" align="center" id="listaDocumentos">
 <thead>
  <tr>
    <th width="2%" height="20"></th>
    <th width="6%">Folio</th>
    <th width="7%">Num. Remisión</th>
    <th width="8%">Pedido</th>
    <th width="7%">Fecha</th>
    <th width="47%">Descripción</th>
    <th width="9%">Programa/Partida</th>
    <th width="8%">Status</th>
    <th width="6%">Opciones</th>
  </tr>
   </thead>   
<tbody>  
<c:set var="cont" value="${0}" /> 
<c:forEach items="${listadoDocumentos}" var="item" varStatus="status"> 
  <tr>
    <td height="25" align="center">
    <c:if test='${item.STATUS==1}'>
    	<input type="checkbox" id="chkentradas" name="chkentradas" value="<c:out value='${item.ID_ENTRADA}'/>"/>
    </c:if>
    </td>
    <td height="25" align="center"><c:out value='${item.FOLIO}'/></td>
    <td align="center"><c:out value='${item.DOCUMENTO}'/></td>
    <td align="center"><a href="javascript:getReportePedido(<c:out value='${item.CVE_PED}'/>)"> <c:out value='${item.NUM_PED}'/></a></td>
    <td align="center"><c:out value='${item.FECHA_CREACION}'/></td>
    <td><c:out value='${item.DESCRIPCION}'/></td>
    <td align="center">[<c:out value='${item.ID_PROYECTO}'/>] <c:out value='${item.N_PROGRAMA}'/>/<c:out value='${item.PARTIDA}'/></td>
    <td align="center"><c:if test='${item.FECHA_CIERRE==NULL}'>EDICION</c:if><c:if test='${item.FECHA_CIERRE!=NULL}'><c:out value='${item.STATUS_DESC}'/></c:if></td>
    <td align="center"><img style="cursor:pointer" src="../../imagenes/pdf.gif" title="Ver Documento" border="0" width="14" height="16" onClick="getReporteEntrada(<c:out value='${item.ID_ENTRADA}'/>)">
    &nbsp;<c:if test='${item.STATUS==1||(item.STATUS==0&&item.FECHA_CIERRE==NULL)}'><img src="../../imagenes/page_white_edit.png" title="Editar / Abrir" style="cursor:pointer" onClick="editarDccumento(<c:out value='${item.ID_ENTRADA}'/>, '<c:if test='${item.FECHA_CIERRE==NULL}'></c:if><c:if test='${item.FECHA_CIERRE!=NULL}'><c:out value='${item.STATUS}'/></c:if>')"></c:if>
    <c:if test='${item.STATUS==0&&item.FECHA_CIERRE!=NULL}'><img src="../../imagenes/page_gray_edit.png" style="cursor:pointer"></c:if>
    <c:if test='${item.STATUS==1}'>
    &nbsp;<img style="cursor:pointer" src="../../imagenes/cross.png" title="Cancelar Documento" border="0" width="16" height="16" onClick="cancelarDocumento(<c:out value='${item.ID_ENTRADA}'/>)"> 
    </c:if>
    <c:if test='${item.STATUS==0}'>
    &nbsp;<img src="../../imagenes/cross2.png" title="Cancelar Documento" border="0" width="16" height="16"> 
    </c:if>
    <c:if test='${item.FECHA_OFICIAL==NULL&&item.FECHA_CIERRE!=NULL&&item.STATUS!=0}'>
        <img style="cursor:pointer" src="../../imagenes/accept.png" title="Validar Entrada" border="0" width="16" height="16" onClick="validarEntrada(<c:out value='${item.ID_ENTRADA}'/>)">
    </c:if>
    <c:if test='${item.FECHA_OFICIAL==NULL&&item.FECHA_CIERRE==NULL&&item.STATUS!=0}'>
        <img style="cursor:pointer" src="../../imagenes/accept2.png" title="Validar Entrada" border="0" width="16" height="16">
    </c:if>
    </td>
  </tr>
  <c:set var="cont" value="${cont+1}"/> 
  </c:forEach>
   
  </tbody>  
</table>
<table width="95%" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td height="35" align="left">
    <table width="250" border="0" cellpadding="0" cellspacing="0">
      <tr>
      <sec:authorize ifAllGranted="ROLE_Almacen_PRIVILEGIOS_APERTURAR_ENTRADAS">
        <td width="130" align="center"><div class="buttons tiptip">
              <div class="buttons tiptip">
                <button name="cmdAperturar" id="cmdAperturar" type="button" class="button red middle"><span class="label" style="width:100px">Aperturar</span></button>
              </div></div>
        </td>
        </sec:authorize>
        <sec:authorize ifAllGranted="ROLE_Almacen_PRIVILEGIOS_CANCELAR_ENTRADAS">
        	<td width="130"><button name="cmdcancelar" id="cmdcancelar" type="button" class="button red middle"><span class="label" style="width:100px">Cancelar</span> </button></td>
        </sec:authorize>
      </tr>
    </table>
    </td>
  </tr>
</table>
</form>
</body>
</html>
