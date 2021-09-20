import { writable } from 'svelte/store'
import { request } from '$lib/data/fetch-client'
import { GET_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from './_queries'

const createStudentStore = () => {
  const { subscribe, set } = writable()
  return {
    subscribe,
    get: async key => {
      if (!key) return
      const getResponse = await request(GET_STUDENT, { key })
      set(getResponse.student)
    },
    delete: async key => {
      if (!key) return
      await request(DELETE_STUDENT, { key })
      set()
    },
    patch: async input => {
      const updateResponse = await request(UPDATE_STUDENT, input)
      if (updateResponse && updateResponse.updateStudent) {
        set(updateResponse.updateStudent)
      }
    },
  }
}

export const student = createStudentStore()
