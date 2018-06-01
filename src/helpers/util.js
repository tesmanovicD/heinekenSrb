import Request from 'superagent';

// export function getUsers() {
//     return Request.get("https://api.myjson.com/bins/6tpu2")
//             .ok(res =>res.status < 300)
//             .then(response => response.body) 
// }

export function getUsers() {
  return Request.get("http://localhost:4000/korisnici/listaKorisnika")
          .ok(res =>res.status < 300)
          .then(response => response.body) 
}

export function logUser(user) {
    return getUsers()
        .then(users => {
            const userDetails = users.find(x => {
                return x.email === user.email && x.lozinka === user.lozinka;
            }
            )
            return userDetails;         
        })
    
}

export function confirmAlert(action) {
    let msg = "";

    switch(action) {
      case "delete":
        msg = "Da li ste sigurni da zelite obrisati korisnika";
        break;
      case "logout":
        msg = "Da li ste sigurni da zelite da se odjavite";
        break;
      default: 
        return msg;
    }
    
    if(window.confirm(msg)) {
      return true;
    } else {
      return false;
    }
}