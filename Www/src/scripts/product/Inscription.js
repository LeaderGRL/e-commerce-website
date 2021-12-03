import axios from 'axios';
export const expRegister = class Register{

  constructor(){

  }

  load(pseudo, firstname, lastname, age, country, city, address, address2, phone, mail, password){
    console.log("LE PSEUDO C'EST : " + password)
    return new Promise((resolve, reject) => {
      const url = "http://localhost/Leader/Www/src/backend/inscription/inscription.php"
        axios.post(url, {
            pseudo : pseudo,
            firstname : firstname,
            lastname : lastname,
            age : age,
            country : country,
            city, city,
            address : address,
            address2 : address2,
            phone : phone,
            mail : mail,
            password : password
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