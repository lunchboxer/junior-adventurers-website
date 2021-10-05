import { writable } from 'svelte/store'
import { request } from '$lib/data/fetch-client'
import { GET_STUDENTS, CREATE_STUDENT, RESET_CREDIT } from './_queries'

const alphaSort = items => {
  return items.sort((a, b) => {
    if (a.name > b.name) return 1
    if (a.name < b.name) return -1
    return 0
  })
}
const createStudentStore = () => {
  const { subscribe, set, update } = writable()
  return {
    subscribe,
    update,
    get: async () => {
      const getResponse = await request(GET_STUDENTS)
      console.log(alphaSort(getResponse.students))
      set(alphaSort(getResponse.students))
    },
    create: async input => {
      const createResponse = await request(CREATE_STUDENT, input)
      update(previous => alphaSort([...previous, createResponse.createStudent]))
      return createResponse.createStudent
    },
    resetCredits: async (studentIds, credit) => {
      const resetResponse = await request(RESET_CREDIT, { studentIds, credit })
      set(alphaSort(resetResponse.resetCredit))
    },
  }
}

export const students = createStudentStore()
