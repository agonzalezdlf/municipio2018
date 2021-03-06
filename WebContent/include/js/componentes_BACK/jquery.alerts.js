// jQuery Alert Dialogs Plugin
//
// Version 1.1
//
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 14 May 2009
//
// Visit http://abeautifulsite.net/notebook/87 for more information
//
// Usage:
//		jAlert( message, [title, callback] )
//		jConfirm( message, [title, callback] )
//		jPrompt( message, [value, title, callback] )
// 
// History:
//
//		1.00 - Released (29 December 2008)
//
//		1.01 - Fixed bug where unbinding would destroy all resize events
//
// License:
// 
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC. 
//
(function($) {
	navigator.sayswho= (function(){
	    var ua= navigator.userAgent, tem, 
	    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	    if(/trident/i.test(M[1])){
	        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
	        return 'IE '+(tem[1] || '');
	    }
	    if(M[1]=== 'Chrome'){
	        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
	        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	    }
	    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
	    return M.join(' ');
	})();

	console.log(navigator.sayswho);
	
	$.alerts = {
		
		// These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
		//Estas propiedades se pueden leer / escribir accediendo $.alerts.propertyName de tus scripts en cualquier momento
			
		verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels //desplazamiento vertical del diálogo desde la pantalla central, en píxeles
		horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels //desplazamiento horizontal del diálogo desde la pantalla central, en píxeles
		repositionOnResize: true,           // re-centers the dialog on window resize //vuelve a centrar el diálogo en el tamaño de la ventana
		overlayOpacity: .6,                // transparency level of overlay //nivel de transparencia de superposición
		overlayColor: '#ABABAB',               // base color of overlay //color base de la superposición
		draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)  //hacer los diálogos arrastrables //requiere el plugin UI Draggables
		okButton: '&nbsp;Aceptar&nbsp;',         // text for the OK button //Texto para el boton ok
		cancelButton: '&nbsp;Cancelar&nbsp;', // text for the Cancel button //Texto para el boton cancelar
		dialogClass: null,                  // if specified, this class will be applied to all dialogs // si se especifica, esta clase se aplicará a todos los cuadros de diálogo
		
		// Public methods
		
		alert: function(message, title, callback) {
			if( title == null ) title = 'Advertencia';
			$.alerts._show(title, '\n'+message+'\n\n', null, 'alert', function(result) {
				if( callback ) callback(result);
			});
		},
		
		Information: function(message, title, callback) {
			if( title == null ) title = 'Informaci�n';
			$.alerts._show(title, '\n'+message+'\n\n', null, 'information', function(result) {
				if( callback ) callback(result);
			});
		},
		
		Window: function(html, title, BotonOK, BotonCancel, NumBotones, callback) {
			if( title == null ) title = 'Window';
			$.alerts._show2(title, '\n'+html, BotonOK, BotonCancel, NumBotones, function(result) {
				if( callback ) callback(result);
			});
		},
		
		Error: function(message, title, callback) {
			if( title == null ) title = 'Error';
			$.alerts._show(title, '\n'+message+'\n\n', null, 'error', function(result) {
				if( callback ) callback(result);
			});
		},
		
		confirm: function(message, title, callback) {
			if( title == null ) title = 'Confirmar';
			$.alerts._show(title, '\n'+message+'\n\n', null, 'confirm', function(result) {
				if( callback ) callback(result);
			});
		},
			
		prompt: function(message, value, title, callback) {
			if( title == null ) title = 'Pregunta';
			$.alerts._show(title, message, value, 'prompt', function(result) {
				if( callback ) callback(result);
			});
		},
		
		
	
		// Private methods
		_show2: function(title, msg, BotonOK, BotonCancel, NumBotones, callback) {
			$.alerts._hide();
			$.alerts._overlay('show');
			$("BODY").append(
				  '<div id="popup_container">' +
					'<h2 id="popup_title"></h2>' +
					'<div id="popup_content_window">' +
					  '<div id="popup_message_window"></div>' +
					'</div>' +
				  '</div>');
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			// IE6 Fix
			
			var botones = "";
			$("#popup_container").css({
				position: fixed,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			/*Aqui el cuerpo y estilos del dialogo*/
			$("#popup_title").text(title);
			$("#popup_content_window").addClass('window');
			$("#popup_message_window").text(msg);
			$("#popup_message_window").html( $("#popup_message_window").text().replace(/\n/g, '<br />') );
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			/*Aqui el proceso para incorporar el numero de botones*/
			switch( NumBotones ) {
				case 0:
					botones = '';
				break;
				case 1:
					botones = '<input type="button" style="width:100px" class="botones" value="' + BotonCancel + '" id="popup_cancel" />';
				break;
				case 2:
					botones = '<input type="button" style="width:100px" class="botones" value="' + BotonOK + '" id="popup_ok" /> <input type="button" class="botones" value="' + BotonCancel + '" id="popup_cancel" />';
				break;
			}
			
			/*Aqui el codigo para dibujar los botones y eventos*/
			$("#popup_message_window").after('<div id="popup_panel"> '+botones+'</div>');
			$("#popup_ok").click( function() {
				$.alerts._hide();
				callback(true);
			});
			$("#popup_ok").focus().keypress( function(e) {
				if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
			});
			$("#popup_cancel").click( function() {
				$.alerts._hide();
				if( callback ) callback(false);
			});
			$("#popup_ok, #popup_cancel").keypress( function(e) {
				if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
				if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
			});
			
		}
		,
		
		_show: function(title, msg, value, type, callback) {
			
			$.alerts._hide();
			$.alerts._overlay('show');
			$("BODY").append(
				  '<div id="popup_container">' +
					'<h2 id="popup_title"></h2>' +
					'<div id="popup_content">' +
					  '<div id="popup_message"></div>' +
					'</div>' +
				  '</div>');
			
			
			if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);
			
			// IE6 Fix
			var pos = 'absolute'; //: 'fixed'; *************************************************************
			
			$("#popup_container").css({
				position: pos,
				zIndex: 99999,
				padding: 0,
				margin: 0
			});
			
			$("#popup_title").text(title);
			$("#popup_content").addClass(type);
			$("#popup_message").text(msg);
			$("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );
			
			$("#popup_container").css({
				minWidth: $("#popup_container").outerWidth(),
				maxWidth: $("#popup_container").outerWidth()
			});
			
			$.alerts._reposition();
			$.alerts._maintainPosition(true);
			
			switch( type ) {
				case 'alert':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'information':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'window':
					$("#popup_message").after('<div id="popup_panel"><input type="button" style="width:100px" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" style="width:100px" class="botones" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
					$("#popup_cancel").click( function() {
						jClose();
						if( callback ) callback(false);
					});
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'error':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						callback(true);
					});
					$("#popup_ok").focus().keypress( function(e) {
						if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
					});
				break;
				case 'confirm':
					$("#popup_message").after('<div id="popup_panel"><input type="button" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" class="botones" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_ok").click( function() {
						$.alerts._hide();
						if( callback ) callback(true);
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback(false);
					});
					$("#popup_ok").focus();
					$("#popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
				break;
				case 'prompt':
					$("#popup_message").append('<br /><input type="text" class="botones" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" class="botones" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" class="botones" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
					$("#popup_prompt").width( $("#popup_message").width() );
					$("#popup_ok").click( function() {
						var val = $("#popup_prompt").val();
						$.alerts._hide();
						if( callback ) callback( val );
					});
					$("#popup_cancel").click( function() {
						$.alerts._hide();
						if( callback ) callback( null );
					});
					$("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
						if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
						if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
					});
					if( value ) $("#popup_prompt").val(value);
					$("#popup_prompt").focus().select();
				break;
			}
			
			/* Make draggable
			if( $.alerts.draggable ) {
				try {
					$("#popup_container").draggable({ handle: $("#popup_title") });
					$("#popup_title").css({ cursor: 'move' });
				} catch(e) { /* requires jQuery UI draggables  }
			}*/
		},
		
		_hide: function() {
			$("#popup_container").remove();
			$.alerts._overlay('hide');
			$.alerts._maintainPosition(false);
		},
		
		_overlay: function(status) {
			switch( status ) {
				case 'show':
					$.alerts._overlay('hide');
					$("BODY").append('<div id="popup_overlay"></div>');
					$("#popup_overlay").css({
						position: 'absolute',
						zIndex: 99998,
						top: '0px',
						left: '0px',
						width: '100%',
						height: $(document).height(),
						background: $.alerts.overlayColor,
						opacity: $.alerts.overlayOpacity
					});
				break;
				case 'hide':
					$("#popup_overlay").remove();
				break;
			}
		},
		
		_reposition: function() {
			var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + $.alerts.verticalOffset;
			var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2)) + $.alerts.horizontalOffset;
			if( top < 0 ) top = 0;
			if( left < 0 ) left = 0;
			
			// IE6 fix
			//if( $.browser.msie && parseInt($.browser.version) <= 11 ) top = top + $(window).scrollTop(); /***********************************************************/
			top = top + $(window).scrollTop();
			
			$("#popup_container").css({
				top: top + 'px',
				left: left + 'px'
			});
			$("#popup_overlay").height( $(document).height() );
		},
		
		_maintainPosition: function(status) {
			if( $.alerts.repositionOnResize ) {
				switch(status) {
					case true:
						$(window).bind('resize', $.alerts._reposition);
					break;
					case false:
						$(window).unbind('resize', $.alerts._reposition);
					break;
				}
			}
		}
		
	}
	
	// Shortuct functions
	jAlert = function(message, title, callback) {
		$.alerts.alert(message, title, callback);
	}
	
	jInformation = function(message, title, callback) {
		$.alerts.Information(message, title, callback);
	}
	
	jWindow = function(html, title, BotonOK, BotonCancel, NumBotones, callback) {
		$.alerts.Window(html, title, BotonOK, BotonCancel, NumBotones, callback);
	}
	
	jError = function(message, title, callback) {
		$.alerts.Error(message, title, callback);
	}
	
	jConfirm = function(message, title, callback) {
		$.alerts.confirm(message, title, callback);
	};
		
	jPrompt = function(message, value, title, callback) {
		$.alerts.prompt(message, value, title, callback);
	};
	
	jClose = function(){
		$.alerts._hide();	
	};
	
})(jQuery);
