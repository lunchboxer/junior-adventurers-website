export const GET_STUDENTS =
  'query getStudents { students { key, name, birthdate, credit } }'

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

export const RESET_CREDIT = `
mutation resetCredit($studentIds: [ID!]!, $credit: Int!) {
  resetCredit(studentIds: $studentIds, credit: $credit) {
    key
    name
    birthdate
    credit
  }
}
`
