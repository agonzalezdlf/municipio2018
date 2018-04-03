package mx.gob.municipio.centro.view.controller.sam.reportes;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import mx.gob.municipio.centro.model.gateways.sam.GatewayPlanArbit;
import mx.gob.municipio.centro.model.gateways.sam.GatewayReporteTransferencias;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

@Controller
@RequestMapping("/sam/reportes/lst_reportetransferencia.action")
public class ControladorReporteTransferencias extends ControladorBase {

	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	private GatewayPlanArbit gatewayPlanArbit;
	
	@Autowired
	private GatewayReporteTransferencias gatewayReporteTransferencias;
	
	public ControladorReporteTransferencias() {
		// TODO Auto-generated method stub

	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response) {
		String idUnidad=request.getParameter("cbUnidad")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbUnidad");
		Integer tipogasto = request.getParameter("cbotipogasto") != null ? Integer.parseInt(request.getParameter("cbotipogasto")): 0;
		Integer tipoAdecuacion = request.getParameter("cboadecuacion")!= null ? Integer.parseInt(request.getParameter("cboadecuacion")): 0;
		//String idpartida = request.getParameter("txtpartida")!= null ? request.getParameter("txtpartida"): "";
		//Integer clv_capitulo = request.getParameter("cbocapitulo")!= null ? Integer.parseInt(!request.getParameter("cbocapitulo").toString().equals("") ? request.getParameter("cbocapitulo").toString(): "0"): 0;
		Integer NumMesAct = request.getParameter("cbomes")!= null ? Integer.parseInt(!request.getParameter("cbomes").toString().equals("") ? request.getParameter("cbomes").toString(): "0"): 0;
		
		Map MesActual = this.GetMesActual();
		modelo.put("mes", (NumMesAct!=0 ? NumMesAct:MesActual.get("MES")));
		modelo.put("mesActivo", MesActual.get("DESCRIPCION"));
		modelo.put("idUnidad",idUnidad);
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("idtipogasto",tipogasto);
		modelo.put("tipoAdecuacion", tipoAdecuacion);
		//modelo.put("idproyecto",(idproyecto == 0 ? "": idproyecto));
		//modelo.put("idpartida",idpartida);
		//modelo.put("idcapitulo", clv_capitulo);
		
		modelo.put("listadotransferencias",this.gatewayReporteTransferencias.getreparametros(modelo));
		
		return "sam/reportes/lst_reportetransferencia.jsp";
	}
	
	@ModelAttribute("unidadesAdmiva")
	public List<Map> getUnidadesAdmivas(){
	   	return gatewayUnidadAdm.getUnidadAdmTodos();	
	}
	
	@ModelAttribute("tipodeGasto")
    public List<Map> getTiposDeGasto(){
    	return gatewayPlanArbit.getTipodeGasto();
    }
	@ModelAttribute("capitulos")
    public List<Map> getCapitulos(){
    	return gatewayUnidadAdm.getCapitulos();	
    }
}