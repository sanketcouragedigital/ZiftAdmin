if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

$(function() {
	var url = "/dev/api/ziftapi.php?method=showServiceProvider&format=json";
	$("#listOfServiceProviders tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showServiceProviderList) && response.showServiceProviderList.length) {
			var headRow = '<th style="text-align:center">Image</th><th style="text-align:center">Service Provider Name</th><th style="text-align:center">Service Provider Type</th><th style="text-align:center">Service By Hourly</th>'; 
			$(headRow).appendTo("#listOfServiceProviders thead");
			$.each(response.showServiceProviderList, function(i, serviceProviderList) {
				if(serviceProviderList.image_path!=="") {
					var imageName = serviceProviderList.image_path; 
				}
				else {
					var imageName = "default_image.png";
				}
				
				var newRow = "<tr>" + 
				'<td align="center" style="padding:5px"><img height="80px" width="80px" src="/dev/service_provider_images/' + imageName + '"/></td>' + 
				'<td align="center" style="padding:5px">' + serviceProviderList.serviceProviderName + '</td>' + 
				'<td align="center" style="padding:5px">' + serviceProviderList.type + '</td>' + 
				'<td align="center" style="padding:5px">' + displayYesOrNoForServiceByHourly(parseInt(serviceProviderList.serviceByHourly)) + '</td>' + 
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteServiceProvider(\""+serviceProviderList.serviceProviderName+"\", \""+imageName+"\", event, this)\'>Delete</button>" + '</td>' + 
				"</tr>"; 
				$(newRow).appendTo("#listOfServiceProviders tbody");
			});
		}
		else {
			alert("No Service Providers in the database!");
		}
	});
});

function displayYesOrNoForServiceByHourly(isServiceByHourly) {
	if(isServiceByHourly === 0) {
		return "No";
	}
	return "Yes";
}

function deleteServiceProvider(serviceProviderName, imageName, event, delrow) {
	var data = {
		serviceProviderName : serviceProviderName,
		imageName : imageName,
		method : 'deleteServiceProvider',
		format : 'json'
	};
	jQuery.ajax({
		url : '/dev/api/ziftapi.php',
		type : "POST",
		data : data,
		success : function() {
			alert('Deleted successfully');
			$(delrow).parent().parent().remove();
		},
		error : function() {
			alert('There is error while delete');
		}
	});
}