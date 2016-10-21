export function createPolls(poll){
  return {type: 'CREATE_POLLS',poll};
}
export function deletePolls(poll){
  return {type: 'DELETE_POLLS',poll};
}
