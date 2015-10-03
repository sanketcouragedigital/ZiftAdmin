if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

var env = environment.getEnv();
$.get("/"+ env +"/api/ziftapi.php?method=loadTaxiServices&format=json")
	.done(function (response){
		$.each(response.loadTaxiServicesList,function (index,loadTaxiServicesInCity){
			var serviceType = loadTaxiServicesInCity.Service_Type;
			 $("select#serviceType")
         		.append($("<option></option>")
         		.attr("serviceType",index)
         		.text(serviceType)); 
		});
	})
	.fail(function (){   
    	// $("#dlg-laod-error").popup("open"); 
	});

$(function() {
	$('#taxiServicesCityWise').validate({
        rules: {
        	city : {
        		required : true
        	},
        	contact : {
        		required : true
        	},
            serviceType : {
            	required : true
            },
            dayCost : {
            	required : true
            },
            dayCostPerKM : {
            	required : true
            }
        },
        messages : {
        	city : {
        		required : "Please enter City."
        	},
        	contact : {
        		required : "Please enter a contact no"
        	},
			serviceType : {
				required : "Please enter Taxi Service Type."
			},
			dayCost : {
            	required : "Please enter a Day Cost of Taxi Service in the City."
            },
			dayCostPerKM : {
            	required : "Please enter a Day Cost Per KM of Taxi Service in the City."
            }
		},
        errorPlacement: function( error, element ) {
			error.insertAfter( element.parent() );
		}
    });
    
    $("#taxiservicescitysubmit").click(function() {
		if($('#city').valid() && $('#contact').valid() && $('#serviceType').valid() && $('#dayCost').valid() && $('#dayCostPerKM').valid()) {
			var form = new FormData(this);
			var city = $("#city").val();
			var contact = $("#contact").val();
			var serviceType = $("#serviceType").val();
			var firstXKM = $("#firstXKM").val();
			var dayCost = $("#dayCost").val();
			var nightCost = $("#nightCost").val();
			var dayCostPerKM = $("#dayCostPerKM").val();
			var nightCostPerKM = $("#nightCostPerKM").val();
			var perMinuteRate = $("#perMinuteRate").val();
			var dayWaitingCharges = $("#dayWaitingCharges").val();
			var nightWaitingCharges = $("#nightWaitingCharges").val();
			var minimumRatesOfTaxi = $("#minimumRatesOfTaxi").val();
			
	    		form.append("city", city);
	    		form.append("contact", contact);
	    		form.append("serviceType", serviceType);
	    		form.append("firstXKM", firstXKM);
	    		form.append("dayCost", dayCost);
	    		form.append("nightCost", nightCost);
	    		form.append("dayCostPerKM", dayCostPerKM);
	    		form.append("nightCostPerKM", nightCostPerKM);
	    		form.append("perMinuteRate", perMinuteRate);
	    		form.append("dayWaitingCharges", dayWaitingCharges);
	    		form.append("nightWaitingCharges", nightWaitingCharges);
	    		form.append("minimumRatesOfTaxi", minimumRatesOfTaxi);
	    		form.append("method", "taxiServicesInCity");
	    		form.append("format", "json");
	    		
	    		var env = environment.getEnv();
	    		
	    		var xhr = new XMLHttpRequest;
				xhr.open('POST', '/'+env+'/api/ziftapi.php', true);
				xhr.onload = function() {
    				if (this.status == 200) {
	      				var resp = JSON.parse(this.response);
	      				if(resp.responseTaxiServiceInCity=="ERROR"){
	      					alert("Taxi Service not saved!");
	      				}
	      				else {
	      					alert("Taxi Service saved successfully!");
	      					$('#city').val('');
	      					$('#contact').val('');
	      					$('#serviceType').val($('#serviceType option:first').val());
	      					$('#firstXKM').val('');
	      					$('#dayCost').val('');
	      					$('#nightCost').val('');
	      					$('#dayCostPerKM').val('');
	      					$('#nightCostPerKM').val('');
	      					$('#perMinuteRate').val('');
	      					$('#dayWaitingCharges').val('');
	      					$('#nightWaitingCharges').val('');
	      					$('#minimumRatesOfTaxi').val('');
	      				}
    				}
  				};
				xhr.send(form);
		}
	});
});
