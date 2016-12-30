export function createAdmin(admin){
  return {type: 'CREATE_ADMIN', admin};
}
export function getAdmin(admin){
  return {type: 'GET_ADMIN', admin};
}
export function deleteAdmin(admin){
  return {type: 'DELETE_ADMIN', admin};
}
