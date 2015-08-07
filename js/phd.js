$(function() {
	$.validator.addMethod('customMobile', function(value, element) {
		return this.optional(element) || /^([789]\d{9})$/.test(value);
	}, "Please enter a valid 10 digit number");

	$('#phdForm').validate({
        rules: {
        	serviceName : {
        		required : true
        	},
            mobileno : {
            	customMobile : true,
            	required : true
            },
            city : {
            	required : true
            }
        },
        messages : {
        	serviceName : {
        		required : "Please enter Service Name."
        	},
			mobileno : {
				required : "Please enter a Mobile No."
			},
			city : {
				required : "Please enter City."
			}
		},
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		}
    });
    
    $("#phdsubmit").click(function() {
		if($('#serviceName').valid() && $('#mobileno').valid() && $('#city').valid()) {		
			if(document.getElementById("logochooser").value != "") {
				var isValidFile=validateFile();
			}
			var form = new FormData(this);
			var serviceName = $("#serviceName").val();
			var mobileno = $("#mobileno").val();
			var city = $("#city").val();
			if(isValidFile==true){
				var logo = $('#logochooser')[0].files[0];
				form.append("logo", logo);
			} else if(isValidFile==false) {
				return false;
			}  	
	    		form.append("serviceName",serviceName);
	    		form.append("mobileno",mobileno);
	    		form.append("city",city);
	    		form.append("isVerify","false");
	    		form.append("method","phd");
	    		form.append("format","json");
	    		
	    		var xhr = new XMLHttpRequest;
				xhr.open('POST', 'http://www.ziftapp.com/dev/api/ziftapi.php', true);
				xhr.onload = function() {
    				if (this.status == 200) {
	      				var resp = JSON.parse(this.response);
	      				if(resp.responsePHD=="ERROR"){
	      					alert("Logo not saved!");
	      				}
	      				else {
	      					alert("Logo saved successfully!");
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
