import http from '../http'

export namespace ProjectService {
  export async function getProject(
    searchTerm?: any,
    pageSize?: any,
    pageNumber?: any,
  ) {
    if (!pageSize && !pageNumber) {
      return http.get(`/project/v2?searchTerm=${searchTerm}`)
    }

    return http.get(
      `/project/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${
        pageNumber - 1
      }`,
    )
  }

  export async function saveProject(params: any) {
    return http.post('/project', params)
  }

  export async function deleteProject(id: any) {
    return http.delete(`/project/${id}`)
  }
}
