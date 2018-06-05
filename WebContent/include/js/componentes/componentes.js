/*

function buscarBeneficiarioEmer(){			
				var txt = 'Busqueda de Beneficiarios'+
					'<div class="field"><label for="editfname">First Name</label><input type="text" id="editfname" name="editfname" value="hola" /></div>'+
					'<div class="field"><label for="editlname">Last Name</label><input type="text" id="editlname" name="editlname" value="mundo" /></div>';				
				$.prompt(txt,{ 
					buttons:{Aceptar:true, Cancelar:false},					
					submit: function(v,m,f){
						var flag = true;
						if (v) {
							
							if ($.trim(f.editfname) == '') {
								m.find('#editfname').addClass('error');
								flag = false;
							}
							else m.find('#editfname').removeClass('error');
							
							if ($.trim(f.editlname) == '') {
								m.find('#editlname').addClass('error');
								flag = false;
							}
							else m.find('#editlname').removeClass('error');
							
						}
						return flag;
					},
					callback: function(v,m,f){
						
						if(v){							
							//Here is where you would do an ajax post to edit the user
							//also you might want to print out true/false from your .php
							//file and verify it has been removed before removing from the 
							//html.  if false dont remove, $promt() the error.
							
							//$.post('edituser.php',{userfname:f.editfname,userlname:f.editlname}, callback:function(data){
							//	if(data == 'true'){
							alert("Ya me voy.");
									//user.find('.fname').text(f.editfname);
									//user.find('.lname').text(f.editlname);
									
							//	}else{ $.prompt('An Error Occured while editing this user'); }							
							//});
						}
						else{}
						
					} ,
					prefix:'cleanblue'
				});
			}
			*/


function mensajeInformativo(mensaje){			
				var txt ='<div class="informativo">Mensaje::</div><div class="field">'+mensaje+'</div>';				
				$.prompt(txt,{ 
					buttons:{Aceptar:true},					
					prefix:'cleanblue'
				});
			}

function mensajeError(mensaje){			
				var txt ='<div class="error">Error::</div>'+'<div class="field">'+mensaje+'</div>';				
				$.prompt(txt,{ 
					buttons:{Aceptar:true},					
					prefix:'cleanblue'
				});
			}

function mensajeAlerta(mensaje){			
				var txt ='<div class="error">Alerta::</div>'+'<div class="field">'+mensaje+'</div>';				
				$.prompt(txt,{ 
					buttons:{Aceptar:true},					
					prefix:'cleanblue'
				});
			}