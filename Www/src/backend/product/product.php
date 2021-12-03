<?php
    require '../../db_connect.php';
    class product extends db_connect{
        function load(){
            $this -> connexion();
            $request_method = $_SERVER["REQUEST_METHOD"];
            switch($request_method)
            {
              case 'GET':
                if(!empty($_GET["id"]))
                {
                  // Récupérer un seul produit
                  //$id = intval($_GET["id"]);
                  $id = $_GET["id"];
                  $this -> getProducts($id);
                } else {
                  // Récupérer tous les produits
                  $this -> getProducts(null);
                }
                break;
              default:
                // Requête invalide
                header("HTTP/1.0 405 Method Not Allowed");
                break;
            }
        }

        
        function getProducts($id)
        {
            $query = 'SELECT photo.name as "photo_name", product.name as "product_name", product.price
                        FROM `photo` 
                        INNER JOIN product_photo ON photo.photoId = product_photo.photoId
                        INNER JOIN product ON product_photo.productId = product.productId';

            if($id != 0)
            {
                $query .= " WHERE product.productId='".$id."' LIMIT 1";
            } else if($id == 'homme'){
                $query .= " WHERE product.category='".$id."' OR product.category = 'unisex'";
            } else if($id == 'femme'){
                $query .= " WHERE product.category='".$id."' OR product.category = 'unisex'";
            } else if($id == 'unisex'){
                  $query .= " WHERE product.category='".$id."'";
            }
            $response = array();
            $result = $this -> mysqli -> query($query);
            while($row = mysqli_fetch_array($result))
            {
                $response[] = $row;
            }
            header('Content-Type: application/json');
            echo json_encode($response);
            return json_encode($response);

        }
    }

    $test = new product;
    $test -> load();
?>