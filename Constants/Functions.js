
 export function compareByName (i, j) {
  if(i.name < j.name){
    return -1
  }
  else if(i.name > j.name){
    return 1
  }
  return 0
}

export function compareByStudentName (i, j) {
  if(i.studentName < j.studentName){
    return -1
  }
  else if(i.studentName > j.studentName){
    return 1
  }
  return 0
}

export function compareByCourseName (i, j) {
  if(i.course_name < j.course_name){
    return -1
  }
  else if(i.course_name > j.course_name){
    return 1
  }
  return 0
}