export const GET_STUDENTS =
  'query getStudents { students { key, name, birthdate } }'

export const CREATE_STUDENT = `
mutation createStudent($name: String, $birthdate: String, $languages: String) {
  createStudent(name: $name, birthdate: $birthdate, languages: $languages) {
    key
    name
    birthdate
    languages
  }
}
`
