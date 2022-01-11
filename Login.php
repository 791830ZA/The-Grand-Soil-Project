<?php
	$email = $_POST['email'];
  $uname = $_POST['uname']
// Database connection
	$conn = new mysqli('http://localhost/phpmyadmin/index.php?route=/sql&server=1&db=data&table=registration&pos=0','root','','data');
	if($conn->connect_error){
		echo "$conn->connect_error";
  } else {
		$stmt = $conn->prepare("select * from registration where email =?")
    $stmt->bind_param("s",$email);
    $stmt->execute();
    $stmt_result = $stmt->get_result();
    if($stmt_result->num_rows > 0 ){
        $data = $stmt_result->fetch_assoc();
        if($data['password']===){
          echo"<h2>Login successfully</h2>";

        }else{
          "<h2>Invalid Email or password<h2>";
        }
    }else{
      echo "<h2>Invalid Email or password<h2>";
    }
?>
