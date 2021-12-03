import axios from 'axios';
export const expUser = class userConn{

    //-------ATRIBUT-------//

    constructor(){

    }

    load(mail, pass){
        return new Promise((resolve, reject) => {
          const url = "http://localhost/Leader/Www/src/backend/connexion/connexion.php"
            axios.post(url, {
                email: mail,
                password: pass
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