interface Admin {
    adminname:string;
    adminage:number;
    adminaddress:string
}

interface User {
    username:string;
    userage:number;
    useraddress:string
}

type Person = Admin | User;

//  interface Person extends Admin,User {
//  }

 export {Person};