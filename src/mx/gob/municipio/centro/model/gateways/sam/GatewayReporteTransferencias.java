package mx.gob.municipio.centro.model.gateways.sam;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;

public class GatewayReporteTransferencias extends BaseGateway {

private static Logger log = Logger.getLogger(GatewayReporteTransferencias.class.getName());
	
	@Autowired
	public GatewayProyectoPartidas gatewayProyectoPartidas;
	
	@Autowired 
	public GatewayMeses gatewayMeses;
	
	public GatewayReporteTransferencias() {
		// TODO Auto-generated method stub
	}
	
	@SuppressWarnings("unchecked")
	public List<Map> getreparametros(Map modelo){
		Date fecha = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(fecha);
		String adecuacion = "";
		int ejercicio = cal.get(Calendar.YEAR);
		int mesActual = gatewayMeses.getMesActivo(ejercicio);
		String sql = "SELECT * FROM VT_SAM_ADECUACIONES WHERE 0 = 0 ";

		if(!modelo.get("mes").toString().equals("0"))
			sql += " AND MES = :mes ";
		
		if(!modelo.get("idtipogasto").toString().equals("0"))
			sql += " AND ID_RECURSO = :idtipogasto ";
		
		/*
		//AMPLIACIONES
		if(modelo.get("tipoAdecuacion").toString().equals("1"))
			sql += " AND TIPO = 'AMPLIACION LIQUIDA' ";
		
		//REDUUCCIONES
		if(modelo.get("tipoAdecuacion").toString().equals("2"))
			sql += " AND TIPO = 'REDUCCION LIQUIDA' ";
		
		//TRANSFERENCIA
		if(modelo.get("tipoAdecuacion").toString().equals("3"))
			sql += " AND TIPO = 'TRANSFERENCIA' ";
			*/
		
		if (modelo.get("tipoAdecuacion").toString().contains("0")) //STATUS = TODOS
			sql += " AND TIPO IN('AMPLIACION LIQUIDA','REDUCCION LIQUIDA','TRANSFERENCIA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("1"))
			sql += " AND TIPO IN('AMPLIACION LIQUIDA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("2"))
			sql += " AND TIPO IN('REDUCCION LIQUIDA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("3"))
			sql += " AND TIPO IN('TRANSFERENCIA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("1,2"))
			sql += " AND TIPO IN('AMPLIACION LIQUIDA','REDUCCION LIQUIDA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("1,3"))
			sql += " AND TIPO IN('AMPLIACION LIQUIDA','TRANSFERENCIA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("2,1"))
			sql += " AND TIPO IN('REDUCCION LIQUIDA','AMPLIACION LIQUIDA') ";
		else if (modelo.get("tipoAdecuacion").toString().equals("2,3"))
			sql += " AND TIPO IN('REDUCCION LIQUIDA','TRANSFERENCIA') ";
		/*
		if(modelo.get("idUnidad")!=null)
			if(!modelo.get("idUnidad").toString().equals("0"))
				sql += " AND CT.ID_DEPENDENCIA = :idUnidad ";
		
		if(modelo.get("idproyecto")!=null)
			if(!modelo.get("idproyecto").toString().equals(""))
				sql += " AND A.ID_PROYECTO = :idproyecto ";
		
		if(modelo.get("idcapitulo")!= null)
			if(!modelo.get("idcapitulo").toString().equals("") && !modelo.get("idcapitulo").toString().equals("0"))
				sql += " AND CP.CLV_CAPITU = :idcapitulo ";
		
		if(modelo.get("idpartida")!=null)
			if(!modelo.get("idpartida").equals("") && !modelo.get("idpartida").equals("0"))
				sql += " AND A.CLV_PARTID = :idpartida ";

		*/
		sql += " ORDER BY RECURSO, TIPO ASC ";
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
}
