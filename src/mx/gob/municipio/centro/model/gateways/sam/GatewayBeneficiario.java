package mx.gob.municipio.centro.model.gateways.sam;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import mx.gob.municipio.centro.model.bases.BaseGateway;

public class GatewayBeneficiario<lst_Beneficiarios> extends BaseGateway {
	
	private List<String> Beneficiarios;
	
	public GatewayBeneficiario(){
		
	}
	
	public List<Map> getBeneficiariosTodos(Integer tipo ){
		String sql="";
		
	    return this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");		
	}
	
	public Map<String, String> getBeneficiariosTodos2(Integer tipo) {
		String sql="";
		
		return (Map<String, String>) this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		
	}
	
	public List<Map> getListaBeneficiarios(){		
		  return this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");		
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, String> getBeneficiario(Long idBeneficiario) {
		// TODO Auto-generated method stub
		//private static Map<String, String> contactMap = new HashMap<String, String>();
		if(idBeneficiario!=0)
			return this.getJdbcTemplate().queryForMap("SELECT     A.CLV_BENEFI, A.CLV_BNCSUC, A.NCOMERCIA, A.BENEFICIAR, A.BENEFICIA2, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO, "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.ID_BENEFICIARIO, A.VIGENCIA, A.STATUS, A.CLABE, CONVERT(varchar(10), A.FECHA_ALTA, 103) AS FECHA_ALTA, CONVERT(varchar(10), A.FECHA_BAJA, 103) AS FECHA_BAJA,  "+
	                  " B.BANCO, B.SUCURSAL, B.PLAZA, "+
	                  " (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO "+
	                  " FROM        CAT_BENEFI AS A LEFT OUTER JOIN SAM_CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.ID_BENEFICIARIO =  ?", new Object []{idBeneficiario});
		else
			return null;
	}
	
	@SuppressWarnings("unchecked")
	public Map<String, String> getListaBeneficiarios5() {
		String sql="SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC";
		
		return (Map<String, String>) this.getJdbcTemplate().queryForList(sql);
		
	}
	
	public List<Map> getShortVendor(){		
		  return this.getJdbcTemplate().queryForList("SELECT CLV_BENEFI as value, NCOMERCIA as label FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");		
	}
	
	public List<Map> getListadoBeneficiarios(String ncomercia,String rfc, int tipo, String vigencia){
		String clausula = "";
		
		if(ncomercia!="") clausula = " AND NCOMERCIA LIKE '%"+ncomercia+"%'";
		
				
		if(rfc!="") clausula +=" AND RFC LIKE '%"+rfc+"%'";
		
		if(vigencia.equals("0")) 
			clausula +=" AND STATUS IN(0,1) ";
		else if(vigencia.equals("1")) 
			clausula +=" AND STATUS IN(1) ";
		else if(vigencia.equals("0"))
			clausula +=" AND STATUS IN(0) ";
		if(tipo==1)
			clausula +=" AND TIPOBENEFI <>'MP' ";
		if(tipo==2)
			clausula +=" AND TIPOBENEFI ='MP' ";
		if(tipo==3)
			clausula +=" AND TIPOBENEFI <>'PF' ";
		if(tipo==4)
			clausula +=" AND TIPOBENEFI ='PM' ";
		if(tipo==5)
			clausula +=" AND TIPOBENEFI ='MP' ";
		
		String sql = "SELECT * FROM CAT_BENEFI WHERE NCOMERCIA <>'' "+clausula+" ORDER BY NCOMERCIA ASC";
	    return this.getJdbcTemplate().queryForList(sql);		
	}


	
	public  String    getBeneficiario2(Long idBeneficiario){
		if(idBeneficiario==0L) 
			return "";
		else
			return (String) this.getJdbcTemplate().queryForObject("SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI = ? ", new Object []{idBeneficiario},  String.class);
	}
	
	public  List   getBeneficiariosTodosHijos(String idBeneficiario){
		return this.getJdbcTemplate().queryForList("SELECT     A.CLV_BENEFI, A.CLV_BNCSUC, A.NCOMERCIA, A.BENEFICIAR, A.BENEFICIA2, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO, "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.BENEFI_07, A.ID_PROVEEDOR, A.VIGENCIA,A.CLABE  "+
                      " B.BANCO, B.SUCURSAL, B.PLAZA, "+
                      " (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO "+
                      " FROM        CAT_BENEFI AS A LEFT OUTER JOIN CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.CLAVE_PADRE =  ? AND  A.STATUS =1",new Object []{idBeneficiario});
	}
	
	public  List   getBeneficiariosPorEjemplo(String razonSocial){
		return this.getJdbcTemplate().queryForList("SELECT     A.CLV_BENEFI, A.CLV_BNCSUC, A.NCOMERCIA, A.BENEFICIAR, A.BENEFICIA2, A.RFC, A.CURP, A.TIPOBENEFI, A.DOMIFISCAL, A.CIUDAD, A.ESTADO, "+ 
					  " A.CODIGOPOST, A.TELEFONOS, A.COLONIA, A.NUM_CTA, A.TIPO_CTA, A.CLAVE_PADRE, A.BENEFI_07, A.ID_PROVEEDOR, A.VIGENCIA,A.CLABE  "+
                      " B.BANCO, B.SUCURSAL, B.PLAZA, "+
                      " (SELECT NCOMERCIA FROM CAT_BENEFI WHERE CLV_BENEFI=A.CLAVE_PADRE  ) BENEFICIARIO "+
                      " FROM        CAT_BENEFI AS A LEFT OUTER JOIN  CAT_BNCSUC  B ON A.CLV_BNCSUC = B.CLV_BNCSUC WHERE  A.NCOMERCIA like  ? AND A.STATUS=1", new Object []{razonSocial+"%"});
	}
	
	public  Long   actualizarPrincipal(Long clave,String razonSocial,String responsable,String responsable2,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,String clabeb, Date fecha_alta, Date fecha_baja){
		 if (clave == 0) 		  
			  clave = inserta(razonSocial,responsable,responsable2,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,fecha_alta,fecha_baja);	  	  
		  else
			  actualizar(clave,razonSocial,responsable,responsable2,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,fecha_alta,fecha_baja);
		 return clave;
	}
	
	
	//AGREGAR UN NUEVO BENEFICIARIO--------------------------------------------------------------
	public Long inserta( String razonSocial,String responsable,String responsable2,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,String clabeb, Date fecha_alta,Date fecha_baja){
		try
		{
			Long cveBeneficiario =getNumeroBeneficiarioNuevo(tipo)+1;
			String folio=rellenarCeros(cveBeneficiario.toString(),4);	
			
			if(this.getJdbcTemplate().queryForInt("SELECT COUNT(*) AS N FROM CAT_BENEFI WHERE (RFC = ?)", new Object[]{rfc}) > 0)
			 
				throw new Exception("El Beneficiario ya se encuentran registrados en el sistema; actualizar la informacion.");
			
			//Long diasvigencia = (long) ((this.getJdbcTemplate().queryForInt("SELECT DATEDIFF (Day, ?, ?) As Dias FROM CAT_BENEFI WHERE (CLV_BENEFI=?)", new Object []{fecha_alta,fecha_baja,cveBeneficiario})));
			//System.out.println("Total de dias restantes" + diasvigencia);
			
			this.getJdbcTemplate().update("insert into cat_benefi (ID_BENEFICIARIO,  NCOMERCIA, BENEFICIAR, BENEFICIA2, RFC, CURP,TELEFONOS, TIPOBENEFI, DOMIFISCAL,COLONIA, CIUDAD, ESTADO, "+
					" CODIGOPOST, CLV_BNCSUC, NUM_CTA, TIPO_CTA, VIGENCIA, STATUS, CLABE, FECHA_ALTA, FECHA_BAJA) " +
					"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
					, new Object[]{folio, razonSocial, responsable, responsable2, rfc, curp, telefono, tipo, calle, colonia, ciudad, estado, cp, idBanco, noCuenta, tipoCuenta, vigencia,1 , clabeb,fecha_alta,fecha_baja});
			return cveBeneficiario;
		}
		catch(Exception e){
			throw new RuntimeException(e.getMessage(),e);
		}
	}
	
	private Long getDiasactivos( Date fecha_alta,Date fecha_baja,Long cveBeneficiario){
	
		String SQL="SELECT DATEDIFF (Day, "+fecha_alta+","+fecha_baja+") As Dias FROM CAT_BENEFI WHERE (CLV_BENEFI="+cveBeneficiario+")";
		return this.getJdbcTemplate().queryForLong(SQL);
	}
	
	private Long getNumeroBeneficiarioNuevo( String tipo){
		String SQL = "";
		if(tipo.equals("PM"))
			SQL = "SELECT MAX(ID_BENEFICIARIO) AS N FROM CAT_BENEFI WHERE ID_BENEFICIARIO >= 8000";
		else 
			SQL = "SELECT MAX(ID_BENEFICIARIO) AS N FROM CAT_BENEFI WHERE ID_BENEFICIARIO < 8000";
			

		return this.getJdbcTemplate().queryForLong(SQL);
	}
	
	public void actualizar(Long clave,String razonSocial,String responsable,String responsable2,String rfc,String curp,String telefono,String tipo,String calle,String colonia,String ciudad,String estado,Integer cp,Integer idBanco,String noCuenta,String tipoCuenta,String idBeneficiarioPadre,String vigencia,String clabeb,Date fecha_alta,Date fecha_baja ){	
		this.getJdbcTemplate().update("UPDATE dbo.CAT_BENEFI SET NCOMERCIA = ?, BENEFICIAR = ?, BENEFICIA2 = ?, RFC =?, CURP =?, TELEFONOS = ?, TIPOBENEFI = ?, DOMIFISCAL = ?, COLONIA =?, CIUDAD = ?, ESTADO = ?, CODIGOPOST = ?, " +
						  " CLV_BNCSUC = ?, NUM_CTA = ?, TIPO_CTA = ?, CLAVE_PADRE = ?, STATUS = ?, CLABE = ?,FECHA_ALTA = ?,FECHA_BAJA = ? WHERE ID_BENEFICIARIO=?" 
				, new Object[]{razonSocial,responsable,responsable2,rfc,curp,telefono,tipo,calle,colonia,ciudad,estado,cp,idBanco,noCuenta,tipoCuenta,idBeneficiarioPadre,vigencia,clabeb,fecha_alta,fecha_baja,clave});
	}	
	
	public void eliminar(Long idBeneficiario ) {
		this.getJdbcTemplate().update("DELETE FROM CAT_BENEFI WHERE ID_PROVEEDOR=? ", new Object []{idBeneficiario});
	}
	
	public void deshabilitarBeneficiario(Long id){
		this.getJdbcTemplate().update("UPDATE CAT_BENEFI SET STATUS = ?,FECHA_BAJA=? WHERE ID_BENEFICIARIO = ?", new Object[]{0,new Date() ,id});
	}
	
	public void habilitarBeneficiario(Long id){
		this.getJdbcTemplate().update("UPDATE CAT_BENEFI SET STATUS = ?,FECHA_BAJA=? WHERE ID_BENEFICIARIO = ?", new Object[]{1,null,id});
	}

	
	

	
	public List<Map> simulaSearchResult(String ncomercia){
		
		List <Map> lst_Beneficiarios = getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		//List <Map> result = new ArrayList<Map>();
		
		//Iterar la lista y filtrar el beneficiario
		
		for (Map row: lst_Beneficiarios){
			
			if (((List<Map>) row.get("NCOMERCIA")).contains(ncomercia)){
				lst_Beneficiarios.add(row);
			}
		}
		System.out.println("Lista de Beneficiarios: " +lst_Beneficiarios);
		return lst_Beneficiarios;
		
	}

		
	public List<Map>DummyDB(String ncomercia){
		
		Beneficiarios = new ArrayList<String>();
		
		
		List <Map> lst_Beneficiarios = getJdbcTemplate().queryForList("SELECT CLV_BENEFI, NCOMERCIA, RFC, TIPOBENEFI  FROM CAT_BENEFI WHERE STATUS = 1 ORDER BY NCOMERCIA ASC");
		
		String BeneficiariosTodos = lst_Beneficiarios.toString();
		StringTokenizer st = new StringTokenizer(BeneficiariosTodos, ",");
		
		//Parse the country CSV list and set as Array
        while(st.hasMoreTokens()) {
        	Beneficiarios.add(st.nextToken().trim());
        }
		
		for (Map row: lst_Beneficiarios){
			
			if (((List<Map>) row.get("NCOMERCIA")).contains(ncomercia)){
				lst_Beneficiarios.add(row);
			}
		}
		System.out.println("Lista de Beneficiarios: " +lst_Beneficiarios);
		return lst_Beneficiarios;
		
        
	}
		
	 public List<String> getBenefiList(String query) {
		
		 String Benefis = null;
	        query = query.toLowerCase();
	        List<String> lst_benefi = new ArrayList<String>();
	        
	        for(int i=0; i < Beneficiarios.size(); i++) {
	        	Benefis = Beneficiarios.get(i).toLowerCase();
	             if(Benefis.startsWith(query)) {
	            	 lst_benefi.add(Beneficiarios.get(i));
	             }
	        }
		return lst_benefi;
		 
	 }
}
