export function deleteContributors(contributor){
  return {type: 'DELETE_CONTRI',contributor};
}
export function createcontributors(contributor){
  return {type: 'CREATE_CONTRI',contributor};
}
export function isEditingContributors(contributor){
  return {type: 'IS_EDITING_CONTRI',contributor};
}
export function editContributor(contributor){
  return {type: 'EDIT_CONTRIBUTORS',contributor};
}
