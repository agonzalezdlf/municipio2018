package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayReporteTransferencias extends BaseGateway {

private static Logger log = Logger.getLogger(GatewayReporteTransferencias.class.getName());
	
	@Autowired
	public GatewayProyectoPartidas gatewayProyectoPartidas;
	
	public GatewayReporteTransferencias() {
		// TODO Auto-generated method stub
	}
	
	@SuppressWarnings("unchecked")
	public List<Map> getreparametros(Map modelo){
		
		String sql = " SELECT A.ADECUACION,A.ID_RECURSO,A.ID_PROYECTO,CT.DECRIPCION,AM.MOTIVO,SUM(A.AMPLIACION)AMPLIADO,SUM(A.REDUCCION)REDUCIDO FROM ADEC_MOV_A A " +
					 " INNER JOIN ADECUA_A AM ON AM.ADECUACION=A.ADECUACION AND A.ID_RECURSO=AM.ID_RECURSO " +
					 " LEFT JOIN CEDULA_TEC CT ON CT.ID_PROYECTO=A.ID_PROYECTO " + 
					 " WHERE A.ADECUACION NOT LIKE 'CIE%' AND A.ADECUACION NOT LIKE 'MI%' AND A.ADECUACION NOT LIKE 'AL%' AND A.ADECUACION NOT LIKE 'RL%' AND MONTH(AM.FE_ADECUAC)=3 AND REQ_AC=1 ";
					
		/*
		if(!modelo.get("idtipogasto").toString().equals("0"))
			sql += " AND ID_RECURSO = :idtipogasto ";
		
		if(modelo.get("idUnidad")!=null)
			if(!modelo.get("idUnidad").toString().equals("0"))
				sql += " AND VP.ID_DEPENDENCIA = :idUnidad ";
		
		if(modelo.get("idproyecto")!=null)
			if(!modelo.get("idproyecto").toString().equals("0"))
				sql += " AND VP.ID_PROYECTO = :idproyecto ";
		
		if(modelo.get("idcapitulo")!= null)
			if(!modelo.get("idcapitulo").toString().equals(""))
				sql += " AND VT_AUTOEVALUACION.CLV_CAPITU = :idcapitulo ";
		
		if(modelo.get("idpartida")!=null)
			if(!modelo.get("idpartida").equals(""))
				sql += " AND VT_AUTOEVALUACION.CLV_PARTID = :idpartida ";*/
		
		//txtproyecto
		
		sql +=	 	 //"WHERE ID_PROYECO IN("+m.get("PROYECTO").toString()+")  " +
				     //"WHERE MES=1"+
				     "GROUP BY A.ID_RECURSO,A.ADECUACION,A.ID_PROYECTO,CT.DECRIPCION,AM.MOTIVO";
		
		
		
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
}
