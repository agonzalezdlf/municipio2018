<%@page import="java.util.Date"%>
<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Reporte de transferencias</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<script type="text/javascript"
	src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/jquery.form.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css"
	type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css"
	type="text/css" />
<link rel="stylesheet" href="../../include/css/style-tabs.css"
	type="text/css" />
<link rel="stylesheet"
	href="../../include/css/boostrap-select/dist/css/bootstrap-select.css"
	type="text/css">
<script type="text/javascript"
	src="../../include/css/boostrap-select/dist/js/bootstrap-select.js"></script>
<script type="text/javascript"
	src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet"
	href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css"
	type="text/css">
<script type="text/javascript"
	src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<link rel="stylesheet" href="../../include/css/sweetalert2.css"
	type="text/css">

<script type="text/javascript" src="lst_reportetransferencia.js?x=<%=System.currentTimeMillis()%>"></script>
<script type = "text / javascript">

</script>
<style type="text/css">
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

.ui-widget-content {
	border: none;
}
</style>
</head>
<body>
<form name="forma" id="forma" class="form-horizontal" action="lst_reportetransferencia.action" method="post" style="margin:10px;">
	<div class="row col-md-offset-2">
          <h1 class="h1-encabezado"> Reportes - Transferencias, Ampliaciones y Reducciones Liquidas</h1>
    </div> 
    <div class="well">
    
    	<div class="form-group"><!-- Unidad -->
	      <label class="control-label col-sm-2" for="dependencia">Unidad:</label>
	      <div class="col-sm-6">
	       		<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	      			<c:out value="${nombreUnidad}"/><input type="hidden" name="cbUnidad" id="cbUnidad" value='<c:out value="${idUnidad}"/>' />
	      		</sec:authorize>
	       		<sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
	       			<select name="cbUnidad" class="selectpicker form-control input-sm m-b" data-live-search="true" id="cbUnidad">
	       				<option value="0" <c:if test='${item.ID==0}'> selected </c:if>>[Todas las Unidades Administrativas]</option>
	            		<c:forEach items="${unidadesAdmiva}" var="item" varStatus="status">                  
	              			<option value="<c:out value="${item.ID}"/>" 
	              			<c:if test="${item.ID==idUnidad}"> selected </c:if> >
	             			<c:out value="${item.DEPENDENCIA}"/></option>
	           			</c:forEach>
	          		</select>
	        	</sec:authorize>
       		</div>
       		<div class="col-sm-4">
       			<input type="button" name="cmdBuscar" id="cmdBuscar" value="Buscar" class="btn btn-primary" style="width:150px;">
       		</div>
		</div>
		<div class="form-group"><!-- Tipo de gasto -->
	      <label class="control-label col-sm-2" for="cbotipogasto">Tipo de gasto:</label>
	      <div class="col-sm-6">          
	        <select name="cbotipogasto" id="cbotipogasto " data-live-search="true" class="selectpicker form-control input-sm m-b">
	      		<option value="0"> [Todos los tipos de gastos]
	        		<c:forEach items="${tipodeGasto}" var="item" varStatus="status">
	        		<option value='<c:out value="${item.ID}"/>'
					<c:if test='${item.ID==idtipogasto}'> selected </c:if>>
	  				<c:out value='${item.RECURSO}'/>
	        	</option>
	      			</c:forEach>
	    	</select>
	      </div>
	      <div class="col-sm-4">
       			<input type="button" name="cmdexportar" id="cmdexportar" value="Exporar a excel" data-toggle="tooltip" title="Exportar a excel" class="btn btn-sucess" style="width:150px;">
       	  </div>
	    </div>
	    
	 	<div class="form-group">
	      <label class="control-label col-sm-2">Tipo de adecuación:</label>
		  <div class="col-sm-3">
				<select name="cboadecuacion" id="cboadecuacion" class="selectpicker form-control input-sm m-b" data-live-search="true" multiple>
					<optgroup label="">
						<option value="0" <c:if test = "${fn:contains(tipoAdecuacion, '0')}"> selected </c:if>> [Todas las opciones]</option>
					</optgroup>
					<optgroup label="">
						<option value="1" <c:if test = "${fn:contains(tipoAdecuacion, '1')}"> selected </c:if>>AMPLIACIONES</option>
						<option value="2" <c:if test = "${fn:contains(tipoAdecuacion, '2')}"> selected </c:if>>REDUCCIONES</option>
						<option value="3" <c:if test = "${fn:contains(tipoAdecuacion, '3')}"> selected </c:if>>TRANSFERENCIAS</option>
					</optgroup>
				  </select>
	      </div>
	      
		  <label class="control-label col-sm-1">Mes:</label>
		  <div class="col-sm-2">
			<select name="cbomes" id="cbomes" class="selectpicker form-control input-sm m-b" data-live-search="true">
				<option value="0"> [Seleccione el mes]</option>
				<option value="1" <c:if test="${1==mes}"> selected </c:if>>ENERO</option>
				<option value="2" <c:if test="${2==mes}"> selected </c:if>>FEBRERO</option>
				<option value="3" <c:if test="${3==mes}"> selected </c:if>>MARZO</option>
				<option value="4" <c:if test="${4==mes}"> selected </c:if>>ABRIL</option>
				<option value="5" <c:if test="${5==mes}"> selected </c:if>>MAYO</option>
				<option value="6" <c:if test="${6==mes}"> selected </c:if>>JUNIO</option>
				<option value="7" <c:if test="${7==mes}"> selected </c:if>>JULIO</option>
				<option value="8" <c:if test="${8==mes}"> selected </c:if>>AGOSTO</option>
				<option value="9" <c:if test="${9==mes}"> selected </c:if>>SEPTIEMBRE</option>
				<option value="10" <c:if test="${10==mes}"> selected </c:if>>OCTUBRE</option>
				<option value="11" <c:if test="${11==mes}"> selected </c:if>>NOVIEMBRE</option>
				<option value="12" <c:if test="${12==mes}"> selected </c:if>>DICIEMBRE</option>
		  </select>
		  </div>
		</div> 
    </div>
    
    <c:set var="cont" value="1" />
	<c:set var="id_recurso" value="0" />
	<c:set var="id_proyecto" value="0" />
	<c:set var="tipo_adecuacion" value="" />
    <c:forEach items="${listadotransferencias}"  var="item" varStatus="status"> 

			<c:if test="${item.ID_RECURSO != id_recurso}">				
				<table width="95%" class="table table-hover table-sm" align="center" id="listaMomentos" cellpadding="0" cellspacing="0">
					<thead class="thead-inverse">
							<tr>
								<th colspan="666" style="text-align:left;">
										<c:out value='${item.CLV_RECURSO}'/> <c:out value='${item.RECURSO}'/>
								</th>
							</tr>
							<tr>
								<th width="5%" style="background-color:#777676"></th>
								<th width="15%" style="background-color:#777676">TIPO</th>
								<th width="5%" style="background-color:#777676">ADECUACION</th>
								<th width="70%" style="background-color:#777676">PROYECTO / PARTIDA</th>
								<!--<th width="40%">MOTIVO</th>-->
								<th width="5%" style="background-color:#777676">AMPLIADO</th>
								<th width="5%" style="background-color:#777676">REDUCIDO</th>
							</tr>
					</thead>
					<c:set var="tipo_adecuacion" value="" />
			</c:if>

				<tr>
					<c:if test="${item.TIPO != tipo_adecuacion}">
						<!-- SE CONSTRUYE LA CABECERA DEL TIPO DE ADECUACION-->
						<tr>
							<td align="center" colspan="4" style="border-right:none; background-color: #cccccc"><strong><c:out value='${item.TIPO}'/></strong></td>
							<td style="border-right:none;text-align:right;background-color: #cccccc"><strong><div id="div_global_amp" data-tipoadec="<c:out value='${item.TIPO}'/>" data-idrecurso="<c:out value='${item.ID_RECURSO}'/>"></div></strong></td>
							<td style="border-right:none; text-align:right;background-color: #cccccc"><strong><div id="div_global_red" data-tipoadec="<c:out value='${item.TIPO}'/>" data-idrecurso="<c:out value='${item.ID_RECURSO}'/>"></div></strong></td>
						</tr>
					</c:if>

					<c:if test="${item.ID_PROYECTO != id_proyecto}">
						<!-- SE CONSTRUYE LA CABECERA DEL PROYECTO-->
						<tr>
							<td align="center" style="border-right:none">
								<c:if test="${mes == item.MES_APROBACION}">
									<div style="margin-top: 4px;"><span class="label label-success">Nuevo</span></div>
								</c:if>
							</td>
							<td align="left" colspan="5" style="border-right:none"><strong>(<c:if test="${item.K_PROYECTO_T != null}"><c:out value='${item.K_PROYECTO_T}'/></c:if><c:if test="${item.K_PROYECTO_T == null}"><c:out value='${item.ID_PROYECTO}'/></c:if>) <c:out value='${item.PROYECTO}'/></strong></td>	
						</tr>
					</c:if>
						
					<!-- SE CONSTRUYE EL DETALLE-->
					<td align="center" style="border-right:none"></td>
					<td align="center" style="border-right:none"><c:out value='${item.DEPENDENCIA}'/></td>
					<td align="center" style="border-right:none"><c:out value='${item.ADECUACION}'/></td>
					<td align="left" style="border-right:none"><c:out value='${item.CLV_PARTID}'/> - <c:out value='${item.PARTIDA}'/></td>	
						<!--<td align="left" style="border-right:none"><c:out value='${item.MOTIVO}'/></td>-->
					<td style="border-right:none;text-align:right"><input id="HTotal_amp" data-tipoadec="<c:out value='${item.TIPO}'/>" data-idrecurso="<c:out value='${item.ID_RECURSO}'/>" type="hidden" value="${item.AMPLIACION}"><fmt:formatNumber value="${item.AMPLIACION}"  pattern="#,###,###,##0.00" /></td>
					<td style="border-right:none; text-align:right"><input id="HTotal_red" data-tipoadec="<c:out value='${item.TIPO}'/>" data-idrecurso="<c:out value='${item.ID_RECURSO}'/>" type="hidden" value="${item.REDUCCION}"><fmt:formatNumber value="${item.REDUCCION}"  pattern="#,###,###,##0.00" /></td>
				</tr>
					
				<c:set var="id_proyecto" value="${item.ID_PROYECTO}" />
				<c:set var="id_recurso" value="${item.ID_RECURSO}" />
				<c:set var="tipo_adecuacion" value="${item.TIPO}" />
				<c:set var="cont" value="${cont + 1}" />

    </c:forEach>
	</table>    	
     
	
</form>

</body>
</html>