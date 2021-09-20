import { writable } from 'svelte/store'
import { request } from '$lib/data/fetch-client'
import { GET_STUDENTS, CREATE_STUDENT } from './_queries'

const createStudentStore = () => {
  const { subscribe, set, update } = writable()
  return {
    subscribe,
    get: async () => {
      const getResponse = await request(GET_STUDENTS)
      set(getResponse.students)
    },
    create: async input => {
      const createResponse = await request(CREATE_STUDENT, input)
      update(previous => [...previous, createResponse.createStudent])
      return createResponse.createStudent
    },
  }
}

export const students = createStudentStore()
