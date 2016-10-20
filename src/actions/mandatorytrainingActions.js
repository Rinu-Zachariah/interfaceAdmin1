export function createMandatoryTrainings(mandatorytrainings){
  return {type: 'CREATE_MANDATORYTRAININGS',mandatorytrainings};
}
export function deleteMandatoryTrainings(mandatorytrainings){
  return {type: 'DELETE_MANDATORYTRAININGS',mandatorytrainings};
}
