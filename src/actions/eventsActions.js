export function createEvents(event){
  return {type: 'CREATE_EVENTS',event};
}
export function deleteEvents(event){
  return {type: 'DELETE_EVENTS',event};
}
export function isEditingEvents(event){
  return {type: 'IS_EDITING_EVENTS',event};
}
export function editEvents(event,index){
  return {type: 'EDIT_EVENTS',event,index};
}
