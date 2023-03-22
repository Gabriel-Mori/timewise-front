import http from '../http'

export namespace EmployeeService {
  export async function getEmployee(
    searchTerm?: any,
    pageSize?: any,
    pageNumber?: any,
  ) {
    if (!pageSize && !pageNumber) {
      return http.get(`/employee/v2?searchTerm=${searchTerm}`)
    }

    return http.get(
      `/employee/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${
        pageNumber - 1
      }`,
    )
  }

  export async function getList(
    searchTerm?: any,
    pageSize?: any,
    pageNumber?: any,
  ) {
    return http.get(
      `/employee/v2/get-list?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${
        pageNumber - 1
      }`,
    )
  }

  export async function getEmployeeById(id: any) {
    return http.get(`/employee/${id}`)
  }

  export async function saveEmployee(params: any) {
    return http.post('/employee', params)
  }

  export async function deleteEmployee(id: any) {
    return http.delete(`/employee/${id}`)
  }
}
