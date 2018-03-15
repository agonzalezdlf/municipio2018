package mx.gob.municipio.centro.view.controller.sam.ordenesPagos;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayOrdenDePagos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/sam/ordenesdepago/lst_OPenprogramacion.action")
public class ControladorLst_OPenprogramacion extends ControladorBase{

	
	private static Logger log = Logger.getLogger(ControladorLst_OPenprogramacion.class.getName());
	public ControladorLst_OPenprogramacion() {
		// TODO Auto-generated method stub

	}
	
	@Autowired
	private GatewayUnidadAdm gatewayUnidadAdm;
	@Autowired
	GatewayOrdenDePagos gatewayOrdenDePagos;
	
	@SuppressWarnings("unchecked")	
	@RequestMapping(method = {RequestMethod.GET, RequestMethod.POST})  
	public String  requestGetControlador( Map modelo, HttpServletRequest request ) {
		int mes = request.getParameter("mes")==null ?1 : Integer.parseInt(request.getParameter("mes"));
		int listado = 0;
		modelo.put("mes", request.getParameter("mes")==null ? "1": request.getParameter("mes"));
				
		modelo.put("lst_OPenprogramacion", this.ordenesPagoDesejercer(Integer.parseInt(modelo.get("mes").toString())));
	    return "sam/ordenesdepago/lst_OPenprogramacion.jsp";
	}
	
	public List<Map> ordenesPagoDesejercer(int mes){
		return this.gatewayOrdenDePagos.getListadoOrdenesPagoenProgramacion(mes, this.getSesion().getEjercicio());
	}
	
		//Validación de la OP por la recepción, cuando esta ingresa a la Direccón de Programación
		public void fechaValidacionOrdenPago(final List<Long> lst_ordenes, final String fecha){
			try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {
	                	for (Long cve_op :lst_ordenes) {	                		
	               		 gatewayOrdenDePagos.ingresoOPProgramacion(cve_op, fecha, getSesion().getEjercicio(), getSesion().getIdUsuario());
	                	}
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("La Operacion de Validacion en Ordenes de Pago Ejercidas ha fallado");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }
	                
		}
		//
		//Validación de la OP por la devolución, cuando esta es regresada por la Direccón de Programación
		public void DevolucionOP(final List<Long> lst_ordenes, final String fecha){
			try {                 
	            this.getTransactionTemplate().execute(new TransactionCallbackWithoutResult(){
	                @Override
	    protected void   doInTransactionWithoutResult(TransactionStatus status) {
	                	for (Long cve_op :lst_ordenes) {	                		
	               		 gatewayOrdenDePagos.ingresoOPProgramacion(cve_op, fecha, getSesion().getEjercicio(), getSesion().getIdUsuario());
	                	}
	                } });
	                } catch (DataAccessException e) {            
	                    log.info("La Operacion de Validacion en Ordenes de Pago Ejercidas ha fallado");	                    
	                    throw new RuntimeException(e.getMessage(),e);
	                }
	                
		}
}
