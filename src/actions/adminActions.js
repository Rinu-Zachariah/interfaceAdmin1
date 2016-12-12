export function createAdmin(admin){
  return {type: 'CREATE_ADMIN',admin};
}
export function getAdmin(){
  return {type: 'GET_ADMIN'};
}
