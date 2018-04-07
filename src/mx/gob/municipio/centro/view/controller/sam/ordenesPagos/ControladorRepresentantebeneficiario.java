package mx.gob.municipio.centro.view.controller.sam.ordenesPagos;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayRepresentante;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/sam/ordenesdepago/representante.action")
public class ControladorRepresentantebeneficiario extends ControladorBase {
	
	public final static  int VER_TODAS_LAS_UNIDADES = 25;
	
	private static Logger log = 
	        Logger.getLogger(ControladorRepresentantebeneficiario.class.getName());
	
	
	@Autowired 
	private GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired 
	private GatewayRepresentante gatewayRepresentante;
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	
		
	public ControladorRepresentantebeneficiario() {}
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})      
	public String  requestGetControlador( Map modelo, HttpServletRequest request, HttpServletResponse response ) {
		Date fecha = new Date();
				
		String clv_benefi= request.getParameter("cboprestadorservicio");
		String unidad= request.getParameter("cbodependencia")== null ? request.getParameter("cbodependencia"): "";
		//Integer unidad = request.getParameter("cbodependencia")== null ? Integer.parseInt(request.getParameter("cbodependencia")): 0;
		String responsable= request.getParameter("responsable")== null ? request.getParameter("responsable"): "";
		String rfc=request.getParameter("rfc");
		String fecha_bajar= request.getParameter("fecha_bajar")== null ? request.getParameter("fecha_bajar"): "";
		String representante= request.getParameter("replegal")== null ? request.getParameter("replegal"): "";
		
				
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("responsable", responsable);
		modelo.put("rfc", rfc);
		modelo.put("fecha_bajar", fecha_bajar);
		modelo.put("replegal", representante);
		modelo.put("fecha", fecha);
		//id_beneficiario,cbUnidad,responsable,replegal,rfc
		
		//modelo.put("clv_representante",gatewayRepresentante.getRepresentante(0));
		
		modelo.put("listadomovimientos",this.gatewayRepresentante.getreparametros(modelo));
		
		return "sam/ordenesdepago/representante.jsp";
		
	}
	
		public Long guardarRepresentantes (String tipo, String clv_benefi, String unidad, String titular,String representante, Date fecha_bajar,  String rfc){
		return gatewayRepresentante.guardaRepresentantes(tipo, clv_benefi, titular,unidad,representante,fecha_bajar,rfc);
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
