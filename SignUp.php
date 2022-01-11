<?php
	$email = $_POST['email'];
  $firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
  $birthday = $_POST['birthday']
  $uname = $_POST['uname']
  $password = $_POST['password'];

	// Database connection
	$conn = new mysqli('http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=data&table=registration&pos=0','root','','data');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into registration(email, firstName, lastName, birthday, password, uname) values(?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssi", $email, $firstName, $lastName,$birthday, $password, $uname);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>
