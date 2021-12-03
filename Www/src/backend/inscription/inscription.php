<?php
    require '../../db_connect.php';
    class inscription extends db_connect{

        function inscriptionQuerry(){
            $this -> connexion();
            $request_body = file_get_contents('php://input');
            $data = json_decode($request_body, true);

            if(!empty($data)){
                if(!$this -> mysqli -> query('INSERT INTO adress(country, city, adressLine1, adressLine2) VALUES ("'.$data["country"].'", "'.$data["city"].'", "'.$data["address"].'", "'.$data["address2"].'")')){
                    echo "Erreur d'inscription - adress : " . $this -> mysqli -> error;
                }
    
                $select ='SELECT adressId FROM adress WHERE country = "'.$data["country"].'" AND city = "'.$data["city"].'" AND adressLine1 = "'.$data["adress"].'" AND adressLine2 = "'.$data["adress2"].'"';
                $adressId = $this -> mysqli -> query($select);
                if(!$adressId){
                    echo "Erreur d'inscription - select adressId : " . $this -> mysqli -> error();
                }
    
                $result = 0;
    
                while($row = mysqli_fetch_array($adressId)) {
                    $result = $row['adressId']; // Print a single column data
                }
    
                if(!$this -> mysqli -> query(
                                            'INSERT INTO utilisateur(firstname, lastname, age, email, pseudo, password, adressId)
                                             VALUES ("'.$data["firstname"].'", "'.$data["name"].'", "'.$data["age"].'", "'.$data["email"].'", "'.$data["pseudo"].'", "'.$data["password"].'", "'.$result.'")'
                                        )){
                                             echo "Erreur d'inscription - utilisateur : " . $this -> mysqli -> error;
                                          }
                $this -> mysqli -> close();                          
                //header('Location: ../connexion/connexion.php');
                                          
            }
        }
    
    }
            
    $inscription = new inscription;
    $inscription -> inscriptionQuerry();
?>