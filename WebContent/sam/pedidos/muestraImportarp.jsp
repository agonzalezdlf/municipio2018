<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title></title>

<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css"/>
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
<script type="text/javascript" src="../../include/js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap-select.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css">
<script type="text/javascript" src="../../include/js/sweetalert2/7.0/sweetalert2.all.js"></script>

<link rel="stylesheet" href="../../include/js/sweetalert2/7.0/sweetalert2.min.css" type="text/css">
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/bootstrap-select.js"></script>

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
<script>
	//alert('Clave de la requisicion cargada desde Captura de pedidos: '+cve_req);
	/*$("#checkall").change(function () {
      $("input:checkbox").prop('checked', $(this).prop("checked"));
  	});*/
  	//onClick="setCheckAll('chklotes')"
  
  	//Checkbox para seleccionar toda la lista.... Abraham Gonzalez 12/07/2016
  	$(document).ready(function() {
  		
  		$("input[name=checkall]").change(function(){
  			$('input[type=chklotes]').each( function() {			
  				if($("input[name=checkall]:checked").length == 1){
  					this.checked = true;
  				} else {
  					this.checked = false;
  				}
  			});
  		});
  		
  		$('#checkall').click( function (event){ $('input[name=chklotes]').attr('checked', this.checked); });
  	});

	
	
function cargar(){
	//alert('Clave de la requisicion cargada desde Captura de pedidos: '+cve_req);
	 //var checkStatus = [];
     //$('input[name=status]:checked').each(function() {checkStatus.push($(this).val());});	 
	 //if (checkStatus.length==0 ) {swal('','Es nercesario seleccionar un estatus','error'); return false;}
	 document.location = "muestraImportarp.action?"// num_req="+$('#txtrequisicion').val()+"&status="+checkStatus+"&idUnidad="+$('#cbodependencia').val();
}

/*
function setCheckAll(check){	
	$("input[name='"+check+"'][type='checkbox']").prop('checked', $('#checkall').is(':checked'));
	//$("input:checkbox").prop('checked', $(this).prop("checked"));
}*/

function cargarLotes(){
	
	var checkLotes = [];
     $('input[name=chklotes]:checked').each(function() {checkLotes.push($(this).val());});	
	 if (checkLotes.length==0 ) {swal('','Es nercesario seleccionar por lo menos un lote para continuar','error'); return false;}
	 
	 swal({
		  title: 'Es seguro?',
		  text: '¿Confirma que desea cargar nuevos lotes al pedido actual?',
		  showCancelButton: true,
		  confirmButtonText: 'Sí, gaurdar!',
		  cancelButtonText: 'No, abortar!'
		}).then((result) => {
		  if (result.value  ) {
			  
			  window.parent.CargarLotesNuevos(checkLotes);
		
		  } else if (result.dismiss === swal.DismissReason.cancel) {
		    swal('Cancelado','Los lotes no se sincronizaron','error');
		  }
		})
}

</script>
</head>
<body> 
<form  action="muestraImportarp.action" method="post" id="forma" name="forma"> 
<!--  
<c:if test='${accion==null}'>
<table style="width:95%; align:center">
  <tr>
    <td><h1>Listado de  Requisiciones
      <c:out value='${desMes}'/>
    de la Unidad</h1></td>
  </tr>
</table>
<table class="listas" style="width:95%; cellspacing:2; cellpadding:1;align:center;border:0; ">
  <tr bgcolor="#889FC9">
    <td height="32" colspan="4" align="left">Unidad Administrativa: <sec:authorize ifNotGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
      <c:out value="${nombreUnidad}"/> 
      <input type="hidden" name="cbodependencia" id="cbodependencia" value='<c:out value="${idUnidad}"/>' />
      </sec:authorize>
      <sec:authorize ifAllGranted="ROLE_Sam_PRIVILEGIOS_VER_TODAS_LAS_UNIDADES">
        <select name="cbodependencia" class="comboBox" id="cbodependencia" style="width:480px">
          <option value="0">[Todas la Unidades Administrativas]</option>
          <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
            <option value='<c:out value="${item.ID}"/>' 
                        <c:if test='${item.ID==idUnidad}'> selected </c:if>>
            <c:out value='${item.DEPENDENCIA}'/>
            </option>
            </c:forEach>
          </select>
        </sec:authorize>
      </td>
  </tr>
  <tr bgcolor="#889FC9">
    <td height="31" colspan="4" align="left" valign="middle">Numero de Documento: 
      <input type="text" id="txtrequisicion" class="input" style="width:150px" value="<c:out value='${num_req}'/>" maxlength="16" onblur="upperCase(this)"/> 
      <input type="checkbox" value="1" id="status" name="status" <c:if test="${fn:contains(status,'1')}">checked</c:if>/>
      Cerrados 
        <input type="checkbox" value="2" id="status" name="status" <c:if test="${fn:contains(status,'2')}">checked</c:if>/>
      En proceso 
      <input type="checkbox" value="5" id="status" name="status" <c:if test="${fn:contains(status,'5')}">checked</c:if>/>
      Finiquitadas 
      <input type="button" value="Buscar todo" id="cmdbuscar" class="botones" onclick="cargar()" /></td>
  </tr>
  <tr bgcolor="#889FC9">
    <th width="15%" height="21" align="center">Num. Documento</th>
    <th width="10%" height="21" align="center">Programa / Partida</th>
    <th width="64%" height="21" align="center">Concepto</th>
    <th width="11%" align="center">Importe</th>
  </tr>
   <c:set var="cont" value="${0}" />
  <c:forEach items="${documentos}" var="item" varStatus="status" >
    <c:set var="cont" value="${cont+1}" /> 
    <tr>
      <td width="15%" height="20" align="left"><a href="muestraImportarp.action?accion=lotes&cve_req=<c:out value='${item.CVE_REQ}'/>&num_req=<c:out value='${item.NUM_REQ}'/>"><c:out value='${item.NUM_REQ}'/></a></td>
      <td height="20" align="center"><c:out value='${item.N_PROGRAMA}'/>
      / <c:out value='${item.CLV_PARTID}'/></td>
      <td width="64%" height="20" align="left"><c:out value='${item.OBSERVA}'/></td>
      <td width="11%" height="20" align="right">$<fmt:formatNumber value='${item.IMPORTE}' pattern="###,###,###.00"/>&nbsp;</td>
      <input type="hidden" value="<c:out value='${item.CVE_CONTRATO}'/>" id="hdcontrato<c:out value='${item.CVE_PED}'/>">
      </tr>
  </c:forEach>
</table>
</c:if>
-->


  <table width="95%" align="center">
    <tr>
    <td><h1>Lotes de la Requisición <strong>
    <c:out value='${num_req}'/></strong></h1></td>
  </tr>
  <tr>
    <td><input type="button" value="Regresar" id="cmdregresar" class="botones" onClick="history.go(-1)" />
      <input type="button" value="Cargar lotes" id="cmdcargar1" class="botones" onClick="cargarLotes()" /></td>
  </tr>
</table>
<table border="0" align="center" cellpadding="1" cellspacing="1" width="95%" class="listas">
  <tr bgcolor="#DBDBDB">
    <th width="3%" height="20" align="left" bgcolor="#C1C1C1"><input type="checkbox" id="checkall" value="0" name="checkall"/>
    <th width="5%" align="left" bgcolor="#C1C1C1">Cons.    
    <th width="49%" height="20" align="left" bgcolor="#C1C1C1">Concepto&nbsp;
    <th width="10%" align="left" bgcolor="#C1C1C1">Cantidad    
        <th width="10%" align="left" bgcolor="#C1C1C1">Unidad    
        <th width="12%" height="16%" align="center" bgcolor="#C1C1C1">Precio Unit.</th>
    <th width="11%" height="16%" align="center" bgcolor="#C1C1C1">&nbsp;Importe</th>
    </tr>
    <c:set var="cont" value="${0}" />
  <c:forEach items="${movimientos}" var="item" varStatus="status" >
    <tr bgcolor="#DBDBDB">
      <td height="16%" align="center"><input type="checkbox" id="chklotes" name="chklotes" value="<c:out value='${item.ID_REQ_MOVTO}'/>"/></td>
      <td height="16%" align="center"><c:out value='${item.REQ_CONS}'/></td>
      <td align="left"><c:out value='${item.ARTICULO}'/>
        (
        <c:out value='${item.NOTAS}'/>
        )</td>
      <td height="16%" align="center"><fmt:formatNumber value='${item.CANTIDAD}' pattern="#####"/></td>
      <td height="16%" align="center"><c:out value='${item.UNIDAD}'/></td>
      <td height="16%" align="center">$
        <fmt:formatNumber value='${item.PRECIO_EST}' pattern="###,###,###.00"/></td>
      <td height="16%" align="right">$
        <fmt:formatNumber value='${item.IMPORTE}' pattern="###,###,###.00"/></td>
      </tr>
      <c:set var="cont" value="${cont+1}" /> 
  </c:forEach>
  </table>


</form>
</body>
</html>