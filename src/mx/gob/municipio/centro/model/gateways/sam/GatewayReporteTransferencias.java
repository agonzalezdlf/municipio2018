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
		int ejercicio = cal.get(Calendar.YEAR);
		int mesActual = gatewayMeses.getMesActivo(ejercicio);
		
		String sql = " SELECT dbo.getClaveProgramatica(A.ID_PROYECTO,A.CLV_PARTID) AS CLV_PROGRAMATICA, /*A.ADECUACION,*/ CT.ID_DEPENDENCIA, A.CLV_PARTID, CP.PARTIDA, CP.CLV_CAPITU, A.ID_RECURSO, VP.CLV_RECURSO, VP.RECURSO, A.ID_PROYECTO, VP.K_PROYECTO_T, CT.DECRIPCION, /*AM.MOTIVO,*/ SUM(A.AMPLIACION)AMPLIADO,SUM(A.REDUCCION)REDUCIDO " +
					 " FROM ADEC_MOV_A A " +
					 " 		INNER JOIN ADECUA_A AM ON AM.ADECUACION=A.ADECUACION AND A.ID_RECURSO=AM.ID_RECURSO " +
					 " 		LEFT JOIN CEDULA_TEC CT ON CT.ID_PROYECTO=A.ID_PROYECTO " +
					 "		LEFT JOIN CAT_PARTID CP ON CP.CLV_PARTID = A.CLV_PARTID	" +
					 "		LEFT JOIN VPROYECTO VP ON VP.ID_PROYECTO = A.ID_PROYECTO " +
					 " WHERE A.ADECUACION NOT LIKE 'CIE%' AND A.ADECUACION NOT LIKE 'MI%' AND A.ADECUACION NOT LIKE 'AL%' AND A.ADECUACION NOT LIKE 'RL%' AND REQ_AC=1 ";
					
		if(!modelo.get("mes").toString().equals("0"))
			sql += " AND MONTH(AM.FE_ADECUAC) = :mes ";
		
		if(!modelo.get("idtipogasto").toString().equals("0"))
			sql += " AND A.ID_RECURSO = :idtipogasto ";
		
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
		
		sql += "GROUP BY A.ID_RECURSO,CT.ID_DEPENDENCIA, A.CLV_PARTID, CP.PARTIDA, VP.CLV_RECURSO, VP.RECURSO, CP.CLV_CAPITU, /*A.ADECUACION,*/ A.ID_PROYECTO, VP.K_PROYECTO_T, CT.DECRIPCION/*, AM.MOTIVO*/";
			
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
}
