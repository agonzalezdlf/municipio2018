<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Listado de Vales</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">

<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js?x=<%=System.currentTimeMillis()%>"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">


<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>

<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/moment-with-locales-2.9.0.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker-4.15.35.css" type="text/css">
<script type="text/javascript" src="../../include/css/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker-4.15.35.js"></script>
<script type="text/javascript" src="../../include/js/jquery-ui-1.12.1.js"></script>

<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">


<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="lista_vales.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>


<script type="text/javascript" src="../../dwr/interface/controladorListadoValesRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<link rel="stylesheet" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" type="text/css" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />

<!-- 
<link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
<script src="../../include/css/jquery.tiptip.js"></script>
 -->
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">



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
</style>
<body >
<form  action="lista_vales.action"  id="forma" name="forma">
<input type="hidden" name="ejercicio" id="ejercicio" value="<c:out value='${ejercicio}'/>">
<input type="hidden" name="cve_val" id="cve_val" >
<table width="95%" align="center"><tr><td><h1> Vales - Listado de Vales</h1></td></tr></table>
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="formulario">
  <tr >
    <th height="16">&nbsp;</th>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr >
    <th  width="11%" height="25">Unidad:</th>
  <td>
        <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
      <c:out value="${nombreUnidad}"/><input type="hidden" name="cbodependencia" id="cbodependencia" value='<c:out value="${idUnidad}"/>' />
      </sec:authorize>
       <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
       <div class="styled-select">
          <select name="cbodependencia"  id="cbodependencia" style="width:500px" class="form-control" >
            <option value="0">[Todas la Unidades Administrativas]</option>
            <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
              <option value='<c:out value="${item.ID}"/>' <c:if test='${item.ID==idUnidad}'> selected </c:if>><c:out value='${item.DEPENDENCIA}'/></option>
              </c:forEach>
              </select>
         </div>
      </sec:authorize>
    </td>
    <td width="15%"><input type="checkbox" name="status" id="status"  value="0" <c:if test="${fn:contains(status,'0')}" >checked</c:if>>
      &nbsp;Edición</td>
    <td width="15%"><input type="checkbox" name="status" id="status"  value="1" <c:if test="${fn:contains(status,'1')}" >checked</c:if>
    >
      Pendiente de Pagado</td>
    <td width="15%"><input type="checkbox" name="status" id="status"  value="4" <c:if test="${fn:contains(status,'4')}" >checked</c:if>
    >
      Pagado</td>
  </tr>
  <tr >
    <th height="25" >Tipo de gasto:
    <td><strong>
    <div class="styled-select">
    <select name="cbotipogasto" id="cbotipogasto" style="width:500px" class="form-control">
      <option value="0">[Todos los tipos de gastos]</option>
      <c:forEach items="${tipodeGasto}" var="item" varStatus="status">
        <option value='<c:out value="${item.ID}"/>' 
          <c:if test='${item.ID==tipo_gto}'> selected </c:if>>
          	<c:out value='${item.RECURSO}'/>
          </option>
      </c:forEach>
    </select>
    </div>
    </strong></td>
    <td ><input name="status" type="checkbox" id="status"  value="3" <c:if test="${fn:contains(status,'3')}">checked</c:if>
      >Aprobado</td>
    <td ><input type="checkbox" name="status" id="status"  value="2" <c:if test="${fn:contains(status,'2')}" >checked</c:if>>
      &nbsp;Cancelado</td>
    <td rowspan="3" ><br/><br/>
      <table width="300" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td>
          <div class="buttons tiptip"><button name="btnBuscar" id="btnBuscar" type="button" class="btn btn-buscar col-md-4"><span class="label" style="width:100px">Buscar</span></button></div></td>
        </tr>
        <tr>
          <td>
          <button name="cmdpdf" id="cmdpdf" title="Mostrar listado en formato PDF" type="button" class="btn btn-imprimir col-md-4"><span class="label" style="width:100px">Imprimir PDF</span></button></td>
        </tr>
    </table></td>
  </tr>
  <tr >
    <th height="25" >Por fecha de:
    <td><strong>
    <div class="col-sm-2">
    	<input placeholder="Desde" name="fechaInicial" type="text" id="fechaInicial" maxlength="10" class="form-control input-sm" style="width:100px"  value="<c:out value='${fechaInicial}'/>">
    </div>
    <div class="col-sm-2">
    	<input type="text" name="fechaFinal" id="fechaFinal" value="${fechaFinal}" size="12"maxlength="10" class="form-control input-sm" style="width:100px"  id="inputKey" placeholder="Hasta">
     </div>
    </strong></td>
    <td colspan="2" ><input type="checkbox" name="verUnidad" id="verUnidad" value="1"<c:if test='${verUnidad==1}'>  checked </c:if> >Incluir documentos de la unidad </td>
    </tr>
    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODOS_LOS_DOCUMENTOS_DE_LA_UNIDAD">
  <tr >
    <td height="25" >&nbsp; </td>
    <td height="25" ></td>
    <td height="25">&nbsp;    </td>
    <td height="25" >&nbsp;    </td>
    </tr>
       </sec:authorize>  
</table>
<br />
<table width="95%" class="listas" align="center" id="listaRequisiciones" cellpadding="0" cellspacing="0">
 <thead>
  <tr>
   	 <th width="4%"><input type="checkbox" name="todos" id="todos"></th>
    <th width="6%">Número</th>
    <th width="6%">Fecha</th>    
    <th width="48%">Beneficiario</th>
    <th width="9%">Tipo</th>
    <th width="9%">Estado</th>
    <th width="10%">Importe</th>    
    <th width="5%">Opciones</th>
  </tr>
   </thead>   
<tbody>  
<c:set var="cont" value="${0}" />
<c:forEach items="${vales}" var="item" varStatus="status"> 
  <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
 	   <td align="center" style="border-left:none">
    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_VALES">
        <c:if test='${item.STATUS==1|| item.STATUS == 0}'>
            <input alt="<c:out value='${item.CVE_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/>
        </c:if>
    </sec:authorize>
 	<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_APERTURA_DE_VALES">
    	<c:if test="${item.STATUS==0||item.STATUS==1}"><input alt="<c:out value='${item.NUM_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/></c:if>
    </sec:authorize>
     <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_APERTURA_DE_VALES">
     	<c:if test="${item.STATUS==1|| item.STATUS == 0}"><input alt="<c:out value='${item.NUM_VALE}'/>" type="checkbox" id="chkvales" name="chkvales" value="<c:out value='${item.CVE_VALE}'/>"/></c:if>
     </sec:authorize>
    </td>
    
    <td align="center" style="border-left:none"><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_VALES"><a href="javascript:subOpAdm('val', <c:out value='${item.CVE_VALE}'/>, <c:out value='${item.CVE_PERS}'/>)"></sec:authorize><c:out value='${item.NUM_VALE}'/><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_SUBMENU_ESPECIAL_EN_LISTADO_VALES"></a></sec:authorize></td>
    <td align="center" style="border-left:none"><c:out value='${item.FECHA}'/></td>
    <td style="border-left:none"><c:out value='${item.NCOMERCIA}'/></td>
    <td align="center" style="border-left:none"><c:out value='${item.TIPO_VALE}'/></td>
    <td style="border-left:none" align="center"><c:out value='${item.DESCRIPCION_ESTATUS}'/></td>
    <td align="right" style="border-left:none"><fmt:formatNumber value="${item.TOTAL}"  pattern="#,###,###,##0.00" /> </td>
    <td align="center">
	    <c:if test="${item.STATUS==2}"><img src="../../imagenes/pdf2.png" alt="" border="0" width="14" height="16"></c:if>
	 	<c:if test="${item.STATUS!=2}"><img style="cursor:pointer" src="../../imagenes/pdf.gif" alt="Ver Documento" border="0" width="14" height="16" onClick="getReporteVale<c:if test="${item.TIPO eq 'AO'}"><sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_ANEXO_VALES">Anexo</sec:authorize></c:if>(<c:out value='${item.CVE_VALE}'/>)"></c:if>
	    <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL">
	        <c:if test="${ item.STATUS == 0}">  
	        	<img src="../../imagenes/page_white_edit.png" alt="Editar / Abrir" style="cursor:pointer" onClick="editarVale(<c:out value='${item.CVE_VALE}'/>)">
	        </c:if>
	        <c:if test='${item.STATUS!=0}'>
	        	<img src="../../imagenes/page_gray_edit.png">
	        </c:if>
	    </sec:authorize>
	    <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_CANCELAR_VALES">
	            <c:if test='${item.STATUS==1 || item.STATUS==0}'>
	                <img style="cursor:pointer" src="../../imagenes/cross.png" title="Cancelar" border="0" width="16" height="16" onClick="cancelarVale(<c:out value='${item.CVE_VALE}'/>)">     
	            </c:if>
	            <c:if test='${item.STATUS!=1&&item.STATUS!=0}'>
	                <img src="../../imagenes/cross2.png" border="0" width="16" height="16">     
	            </c:if>
	    </sec:authorize>
    </td>
  </tr>

  <c:set var="cont" value="${cont+1}" />
  </c:forEach> 
     </tbody>  
</table>
<!-- Tipo de Gasto-->
  <div class="row">
     <div class="form-group">
      <div class="col-sm-6 form-group">
     <c:if test="${fn:length(vales) > 0}">  
  		<c:if test="${fn:contains(status,'1')}">
			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL"></sec:authorize>
    	    	<input type="button" name="cmdaperturar" id="cmdaperturar" class="btn btn-warning " value="Aperturar" />
        </c:if>
 		<c:if test="${fn:contains(status,'0')||fn:contains(status,'1')}">
 			<sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_SOLO_IMPRESION_GENERAL"></sec:authorize>
    			<input type="button" name="cmdeliminar2" id="cmdeliminar2" class="btn btn-danger" value="Cancelar" />
	    </c:if>
  	</c:if>  
  	</div>           
    </div>
 </div>

 
</form>
</body>
</html>
