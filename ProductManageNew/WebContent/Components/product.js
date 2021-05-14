
$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});


$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "ProductAPI",
		type : type,
		data : $("#formItem").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onItemSaveComplete(response.responseText, status);
		}
	});
});

function onItemSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}

function onItemDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}


$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "ProductAPI",
		type : "DELETE",
		data : "productID=" + $(this).data("itemid"),
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
		}
	});
});

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidItemIDSave").val($(this).data("itemid"));
	$("#productCode").val($(this).closest("tr").find('td:eq(0)').text());
	$("#productName").val($(this).closest("tr").find('td:eq(1)').text());
	$("#productPrice").val($(this).closest("tr").find('td:eq(2)').text());
	$("#productDesc").val($(this).closest("tr").find('td:eq(3)').text());
	$("#productType").val($(this).closest("tr").find('td:eq(4)').text());
	$("#productQuantity").val($(this).closest("tr").find('td:eq(5)').text());
});



//CLIENT-MODEL================================================================
function validateItemForm() {
	// CODE
	if ($("#productCode").val().trim() == "") {
		return "Insert product Code.";
	}
	// NAME
	if ($("#productName").val().trim() == "") {
		return "Insert product Name.";

	}
	// PRICE-------------------------------
	if ($("#productPrice").val().trim() == "") {
		return "Insert product Price.";
	}
	if ($("#productDesc").val().trim() == "") {
		return "Insert product Price.";
		
	}if ($("#productType").val().trim() == "") {
		return "Insert product Price.";
	}
	// is numerical value
	var tmpPrice = $("#productPrice").val().trim();
	if (!$.isNumeric(tmpPrice)) {
		return "Insert a numerical value for product Price.";
	}
	// convert to decimal price
	$("#productPrice").val(parseFloat(tmpPrice).toFixed(2));
	// DESCRIPTION------------------------
	if ($("#productQuantity").val().trim() == "") {
		return "Insert product Description.";
	}
	return true;
}
