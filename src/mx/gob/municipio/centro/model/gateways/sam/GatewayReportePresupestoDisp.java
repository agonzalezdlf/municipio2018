package mx.gob.municipio.centro.model.gateways.sam;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;

import mx.gob.municipio.centro.model.bases.BaseGateway;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;

public class GatewayReportePresupestoDisp extends BaseGateway{

	private static Logger log = Logger.getLogger(GatewayReportePresupestoDisp.class.getName());
	
	@Autowired
	public GatewayProyectoPartidas gatewayProyectoPartidas;
	
	@Autowired
	private GatewayMeses gatewayMeses;
	
	public GatewayReportePresupestoDisp() {
		// TODO Auto-generated method stub
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Map> getreparametros(Map modelo){
		
		Date fecha = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(fecha);
		int ejercicio = cal.get(Calendar.YEAR);
		int mesActual = gatewayMeses.getMesActivo(ejercicio);
		/*String sql = " SELECT VP.ID_RECURSO,VP.RECURSO,VP.ID_DEPENDENCIA,VP.DEPENDENCIA,VT_AUTOEVALUACION.ID_PROYECTO,  VT_AUTOEVALUACION.DECRIPCION, VT_AUTOEVALUACION.CLV_PARTID, PARTIDA, VT_AUTOEVALUACION.CLV_CAPITU, " +
					 " SUM(INICIAL) AS INICIAL, " +
					 " SUM(PRESUPUESTO) AS PRESUPUESTO, " +
					 "SUM(COMPROMETIDO) AS COMPROMETIDO, " +
				     "SUM(DEVENGADO) AS DEVENGADO, " +
				 	 "SUM(EJERCIDO) AS EJERCIDO, " +
				     "SUM(dbo.getPrecomprometidoAnual(VP.ID_PROYECTO,VT_AUTOEVALUACION.CLV_PARTID)) AS PRECOMPROMISO " +
				     "FROM VT_AUTOEVALUACION INNER JOIN VPROYECTO AS VP ON VP.ID_PROYECTO  = VT_AUTOEVALUACION.ID_PROYECTO " +
				     "LEFT JOIN VT_COMPROMISOS VC ON VC.ID_PROYECTO=VT_AUTOEVALUACION.ID_PROYECTO AND VT_AUTOEVALUACION.CLV_PARTID=VC.CLV_PARTID AND VC.CONSULTA LIKE 'PRECOMPROM%' " +
				     " WHERE 0=0 ";
		
		*/
		
		String sql = "SELECT " +
				"VP.ID_RECURSO," +
				"VP.RECURSO," +
				"VP.ID_DEPENDENCIA, "+
				"VP.DEPENDENCIA," +
				"VT_AUTOEVALUACION.ID_PROYECTO," +  
				"VT_AUTOEVALUACION.DECRIPCION," + 
				"VT_AUTOEVALUACION.CLV_PARTID," + 
				"PARTIDA," + 
				"VT_AUTOEVALUACION.CLV_CAPITU," +  
				"SUM(INICIAL) AS INICIAL, " +
				"dbo.getInical(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID) AS INICIAL_," + 
				"SUM(PRESUPUESTO) AS PRESUPUESTO," + 
				"dbo.getAutorizado(" + mesActual + "," + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID) AS PRESUPUESTO_, " +
				"SUM(COMPROMETIDO) AS COMPROMETIDO, " +
				"dbo.getComprometido(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID) AS COMPROMETIDO_," +
				"SUM(DEVENGADO) AS DEVENGADO, " +
				"dbo.getDevengado(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID) AS DEVENGADO_," +
				"SUM(EJERCIDO) AS EJERCIDO, " +
				"dbo.getEjercido(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID) AS EJERCIDO_," +
				"dbo.getPrecomprometido(" + mesActual + ", VP.ID_PROYECTO,VT_AUTOEVALUACION.CLV_PARTID) AS PRECOMPROMISO, " +
				"0 AS DISPONIBLE " +
			"FROM VT_AUTOEVALUACION " +
				"INNER JOIN VPROYECTO AS VP ON VP.ID_PROYECTO  = VT_AUTOEVALUACION.ID_PROYECTO " +
			"WHERE 0=0 ";
			
		if(!modelo.get("idtipogasto").toString().equals("0"))
			sql += " AND ID_RECURSO = :idtipogasto ";
		
		if(modelo.get("idUnidad")!=null)
			if(!modelo.get("idUnidad").toString().equals("0"))
				sql += " AND VP.ID_DEPENDENCIA = :idUnidad ";
		
		if(modelo.get("idproyecto")!=null)
			if(!modelo.get("idproyecto").toString().equals(""))
				sql += " AND VP.ID_PROYECTO = :idproyecto ";
		
		if(modelo.get("idcapitulo")!= null)
			if(!modelo.get("idcapitulo").toString().equals("") && !modelo.get("idcapitulo").toString().equals("0"))
				sql += " AND VT_AUTOEVALUACION.CLV_CAPITU = :idcapitulo ";
		
		if(modelo.get("idpartida")!=null)
			if(!modelo.get("idpartida").equals("") && !modelo.get("idpartida").equals("0"))
				sql += " AND VT_AUTOEVALUACION.CLV_PARTID = :idpartida ";
		
		//sql += "GROUP BY VP.ID_RECURSO,VP.RECURSO,VP.ID_DEPENDENCIA,VP.DEPENDENCIA, VT_AUTOEVALUACION.ID_PROYECTO, VT_AUTOEVALUACION.DECRIPCION, VT_AUTOEVALUACION.CLV_PARTID, PARTIDA, INICIAL, PRESUPUESTO, COMPROMETIDO, DEVENGADO, EJERCIDO, VT_AUTOEVALUACION.CLV_CAPITU  ORDER BY VP.ID_RECURSO,VP.RECURSO,VP.ID_DEPENDENCIA,VT_AUTOEVALUACION.ID_PROYECTO";
		sql += "GROUP BY " +
				"dbo.getInical(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID)," +
				"dbo.getAutorizado(" + mesActual + "," + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID)," +
				"dbo.getComprometido(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID)," +
				"dbo.getDevengado(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID)," +
				"dbo.getEjercido(" + mesActual + ", VP.ID_PROYECTO, VT_AUTOEVALUACION.CLV_PARTID)," +
				"dbo.getPrecomprometido(" + mesActual + ", VP.ID_PROYECTO,VT_AUTOEVALUACION.CLV_PARTID)," +
				"VP.ID_RECURSO,VP.RECURSO,VP.ID_DEPENDENCIA,VP.DEPENDENCIA, VT_AUTOEVALUACION.ID_PROYECTO, VT_AUTOEVALUACION.DECRIPCION, VT_AUTOEVALUACION.CLV_PARTID, PARTIDA, INICIAL, PRESUPUESTO, COMPROMETIDO, DEVENGADO, EJERCIDO, VT_AUTOEVALUACION.CLV_CAPITU " +  
			"ORDER BY VP.ID_RECURSO,VP.RECURSO,VP.ID_DEPENDENCIA,VT_AUTOEVALUACION.ID_PROYECTO";
		
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
		
	}
	
}
