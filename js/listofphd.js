if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

$(function() {
	var env = environment.getenv();
	var url = "/"+env+"/api/ziftapi.php?method=showPHD&format=json";
	$("#listOfPartyHardDriverServices tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showPHDList) && response.showPHDList.length) {
			var headRow = '<th style="text-align:center">Image</th><th style="text-align:center">Service Name</th><th style="text-align:center">Mobile No.</th><th style="text-align:center">City</th><th style="text-align:center">Is Verify</th>'; 
			$(headRow).appendTo("#listOfPartyHardDriverServices thead");
			$.each(response.showPHDList, function(i, phdList) {
				if(phdList.image_path!=="") {
					var imageName = phdList.image_path; 
				}
				else {
					var imageName = "default_image.png";
				}
				
				var newRow = "<tr id=phdService_"+phdList.mobileno+">" + 
				'<td align="center" style="padding:5px"><img height="80px" width="80px" src="/dev/phd_images/' + imageName + '"/></td>' + 
				'<td align="center" style="padding:5px">' + phdList.serviceName + '</td>' + 
				'<td align="center" style="padding:5px">' + phdList.mobileno + '</td>' + 
				'<td align="center" style="padding:5px">' + phdList.city + '</td>' + 
				'<td align="center" class="verification" style="padding:5px">' + displayTrueFalseForInt(parseInt(phdList.isVerify)) + '</td>' + 
				'<td align="center" style="padding:5px">' + "<button class=\'verifiedbtn\' onclick= \'verifiedPHDService(\""+phdList.mobileno+"\", event, this)\'>Verify</button>" + '</td>' +
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deletePHDService(\""+phdList.mobileno+"\", \""+imageName+"\", event, this)\'>Delete</button>" + '</td>' + 
				"</tr>"; 
				$(newRow).appendTo("#listOfPartyHardDriverServices tbody");
			});
		}
		else {
			alert("No Party Hard Services in the database!");
		}
	});
});

function displayTrueFalseForInt(isVerified) {
	if(isVerified === 0) {
		return "Not Verified";
	}
	return "Verified";
}

function verifiedPHDService(mobileno, event, verifiedrow) {
	var data = {
		mobileno : mobileno,
		isVerify : 1,
		method : 'verifyPHD',
		format : 'json'
	};
	
	var env = environment.getenv();
	
	jQuery.ajax({
		url : '/'+env+'/api/ziftapi.php',
		type : "POST",
		data : data,
		success : function() {
			alert('Verified successfully');
			var phdServiceVerifying = "phdService_"+mobileno;
			$("#"+phdServiceVerifying).children(".verification").html("Verified");
		},
		error : function() {
			alert('There is error while verify');
		}
	});
}

function deletePHDService(mobileno, imageName, event, delrow) {
	var data = {
		mobileno : mobileno,
		imageName : imageName,
		method : 'deletePHD',
		format : 'json'
	};
	
	var env = environment.getenv();
	
	jQuery.ajax({
		url : '/'+env+'/api/ziftapi.php',
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