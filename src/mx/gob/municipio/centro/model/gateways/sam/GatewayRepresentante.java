package mx.gob.municipio.centro.model.gateways.sam;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayRepresentante extends BaseGateway {
	
	private static Logger log = Logger.getLogger(GatewayRepresentante.class.getName());
	
	public GatewayRepresentante(){
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Map> getRepresentante(Integer tipo ){
		String sql="";
		
	    return this.getJdbcTemplate().queryForList("SELECT * FROM CAT_BENEFI_REPRES ORDER BY ID_BENEFI_CON ASC");		
	}
	
	public List<Map> getreparametros(Map modelo){
		String sql = "SELECT * FROM CAT_BENEFI_REPRES ORDER BY ID_BENEFI_CON ASC";
		
		return this.getNamedJdbcTemplate().queryForList(sql, modelo);
	}
	
	public  Long   actualizarPrincipal(Long clave,String clv_benefi,Integer id_dependencia, String titular, String repre_legal,String fecha_altar,String fecha_baja, String rfc){
		 
		if (clave == 0) 		  
			  clave = inserta(clave, clv_benefi,id_dependencia,titular,repre_legal,fecha_altar,fecha_baja,rfc);	  	  
		  else
			  actualizar(clave, clv_benefi,id_dependencia,titular,repre_legal,fecha_altar,fecha_baja,rfc);
		 return clave;
	}
	
	/*
	public Long guardarRepresentantes(Long id_presentante, String clv_benefi, String rfc ) throws Exception{
		
		if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM CAT_BENEFI_REPRES WHERE (RFC = ?)", new Object[]{rfc}) > 0)
			 
			throw new Exception("El Beneficiario ya se encuentran registrados en el sistema; actualizar la informacion.");
		
		this.getJdbcTemplate().update("INSERT INTO dbo.CAT_BENEFI_REPRES (CLV_BENEFI, ID_DEPENDENCIA, TITULAR, REPRE_LEGAL, FECHA_ALTAR, FECHA_BAJA, RFCR) VALUES"+
				   "VALUES (?,?,?,?,?,?,?)", new Object[]{clv_benefi, rfc});
		return id_presentante;
		
	}*/
	

	//AGREGAR UN NUEVO REPRESENTANTE--------------------------------------------------------------
		public Long inserta( Long clave,String clv_benefi,Integer id_dependencia, String titular, String repre_legal,String fecha_altar,String fecha_baja, String rfc){
			try
			{
				Long cveBeneficiario =(long) 1;//getNumeroBeneficiarioNuevo(tipo)+1;
				//String folio=rellenarCeros(cveBeneficiario.toString(),4);	
				if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM CAT_BENEFI_REPRES WHERE (RFC = ?)", new Object[]{rfc}) > 0)
				 
					throw new Exception("El Beneficiario ya se encuentran registrados en el sistema; actualizar la informacion.");
				
				this.getJdbcTemplate().update("INSERT INTO dbo.CAT_BENEFI_REPRES (CLV_BENEFI, ID_DEPENDENCIA, TITULAR, REPRE_LEGAL, FECHA_ALTAR, FECHA_BAJA, RFCR) VALUES"+
											   "VALUES (?,?,?,?,?,?,?)"
						, new Object[]{clv_benefi, id_dependencia, titular, repre_legal, fecha_altar, fecha_baja, rfc});
				return cveBeneficiario;
			}
			catch(Exception e){
				throw new RuntimeException(e.getMessage(),e);
			}
		}
		
		public void actualizar(Long clave,String clv_benefi,Integer id_dependencia, String titular, String repre_legal,String fecha_altar,String fecha_baja, String rfc ){	
			this.getJdbcTemplate().update("UPDATE CAT_BENEFI_REPRES  SET   CLV_BENEFI=?, ID_DEPENDENCIA=?, TITULAR=?, REPRE_LEGAL=?, FECHA_ALTAR=?,FECHA_BAJA=?, RFCR=? where ID_BENEFI_CON=? "
					, new Object[]{clave,clv_benefi,id_dependencia,rfc,titular,repre_legal,fecha_altar,fecha_baja,rfc});
		}	
		
		

		public Long guardaRepresentantes(String tipo,String clv_benefi, String unidad, String titular,String representante,Date fecha_altar, Date fecha_bajar,  String rfc ){
			
			try
			{
				Long cveBeneficiario =(long) 1;//getNumeroBeneficiarioNuevo(tipo)+1;
				//String folio=rellenarCeros(cveBeneficiario.toString(),4);	
				if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM CAT_BENEFI_REPRES WHERE (RFCR = ?)", new Object[]{rfc}) > 0)
				 
					throw new Exception("El Representante ya se encuentran registrados en el sistema; actualizar la informacion.");
				
				if (tipo.equals("PM"))
				{
					this.getJdbcTemplate().update("INSERT INTO dbo.CAT_BENEFI_REPRES (CLV_BENEFI, ID_DEPENDENCIA, TITULAR, REPRE_LEGAL, FECHA_ALTAR,FECHA_BAJA, RFCR) " +
							"VALUES (?,?,?,?,?,?,?)", new Object[]{clv_benefi,null,null,representante,fecha_altar,fecha_bajar,rfc});
					return cveBeneficiario;
				}else
					this.getJdbcTemplate().update("INSERT INTO dbo.CAT_BENEFI_REPRES (CLV_BENEFI, ID_DEPENDENCIA, TITULAR, REPRE_LEGAL, FECHA_ALTAR,FECHA_BAJA, RFCR) " +
							"VALUES (?,?,?,?,?,?,?)", new Object[]{clv_benefi,unidad,titular,null,fecha_altar,fecha_bajar,rfc});
					return cveBeneficiario;
			}
			catch(Exception e){
				throw new RuntimeException(e.getMessage(),e);
			}
			
			
		}
}
