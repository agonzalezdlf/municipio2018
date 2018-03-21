package mx.gob.municipio.centro.model.gateways.sam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

public class GatewayExcelReporteConsolidado extends AbstractExcelView {

	CellStyle rowStyle = null;
	String[] headers = null;
    int rowNum = 0;
    int colNum = 0;
	
    public List <Map> modelDataSource = new ArrayList<Map>();
    
	
	@Override
	protected void buildExcelDocument(Map model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response ) throws Exception {
		// TODO Auto-generated method stub
		
		//La hoja donde pondremos los datos
				HSSFSheet excelSheet = workbook.createSheet("Consolidado Movimientos");
				
				 setExcelHeader(excelSheet, workbook);
			       	
			       	//sheet.autoSizeColumn(columnNumber) 
					response.setHeader("Content-disposition", "attachment;filename=\"" + excelSheet.getSheetName() + ".xls\"");
					
					//autoSizeColumns(workbook);	
					setExcelRows(excelSheet,model, workbook);
					
					//Realiza el autoSize de las columnas declaradas
					excelSheet.autoSizeColumn(0);
					excelSheet.autoSizeColumn(1);
				 	excelSheet.autoSizeColumn(2);
				 	excelSheet.autoSizeColumn(3);
				 	excelSheet.autoSizeColumn(4);
				 	excelSheet.autoSizeColumn(5);
				 	excelSheet.autoSizeColumn(6);
				 	excelSheet.autoSizeColumn(7);
				 	
	}
	
	public void setExcelHeader(HSSFSheet excelSheet, Workbook woorkbook) {
		
CellStyle headerStyle = null;
	
		
		// create style for header cells
		//
	    headerStyle = excelSheet.getWorkbook().createCellStyle();
	    
	    DataFormat formato = woorkbook.createDataFormat();
	    Font fonts = excelSheet.getWorkbook().createFont();
	    fonts.setFontName("Arial");
	    fonts.setBold(true);
	    fonts.setFontHeightInPoints((short)10); //Tamaño de letra
	    headerStyle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);//Fondo de la celda
	    headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	    headerStyle.setFont(fonts);
	  
	    
	    headerStyle.setAlignment(HorizontalAlignment.CENTER);//setAlignment(HorizontalAlignment align)
	 		 
		// create header row
		HSSFRow excelHeader = excelSheet.createRow(0);

       	excelHeader.createCell ((short) 0).setCellValue ("LOTE");
		excelHeader.getCell(0).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 1).setCellValue ("CANTIDAD"); 
		excelHeader.getCell(1).setCellStyle(headerStyle);
		
	 	excelHeader.createCell ((short) 2).setCellValue ("UNIDAD MEDIDA");
		excelHeader.getCell(2).setCellStyle(headerStyle);
			
		excelHeader.createCell ((short) 3).setCellValue ("DESCRIPCIÓN"); 
		excelHeader.getCell(3).setCellStyle(headerStyle);
			
		excelHeader.createCell ((short) 4).setCellValue ("IMPORTE"); 
		excelHeader.getCell(4).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 5).setCellValue ("NUM. REQUISICION"); 
		excelHeader.getCell(5).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 6).setCellValue ("DEPENDENCIA"); 
		excelHeader.getCell(6).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 7).setCellValue ("ID. REQ"); 
		excelHeader.getCell(7).setCellStyle(headerStyle);
		
		//ID_REQ_MOVTO=7212, CVE_REQ=1808, NUM_REQ=SAS/OS/160/18, REQ_CONS=1, CANTIDAD_TEMP=null, CANTIDAD=1.0000, NOTAS=REPARACION GENERAL, FABRICACION Y SUMINISTRO DE ACCESORIOS A BOMBA SUMERGIBLE VERTICAL DE 250 LPS, 440 VOLTS Y 1750 RPM. UBICADA EN CAPTACION. PLANTA POTABILIZADORA CARRIZAL. DE LA COORDINACION DEL S.A.S., STATUS=0, DESCRIPCION=SERVICIO, ARTICULO=SERVICIO, UNIDAD=servicio, PRECIO_EST=185000.0000, IMPORTE=185000.0000, TEXTO=
		
	}
	
	public void setExcelRows(HSSFSheet excelSheet, Map model, Workbook woorkbook){
HSSFRow fila;
		
		//celda-columna que queramos usar
		HSSFCell celda = null; 
		
		
		Row row;
		
		Double disponible = 0d;
		rowStyle = excelSheet.getWorkbook().createCellStyle();
		DataFormat format = woorkbook.createDataFormat();
		Font fonts = excelSheet.getWorkbook().createFont();
		fonts.setFontHeightInPoints((short)8); //Tamaño de letra
		fonts.setFontName("ARIAL");
	    rowStyle.setFont(fonts);
		
		short numFila = 1;
		short colNum = 0;
		
		List<Map> NewModel = (List<Map>)model.get("lista_consolidado");
		
		
		rowStyle = woorkbook.createCellStyle();
		
		/*----------------------------*/
		/*----ESTILO COLUMNA LOTE----*/
		CellStyle rowStyle_01 = woorkbook.createCellStyle();
		rowStyle_01.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_01.setDataFormat(format.getFormat("0"));
		
		/*----------------------------*/
		/*----ESTILO COLUMNA CANTIDAD----*/
		CellStyle rowStyle_02 = woorkbook.createCellStyle();
		rowStyle_02.setAlignment(HorizontalAlignment.RIGHT);
		rowStyle_02.setDataFormat(format.getFormat("#,##0.00_);[Red](#,##0.00)"));
		
		/*----------------------------*/
		/*----ESTILO COLUMNA UNIDAD DE MEDIDA----*/
		CellStyle rowStyle_03 = woorkbook.createCellStyle();
		rowStyle_03.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_03.setDataFormat(format.getFormat("0"));
		/*----------------------------*/
		/*----ESTILO COLUMNA DESCRIPCION DEL LOTE----*/
		CellStyle rowStyle_04 = woorkbook.createCellStyle();
		rowStyle_04.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_04.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA IMPORTE----*/
		CellStyle rowStyle_05 = woorkbook.createCellStyle();
		rowStyle_05.setAlignment(HorizontalAlignment.RIGHT);
		rowStyle_05.setDataFormat(format.getFormat("#,##0.00_);[Red](#,##0.00)"));
		/*----------------------------*/
		/*----ESTILO COLUMNA NUM_REQ----*/
		CellStyle rowStyle_06 = woorkbook.createCellStyle();
		rowStyle_06.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_06.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA NUM_REQ----*/
		CellStyle rowStyle_07 = woorkbook.createCellStyle();
		rowStyle_07.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_07.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA ID_REQ_MOVTO----*/
		CellStyle rowStyle_08 = woorkbook.createCellStyle();
		rowStyle_08.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_08.setDataFormat(format.getFormat("text"));
		
		
		for (Map p : NewModel) {
			
			System.out.println("Demo para revision que traemos:  " +NewModel );
			fila = excelSheet.createRow(numFila++); //La hoja debemos añadirle las filas que deseemos. La numeración empieza en cero.
			
			celda = (HSSFCell) fila.createCell((short)0);
			HSSFRichTextString req_cons = new HSSFRichTextString((p.get("REQ_CONS").toString()));
			celda.setCellValue(req_cons);
			celda.setCellStyle(rowStyle_01);
			
			celda = (HSSFCell) fila.createCell((short)1);
			HSSFRichTextString cantidad = new HSSFRichTextString((p.get("CANTIDAD").toString()));
			celda.setCellValue(cantidad);
			celda.setCellStyle(rowStyle_02);
			
			celda = (HSSFCell) fila.createCell((short)2);
			HSSFRichTextString unidad = new HSSFRichTextString((p.get("UNIDAD").toString()));
			celda.setCellValue(unidad);
			celda.setCellStyle(rowStyle_03);
			
			celda = (HSSFCell) fila.createCell((short)3);
			HSSFRichTextString num_req = new HSSFRichTextString((p.get("ARTICULO").toString()));//
			celda.setCellValue(num_req);
			celda.setCellStyle(rowStyle_04);
			
			celda = (HSSFCell) fila.createCell((short)4);
			HSSFRichTextString importe = new HSSFRichTextString((p.get("IMPORTE").toString()));//
			celda.setCellValue(importe);
			celda.setCellStyle(rowStyle_05);
			
			celda = (HSSFCell) fila.createCell((short)5);
			HSSFRichTextString descdep = new HSSFRichTextString((p.get("NUM_REQ").toString()));
			celda.setCellValue(descdep);
			celda.setCellStyle(rowStyle_06);
			
			celda = (HSSFCell) fila.createCell((short)6);
			HSSFRichTextString dependencia = new HSSFRichTextString((p.get("DEPENDENCIA").toString()));
			celda.setCellValue(dependencia);
			celda.setCellStyle(rowStyle_07);
			
			celda = (HSSFCell) fila.createCell((short)7);
			HSSFRichTextString id_req = new HSSFRichTextString((p.get("ID_REQ_MOVTO").toString()));
			celda.setCellValue(id_req);
			celda.setCellStyle(rowStyle_08);
			
		}
	
	}

}
