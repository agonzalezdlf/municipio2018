/**
 * @author Lsc. Mauricio Hernandez Leon.
 * @version 1.0
 *
 */
package mx.gob.municipio.centro.view.controller.sam.ordenesPagos;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBancos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/sam/ordenesdepago/beneficiario.action")
public class ControladorBeneficiario extends ControladorBase  {
	private static Logger log = 
        Logger.getLogger(ControladorBeneficiario.class.getName());

	@Autowired GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired GatewayBancos gatewayBancos;
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	
	
	public ControladorBeneficiario() {}
	 
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})      
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		
		Long  id = (request.getParameter("id")!=null)? Long.parseLong(request.getParameter("id").toString()): 0;
		String tipo =request.getParameter("tipo"); 
		modelo.put("tipo", tipo);
		modelo.put("id", id);
		modelo.put("beneficiario", getBeneficiario(id));
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		
	    return "sam/ordenesdepago/beneficiario.jsp";
	}   
	    
	public  void   eliminarBenificiario(final List<Long> beneficiarios){
		 try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {	                	
	                	for (Long idBeneficiario :beneficiarios)
	                		gatewayBeneficiario.eliminar(idBeneficiario);	                			                	
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("Los registros tienen relaciones con otras tablas ");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }	
	}
	
	
	public Map<String, String> getBeneficiario (Long idBeneficiario){
		return gatewayBeneficiario.getBeneficiario(idBeneficiario);
		
	}
	
	/*
	public  Map getBeneficiario(Long idBeneficiario){
		return gatewayBeneficiario.getBeneficiario(idBeneficiario);
	}*/
	
	public  List getBeneficiariosHijos(String idBeneficiario){
		return gatewayBeneficiario.getBeneficiariosTodosHijos(idBeneficiario);
	}
	
	public  List getBeneficiarios(String razonSocial){
		return gatewayBeneficiario.getBeneficiariosPorEjemplo(razonSocial);
	}

	public Long guardarBeneficiario(Long clave,String razonSocial,String responsable,String responsable2,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,String clabeb, String fecha_altab,String fecha_bajab ){
		return gatewayBeneficiario.actualizarPrincipal(clave,razonSocial,responsable,responsable2,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,this.formatoFecha(fecha_altab),this.formatoFecha(fecha_bajab));
	}
	
	@ModelAttribute("bancos")
	public List<Map> getListaBancos(){
		return gatewayBancos.getBancosTodos();
	}
	

	@ModelAttribute("beneficiarios")
	public List<Map>getBeneficiarios(){
		return  gatewayBeneficiario.getListaBeneficiarios();
	}
	
	
	@RequestMapping(value = "/get_benefi_list", method = RequestMethod.GET, params="Accept=*/*")
	public @ResponseBody List<String> getCountryList(@RequestParam("term") String query) {
			List<String> BenefiList = gatewayBeneficiario.getBenefiList(query);
			
			return BenefiList;
	}
}
