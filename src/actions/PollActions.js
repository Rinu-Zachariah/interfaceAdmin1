export function createPolls(poll){
  return {type: 'CREATE_POLLS',poll};
}
export function deletePolls(poll){
  return {type: 'DELETE_POLLS',poll};
}
export function getPolls(poll){
  return {type: 'GET_POLLS',poll};
}
