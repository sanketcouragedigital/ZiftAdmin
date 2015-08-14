if(!(sessionStorage.getItem("username")==="admin") && !(sessionStorage.getItem("password")==="510a81bd12cbe23889cf1f90440085420f1e9c27")){
	sessionStorage.setItem("url",document.URL);
	window.location.href="login.html";
}

$(function() {
	var url = "/dev/api/ziftapi.php?method=showDeals&format=json";
	$("#listOfDeals tbody").html("");
	$.getJSON(url, function(response) {
		if($.isArray(response.showDealsList) && response.showDealsList.length) {
			var headRow = '<th style="text-align:center">Image</th><th style="text-align:center">Company Name</th><th style="text-align:center">Offer</th><th style="text-align:center">Offer Code</th><th style="text-align:center">Valid Upto Date</th><th style="text-align:center">Offer Terms</th><th style="text-align:center">Is Verify</th>'; 
			$(headRow).appendTo("#listOfDeals thead");
			$.each(response.showDealsList, function(i, dealsList) {
				if(dealsList.image_path!=="") {
					var imageName = dealsList.image_path; 
				}
				else {
					var imageName = "default_image.png";
				}
				
				var date = dealsList.validUptoDate;
				var dateSeparator = date.split("-");
				var yyyy = dateSeparator[0];
				var mm = dateSeparator[1];
				var dd = dateSeparator[2]; 
				var validUptoDate = dd+"/"+mm+"/"+yyyy;
				
				var newRow = "<tr id=dealsOffer_"+dealsList.offerCode+">" + 
				'<td align="center" style="padding:5px"><img height="80px" width="80px" src="/dev/deals_images/' + imageName + '"/></td>' + 
				'<td align="center" style="padding:5px">' + dealsList.companyName + '</td>' + 
				'<td align="center" style="padding:5px">' + dealsList.offer + '</td>' + 
				'<td align="center" style="padding:5px">' + dealsList.offerCode + '</td>' + 
				'<td align="center" style="padding:5px">' + validUptoDate + '</td>' + 
				'<td align="center" style="padding:5px">' + dealsList.offerTerms + '</td>' + 
				'<td align="center" class="verification" style="padding:5px">' + displayTrueFalseForInt(parseInt(dealsList.isVerify)) + '</td>' + 
				'<td align="center" style="padding:5px">' + "<button class=\'verifiedbtn\' onclick= \'verifiedDealByOfferCode(\""+dealsList.offerCode+"\", event, this)\'>Verify</button>" + '</td>' +
				'<td align="center" style="padding:5px">' + "<button class=\'delbtn\' onclick= \'deleteDealByOfferCode(\""+dealsList.offerCode+"\", \""+imageName+"\", event, this)\'>Delete</button>" + '</td>' + 
				"</tr>"; 
				$(newRow).appendTo("#listOfDeals tbody");
			});
		}
		else {
			alert("No Deals in the database!");
		}
	});
});

function displayTrueFalseForInt(isVerified) {
	if(isVerified === 0) {
		return "Not Verified";
	}
	return "Verified";
}

function verifiedDealByOfferCode(offerCode, event, verifiedrow) {
	var data = {
		offerCode : offerCode,
		isVerify : 1,
		method : 'verifyDeals',
		format : 'json'
	};
	jQuery.ajax({
		url : '/dev/api/ziftapi.php',
		type : "POST",
		data : data,
		success : function() {
			alert('Verified successfully');
			var dealsByOfferCodeVerifying = "dealsOffer_"+offerCode;
			$("#"+dealsByOfferCodeVerifying).children(".verification").html("Verified");
		},
		error : function() {
			alert('There is error while verify');
		}
	});
}

function deleteDealByOfferCode(offerCode, imageName, event, delrow) {
	var data = {
		offerCode : offerCode,
		imageName : imageName,
		method : 'deleteDeals',
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