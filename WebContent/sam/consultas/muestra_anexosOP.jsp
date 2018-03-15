<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- First include jquery js -->
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css"/>
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js?x=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>

<style type="text/css">
<!--
body {
	margin-left: 0px;
	margin-bottom: 0px;
	color:#000;
	font-size:11px;
}
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
a:active {
	text-decoration: none;
}
-->
</style>
<script language="javascript">
<!--
function cargarOSOT(num_req, cve_req, clv_benefi, total){
	window.parent.regresarOSOTFactura(num_req, cve_req, clv_benefi, total);
}
-->
</script>

</head>

<body>
<table class="table table-hover table-condensed " style="margin: 0 auto; width:95%">
  <tr bgcolor="#889FC9">
    <th width="10%" height="21" align="center">Tipo</th>
    <th width="13%" height="21" align="center">Número</th>
    <th width="27%" height="21" align="center">Nota</th>
    <th width="34%" align="center">Archivo</th>
    <th width="9%" align="center">Formato</th>
  </tr>
   <c:set var="cont" value="${0}" />
  <c:forEach items="${muestraArchivos}" var="item" varStatus="status" >
  <c:set var="cont" value="${cont+1}" /> 
	<tr>
        <td width="10%" height="20" align="center"><c:out value='${item.T_DOCTO}'/></td>
        <td height="20" align="center"><c:out value='${item.NUMERO}'/></td>
        <td width="27%" height="20" align="left"><c:out value='${item.NOTAS}'/></td>
        <td width="34%" height="20" align="left"><strong><a href='../ordenesdepago/${item.FILEPATH}${item.FILENAME}' target='_blank'>${item.FILENAME}</a></strong></td>
        <td width="9%" height="20" align="center">${item.FILETYPE}</td>
        </tr>
  </c:forEach>
   <tr>
       <td height="27" style="background:#FFF" colspan="5" align="left"><c:if test="${cont>0}"></c:if> </td>
   </tr>
      
 
</table>
</body>
</html>