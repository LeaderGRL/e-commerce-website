import axios from 'axios';
export const expProd = class prod{

  constructor(){

  }

  load(id){
    return new Promise((resolve, reject) => {
      const url = "http://localhost/Leader/Www/src/backend/product/product.php"
        axios.get(url, {
          params: {
            id: id
          }
        })
        .then(function (response) {
          resolve(response)
          console.log(resolve(response))
        })
        .catch(function (error) {
          console.log(error);
        }) 
      }
    )}
}

//let test = new prod();
//test.load();