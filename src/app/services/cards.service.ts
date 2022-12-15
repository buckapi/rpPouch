import {Card} from 'src/app/interfaces/card';

export const CARDS: Card[] = [
  {
    email:'oficinalabcel@protonmail.com',
    userType: 'admin',
    name:'David',
    idApp: 'bc000001',

    bramch:"634bbee1d8d2632d682d47ae",
    sex: 'f',
    admin:true,
    branch:'Oficina',
    role:"administrator",
     categories:[      
      'otro'
    ],
    userId:'a37e7bd9-3df7-4c33-a51e-ddfd5e7f8b5a',
    images:[
      'assets/assetsdash/images/profile/captain.png',
      'jamundi'
    ],
    idBranch:'br000001',
    idCard:'ur000001'
  } ,
  {
    bramch:"633bdfaf41e2155dd5d1f6cb",
    email:'junior.marquez.sohigh0@gmail.com',
    userType: 'sucursal',
    name:'Junior',
    idApp: 'bc000001',
    sex: 'm',
    admin:false,
    branch:'colinas del sur',
    role:"sucursal",
    userId:'55ed4514-30d6-487c-9c65-85b7428e412b',
    images:[
      'assets/assetsdash/images/profile/profile.png',
      'jamundi'
    ],
    categories:[
      'compra de insumo',
      'vale de empleado',
      'pago de servicio',
      'otro'
    ],
    idBranch:'br000002',
    idCard:'ur000002'

  },
    {
      bramch:"634b008fd8d2632d681c6c05",
    email:'hidalgolabcel@protonmail.com',
    userType: 'sucursal',
    name:'Hidalgo',
    idApp: 'bc000001',
    admin:false,
    sex: 'm',
    branch:'hidalgo',
    role:"sucursal",
     categories:[
      'compra de insumo',
      'pago tecnico extra',
      'vale de empleado',
      'pago de servicio',
      'otro'
    ],
    userId:'bb95765f-b322-4607-9655-8251447eccb2',
    images:[
      'assets/assetsdash/images/profile/profile.png',
      'jamundi'
    ],
    idBranch:'br000003',
    idCard:'ur000003'

  }
  
  
];