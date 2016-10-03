export function createQuicklinks(quicklinks){
  return {type: 'CREATE_QUICKLINKS',quicklinks};
}
export function deleteQuicklinks(quicklinks){
  return {type: 'DELETE_QUICKLINKS',quicklinks};
}
