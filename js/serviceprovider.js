if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

$(function() {
	$.validator.addMethod('customnumber', function(value, element) {
		return this.optional(element) || /^([0-9]+)$/.test(value);
	}, "Please enter only numbers");
	$('#serviceProviderForm').validate({
        rules: {
        	serviceProviderName : {
        		required : true
        	},
        	serviceProviderType : {
        		required : true,
        		customnumber : true
        	}
        },
        messages : {
        	serviceProviderName : {
        		required : "Please enter Service Provider"
        	},
        	serviceProviderType : {
        		required : "Please enter Service Provider Type"
        	}
		},
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		}
    });
    
    $("#serviceprovidersubmit").click(function() {
		if($('#serviceProviderName').valid() && $('#serviceProviderType').valid() && $('#serviceByHourly').valid()) {		
			if(document.getElementById("logochooser").value != "") {
				var isValidFile=validateFile();
			}
			var form = new FormData(this);
			var serviceProviderName = $("#serviceProviderName").val();
			var serviceProviderType = $("#serviceProviderType").val();
			var serviceByHourly = $("#serviceByHourly").val();
			if(isValidFile==true){
				var logo = $('#logochooser')[0].files[0];
				form.append("logo", logo);
			} else if(isValidFile==false) {
				return false;
			}  	
	    		form.append("serviceProviderName",serviceProviderName);
	    		form.append("serviceProviderType",serviceProviderType);
	    		form.append("serviceByHourly",serviceByHourly);
	    		form.append("method","serviceprovider");
	    		form.append("format","json");
	    		
	    		var xhr = new XMLHttpRequest;
				xhr.open('POST', '/dev/api/ziftapi.php', true);
				xhr.onload = function() {
    				if (this.status == 200) {
	      				var resp = JSON.parse(this.response);
	      				if(resp.responseServiceProvider=="ERROR"){
	      					alert("Service Provider not saved!");
	      				}
	      				else {
	      					alert("Service Provider saved successfully!");
	      					$('#logochooser').replaceWith($('#logochooser').clone());
	      					$('#serviceProviderName').val('');
	      					$('#serviceProviderType').val('');
	      					$('#serviceByHourly').val('');
	      				}
    				}
  				};
				xhr.send(form);
		}
	});
	function validateFile() {
    	var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        var fileExtension = document.getElementById('logochooser').value.split('.').pop().toLowerCase();
        var isValidFile = false;

        for(var index in allowedExtension) {
			if(fileExtension === allowedExtension[index]) {
            	isValidFile = true; 
                	break;
                }
            }
			if(!isValidFile) {
            	alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
            	return false;
            }
		return isValidFile;
  	}
});
