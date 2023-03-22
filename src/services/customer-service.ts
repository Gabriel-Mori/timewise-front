import http from '../http'

export namespace CustomerService {
  export async function getCustomer(
    searchTerm?: any,
    pageSize?: any,
    pageNumber?: any,
  ) {
    if (!pageSize && !pageNumber) {
      return http.get(`/customer/v2?searchTerm=${searchTerm}`)
    }

    return http.get(
      `/customer/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${
        pageNumber - 1
      }`,
    )
  }

  export async function saveCustomer(params: any) {
    return http.post('/customer', params)
  }

  export async function deleteCustomer(id: string | number) {
    return http.delete(`/customer/${id}`)
  }
}
