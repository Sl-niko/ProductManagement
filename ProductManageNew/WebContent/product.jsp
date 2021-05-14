<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1" import="com.Product"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/product.js"></script>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>


	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1 style="text-align:center">Product Management</h1>
				
				<h3><span class="badge badge-warning">+</span>Add Product</h3>
				<form id="formItem" name="formItem">

					product code: <input id="productCode" name="productCode"
						type="text" class="form-control form-control-sm"> <br>

					product name: <input id="productName" name="productName"
						type="text" class="form-control form-control-sm"> <br>
					product price: <input id="productPrice" name="productPrice"
						type="text" class="form-control form-control-sm"> <br>
					product description: <input id="productDesc" name="productDesc"
						type="text" class="form-control form-control-sm"> <br>

					Product Type: <input id="productType" name="productType"
						type="text" class="form-control form-control-sm"> <br>

					Quantity : <input id="productQuantity" name="productQuantity"
						type="text" class="form-control form-control-sm"> <br>

						 <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary">
						
						 <input type="hidden"
						id="hidItemIDSave" name="hidItemIDSave" value="">


				</form>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				<br>
				<div id="divItemsGrid" >
					<%
						Product proobj1 = new Product();
					out.print(proobj1.readProducts());
					%>
				</div>
			</div>
		</div>
	</div>


</body>
</html>