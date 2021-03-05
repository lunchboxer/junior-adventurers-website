export const GET_STUDENT = `
  query GetStudent ($key: ID!) {
    student (key:$key) {
      key
      name
      birthdate
      languages
    }
  }`

export const DELETE_STUDENT = `
  mutation DeleteStudent ($key: ID!) {
    deleteStudent (key: $key) {
      key
    }
  }`

export const UPDATE_STUDENT = `
  mutation UpdateStudent ($key: ID!, $name: String, $birthdate: String, $languages: String) {
    updateStudent (key: $key, name: $name, birthdate: $birthdate, languages: $languages) {
      key
      name
      birthdate
      languages
    }
  }`
