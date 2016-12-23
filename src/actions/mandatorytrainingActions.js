export function createMandatoryTrainings(mandatorytrainings){
  return {type: 'CREATE_MANDATORYTRAININGS',mandatorytrainings};
}
export function deleteMandatoryTrainings(mandatorytrainings){
  return {type: 'DELETE_MANDATORYTRAININGS',mandatorytrainings};
}
export function isEditingMandatoryTrainings(mandatorytrainings){
  return {type: 'IS_EDITING_MANDATORYTRAININGS',mandatorytrainings};
}
export function editMandatoryTrainings(mandatorytrainings){
  return {type: 'EDIT_MANDATORYTRAININGS',mandatorytrainings};
}
export function getTrainings(mandatorytrainings){
  return {type: 'GET_MANDATORYTRAININGS',mandatorytrainings};
}
