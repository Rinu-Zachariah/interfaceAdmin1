export function deleteStory(successstory){
  return {type: 'DELETE_STORIES',successstory};
}
export function getStory(successstory){
  return {type: 'GET_STORIES',successstory};
}
