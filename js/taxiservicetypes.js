if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

$(function() {
	$('#taxiServiceTypeForm').validate({
        rules: {
        	logochooser : {
        		required : true,
        		accept: "image/*"
        	},
        	owner : {
        		required : true
        	},
            serviceType : {
            	required : true
            },
            appLink : {
            	url : true
            },
            termsAndConditions : {
            	required : true
            }
        },
        messages : {
        	logochooser : {
        		required : "Please select a Taxi Owner Image.",
        		accept: "Please select only image file."
        	},
        	owner : {
        		required : "Please enter Taxi Owner."
        	},
			serviceType : {
				required : "Please enter Taxi Service Type."
			},
			termsAndConditions : {
            	required : "Please enter a Terms & Conditions of the Taxi Owner."
            }
		},
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		}
    });
    
    $("#taxiservicetypesubmit").click(function() {
		if($('#owner').valid() && $('#serviceType').valid() && $('#termsAndConditions').valid()) {		
			if(document.getElementById("logochooser").value != "") {
				var isValidFile=validateFile();
			}
			var form = new FormData(this);
			var owner = $("#owner").val();
			var serviceType = $("#serviceType").val();
			var fleet = $("#fleet").val();
			var appLink = $("#appLink").val();
			var termsAndConditions = $("#termsAndConditions").val();
			if(isValidFile==true){
				var logo = $('#logochooser')[0].files[0];
				form.append("logo", logo);
			} else if(isValidFile==false) {
				return false;
			}  	
	    		form.append("owner",owner);
	    		form.append("serviceType",serviceType);
	    		form.append("fleet",fleet);
	    		form.append("appLink",appLink);
	    		form.append("termsAndConditions",termsAndConditions);
	    		form.append("method","taxiServiceType");
	    		form.append("format","json");
	    		
	    		var env = environment.getEnv();
	    		
	    		var xhr = new XMLHttpRequest;
				xhr.open('POST', '/'+env+'/api/ziftapi.php', true);
				xhr.onload = function() {
    				if (this.status == 200) {
	      				var resp = JSON.parse(this.response);
	      				if(resp.responseTaxiServiceType=="ERROR"){
	      					alert("Taxi Service Type not saved!");
	      				}
	      				else {
	      					alert("Taxi Service Type saved successfully!");
	      					$('#logochooser').replaceWith($('#logochooser').clone());
	      					$('#owner').val('');
	      					$('#serviceType').val('');
	      					$('#fleet').val('');
	      					$('#appLink').val('');
	      					$('#termsAndConditions').val('');
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
