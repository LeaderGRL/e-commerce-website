<?php
    require '../../db_connect.php';
    class connexion extends db_connect{
        function conn(){
            //$_POST = json_decode(file_get_contents("php://input"),true);
            $request_body = file_get_contents('php://input');
            $data = json_decode($request_body, true);
            $this -> connexion();
            if(!empty($data)){
                $select = 'SELECT * FROM utilisateur WHERE email = "'.$data['email'].'" AND password = "'.$data["password"].'"';
                $user = $this -> mysqli -> query($select);
                if(!$user){
                    echo 'error select : utilisateur' . $this -> mysqli -> error();
                }
                
                $result = "Connexion";
            
                while($row = mysqli_fetch_array($user)) {
                    $result = $row['pseudo']; // Print a single column data
                }

                $rows = mysqli_num_rows($user);
                if($rows == 1){
                    $_SESSION["pseudo"] = $result;
                    $this -> mysqli -> close();
                    header('Content-Type: application/json');
                    echo json_encode($result);
                    return json_encode($result);
                    //header('Location: index');
                    exit();
                } else {
                    header('Content-Type: application/json');
                    echo json_encode("connexion");
                    return json_encode('connexion');
                }
                //return $result;
                }
            
        } 
    }

    $test = new connexion;
    $test -> conn();
?>