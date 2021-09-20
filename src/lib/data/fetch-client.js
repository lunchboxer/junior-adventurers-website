import { variables } from '$lib/environment.js'
import { dev } from '$app/env'

const { endpoint } = variables

export const request = async (query, variables) => {
  const coldAuth =
    typeof localStorage !== 'undefined' && localStorage.getItem('auth')
  const token = coldAuth ? JSON.parse(coldAuth).token : undefined
  const body = JSON.stringify({ query, variables })
  const response = await fetch(endpoint, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || '',
    },
    body,
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    if (dev === true) console.error(result.errors)
    throw result.errors
  }
}
