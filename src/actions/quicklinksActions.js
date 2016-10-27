export function createQuicklinks(quicklinks){
  return {type: 'CREATE_QUICKLINKS',quicklinks};
}
export function deleteQuicklinks(quicklinks){
  return {type: 'DELETE_QUICKLINKS',quicklinks};
}
export function isEditingQuicklinks(quicklinks){
  return {type: 'IS_EDITING_QUICKLINKS',quicklinks};
}
export function editQuicklinks(quicklinks){
  return {type: 'EDIT_QUICKLINKS',quicklinks};
}
