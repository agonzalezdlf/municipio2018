/**
 * @author ISC. Israel de la Cruz.
 * @version 2.0
 *@Date 09/02/2012
 */
package mx.gob.municipio.centro.view.controller.sam.utilerias;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sam/utilerias/lst_proveedores.action")
public class ControladorListadoBeneficiarios extends ControladorBase {
	private static Logger log = 
	        Logger.getLogger(ControladorListadoBeneficiarios.class.getName());
	
	
	@Autowired
	public GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	
	
	public ControladorListadoBeneficiarios() {}
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})       
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		String ncomercia = (request.getParameter("txtprestadorservicio")!=null) ? request.getParameter("txtprestadorservicio"): "";
		String rfc = (request.getParameter("txtrfc")!=null) ?request.getParameter("txtrfc"):"";
		String vigencia = (request.getParameter("vigencia")!=null) ? request.getParameter("vigencia"):"";
		Integer tipo = (request.getParameter("cbotipo")!=null)? Integer.parseInt(request.getParameter("cbotipo").toString()): 0;
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String beneficiario=request.getParameter("cboprestadorservicio");//beneficiario
		String unidad=request.getParameter("cbodependencia")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		
		modelo.put("txtprestadorservicio", ncomercia);
		modelo.put("txtrfc", rfc);
		modelo.put("vigencia", (vigencia.equals("on"))? "1":"0");
		modelo.put("cbotipo", tipo);
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		
		List <Map> m = gatewayBeneficiario.getListadoBeneficiarios(ncomercia, rfc, tipo, (vigencia.equals("on"))? "1":"0");
		
		modelo.put("CONTADOR", m.size());
		modelo.put("beneficiarios", m);
		return "sam/utilerias/lst_proveedores.jsp";
	}
	
	public void deshabilitarBeneficiario(Long idBeneficiario){
		gatewayBeneficiario.deshabilitarBeneficiario(idBeneficiario);
	}
	
	public void habilitarBeneficiario(Long idBeneficiario){
		gatewayBeneficiario.habilitarBeneficiario(idBeneficiario);
	}

	@ModelAttribute("beneficiarios")
	public List<Map>getBeneficiarios(){
		return (List<Map>) gatewayBeneficiario.getListaBeneficiarios();
	}
	
	@ModelAttribute("unidadesAdmiva")
    public List<Map> getUnidadesAdmivas(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }
	
}
