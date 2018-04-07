/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.vales;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayCedulasTecnicas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.GatewayVales;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sam/vales/cap_vale.action")
public class ControladorVales extends ControladorBase {

	public ControladorVales(){		
	}
	
	@Autowired
	public GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	public GatewayMeses gatewayMeses;
	@Autowired
	public GatewayVales gatewayVales;
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	@Autowired
	public GatewayCedulasTecnicas gatewayCedulasTecnicas;
	@Autowired
	GatewayPlanArbit gatewayPlanArbit;
	///$('#unidad2').attr('value'),
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})    
	public String  requestGetControlador( Map modelo , HttpServletRequest request, HttpServletResponse response) {
		Long clave =  request.getParameter("cve_val")==null ? null : request.getParameter("cve_val").equals("") ? null : Long.parseLong(request.getParameter("cve_val"))  ;
		modelo.put("idUnidad",this.getSesion().getClaveUnidad());
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("tiposVales",this.getTiposVales(getSesion().getIdUsuario()));
		modelo.put("CLV_BENEFI",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("ID_RECURSO",gatewayPlanArbit.getTipodeGasto());
		modelo.put("ID_DEPENDENCIA",gatewayUnidadAdm.getUnidadAdmTodos());
		modelo.put("meses",gatewayMeses.getTodosMesesEjercicioActivos(getSesion().getEjercicio()));
		
		if (clave!= null ) {			
			 Map vale = gatewayVales.getVale(clave);
			 if (vale!=null){				 
			   modelo.put("vale",vale);
			   modelo.put("idUnidad",vale.get("ID_DEPENDENCIA"));
			   modelo.put("nombreUnidad",vale.get("UNIADM"));
			   modelo.put("tipoGasto",vale.get("ID_RECURSO"));
			   modelo.put("cboUnidad2",vale.get("ID_DEPENDENCIA"));
			   modelo.put("cboBeneficiario",vale.get("CLV_BENEFI"));
			   modelo.put("regresar","SI");
			 }			
		}								
		if (this.getSesion().getIdGrupo() == null){
			modelo.put("mensaje","El usuario no tiene asignado un grupo de firmas ");
			return "insuficientes_permisos.jsp";
		}
		return "sam/vales/cap_vale.jsp";
	}
		
	@ModelAttribute("unidadesAdmiva")
    public List<Map> getUnidadesAdmivas(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }
	
	@ModelAttribute("tipodeGasto")
    public List<Map> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	
	@ModelAttribute("beneficiarios")
	public List<Map>getBeneficiarios(){
		return (List<Map>) gatewayBeneficiario.getListaBeneficiarios();
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@RequestMapping(value="/getBeneficiarios",method = RequestMethod.GET)
	public @ResponseBody
	List<Map>lstBeneficiarios(@RequestParam String ncomercia ){
		return gatewayBeneficiario.simulaSearchResult(ncomercia);
		
	}
	
	public List<Map> getTiposVales(Integer idUsuario ){
    	return this.getJdbcTemplate().queryForList(" select * from SAM_CAT_TIPO_VALE  where   ID_TIPO_VALE in  (SELECT  b.ID_TIPO_VALE  FROM SAM_GRUPO_CONFIG_USUARIO a INNER JOIN SAM_GRUPO_VALE b ON a.ID_GRUPO_CONFIG = b.ID_GRUPO_CONFIG  where a.ID_USUARIO =?   ) AND ESTATUS='ACTIVO' ", new Object []{idUsuario});	
    }

	public Long guardarVale(Long clave, int idRecurso,int cveUnidad ,String fecha,String  tipoVale,String claveBeneficiario,String justificacion,Integer mes,String fechaInicial,String fechaFinal,String fechaMaxima,String documentacion, Long cve_contrato) {
	     return gatewayVales.actualizarVales(clave,this.formatoFecha(fecha),tipoVale,claveBeneficiario,justificacion, mes,this.formatoFecha(fechaInicial),this.formatoFecha(fechaFinal),this.formatoFecha(fechaMaxima),documentacion, (cve_contrato==null ? 0:cve_contrato), this.getSesion().getEjercicio(),this.getSesion().getIdUsuario(),cveUnidad,idRecurso,this.getSesion().getIdGrupo());		
	}
	
	public String agregarConcepto(Long idDetalle, Long cve_vale, Long idproyecto, String partida, Double importe, String nota){
		return gatewayVales.agregarConcepto(idDetalle, cve_vale, idproyecto, partida, importe, nota);
	}
	
	public List<Map> getDetallesVales(Long cve_vale){
		return gatewayVales.getDetallesVales(cve_vale);
	}
	
	public void eliminarDetalles(final Long[] idDetalles, Long cve_vale){
		gatewayVales.eliminarDetalles(idDetalles, cve_vale);
	}
	
	public List<Map> getArchivosVale(Long cve_vale){
		return this.gatewayVales.getArchivosVale(cve_vale);
	}
	public void eliminarArchivoVale(Long idArchivo, HttpServletRequest request){
		gatewayVales.eliminarArchivoVale(this.getSesion().getIdUsuario(), idArchivo, request);
	}
}
