function get<T>(url: string) { return Promise.resolve() }
function post<T>(url: string, content: any) { return Promise.resolve() }

const axios = {
  get,
  post,
}

export {
  axios,
}