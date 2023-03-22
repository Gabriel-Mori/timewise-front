import http from "../http"

export namespace CompanyService {

  export async function getCompany(searchTerm?: any, pageSize?: any, pageNumber?: any) {
    return http.get(`/company/v2?searchTerm=${searchTerm}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}`)
  }

  export async function saveCompany(params: any) {
    return http.post("/company", params)
  }
}