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

<script type="text/javascript" src="lst_reportepresupuestodis.js?x=<%=System.currentTimeMillis()%>"></script>
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
          <h1 class="h1-encabezado"> Reportes - Transferencias</h1>
    </div> 
    <div class="well">
    
    	<div class="form-group"><!-- Unidad -->
	      <label class="control-label col-sm-1" for="dependencia">Unidad:</label>
	      <div class="col-sm-4">
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
       		<div class="col-sm-4 col-md-offset-2">
       			<input type="button" name="cmdBuscar" id="cmdBuscar" value="Buscar" class="btn btn-primary">
       		</div>
		</div>
		<div class="form-group"><!-- Tipo de gasto -->
	      <label class="control-label col-sm-1" for="cbotipogasto">Tipo de gasto:</label>
	      <div class="col-sm-4">          
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
	      <div class="col-sm-4 col-md-offset-2">
       			<input type="button" name="cmdexportar" id="cmdexportar" value="Exporar a excel" data-toggle="tooltip" title="Exportar a excel" class="btn btn-sucess">
       	  </div>
	    </div>
	    <div class="form-group"><!-- Capitulo -->
	      <label class="control-label col-sm-1" for="cbotipogasto">Capitulo:</label>
	      <div class="col-sm-4">          
	        <select name="cbocapitulo" id="cbocapitulo " class="selectpicker form-control input-sm m-b" data-live-search="true">
	      		<option value="0"> [Todos los capitulos]
	        		<c:forEach items="${capitulos}" var="item" varStatus="status">
	        		<option value='<c:out value="${CLV_CAPITU.ID}"/>'
					<c:if test='${item.ID==cbocapitulo}'> selected </c:if>>
	  				<c:out value='${item.CLV_CAPITU}'/>
			          -
			        <c:out value='${item.CAPITULO}'/>
	        	</option>
	      			</c:forEach>
	    	</select>
	      </div>
	    </div>
	 	<div class="form-group">
	      <label class="control-label col-sm-1" for="email">Proyecto:</label>
	      <div class="col-sm-2">
	      	<input placeholder="Proyecto" name="txtproyecto" type="text" id="txtproyecto" class="form-control input-sm" value="<c:out value='${txtproyecto}'/>">
	      </div>
	      <label for="txtpartida" class="sr-only control-label">Partida:</label>
	      <div class="col-sm-2">
	      	<input placeholder="Partida" name="txtpartida" type="text" id="txtpartida" class="form-control input-sm" onKeyPress="return keyNumbero(event);" value="<c:out value='${txtpartida}'/>">
	      </div>
		</div> 
    </div>
    
    <c:set var="cont" value="1" />
	<c:set var="id_recurso" value="0" />
    <c:forEach items="${listadotransferencias}"  var="item" varStatus="status"> 
    	<c:if test="${item.ID_RECURSO != id_recurso}">
    	
		    <table width="95%" class="table table-hover table-sm" align="center" id="listaMomentos" cellpadding="0" cellspacing="0">
				<thead class="thead-inverse">
						  <tr>
						  <th colspan="7" style="text-align:center;">
						  	<c:out value='${item.ID_RECURSO}'/>
						  </th>
						  </tr>
						  <tr>
						  	<th width="5%">CLAVE PRE.</th>
						  	<th width="5%">ADECUACION</th>
						    <th width="5%">ID_PROYECTO</th>
						    <th width="30%">DECRIPCION</th>
						    <th width="40%">MOTIVO</th>
						    <th width="5%">AMPLIADO</th>
						    <th width="5%">REDUCIDO</th>
						  </tr>
				</thead>

    		<c:choose>
			  <c:when test="${cont == 1 && item.ID_RECURSO 	!= id_recurso}">
			    <tbody>
			   
			    	
			    
			  </c:when>
			  <c:otherwise>
			  
			    </tbody>
			  </c:otherwise>
			</c:choose>
    	</c:if>
    	
    	<tr>
    		
    		<td align="center" style="border-right:none"></td>
	    	<td align="center" style="border-right:none"><c:out value='${item.ADECUACION}'/></td>
	 		<td align="center" style="border-right:none"><c:out value='${item.ID_PROYECTO}'/></td>
	 		<td align="left" style="border-right:none"><c:out value='${item.DECRIPCION}'/></td>	
	 		<td align="left" style="border-right:none"><c:out value='${item.MOTIVO}'/></td>
		    <td style="border-right:none;text-align:right"><fmt:formatNumber value="${item.AMPLIADO}"  pattern="#,###,###,##0.00" /></td>
			<td style="border-right:none; text-align:right"><fmt:formatNumber value="${item.REDUCIDO}"  pattern="#,###,###,##0.00" /></td>
	    </tr>
						    
    	<c:set var="id_recurso" value="${item.ID_RECURSO}" />
    	<c:set var="cont" value="${cont + 1}" />

    </c:forEach>
    	
     
	
</form>

</body>
</html>