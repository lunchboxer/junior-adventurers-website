const endpoint = process.env.API_ENDPOINT

export const request = async (query, variables) => {
  const coldAuth =
    typeof localStorage !== 'undefined' && localStorage.getItem('auth')
  const token = coldAuth ? JSON.parse(coldAuth).token : undefined
  const body =
    typeof query === 'function'
      ? query(variables)
      : JSON.stringify({ query, variables })
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
    throw result.errors
  }
}
