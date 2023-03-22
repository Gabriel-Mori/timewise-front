import http from '../http'

export namespace TimesheetService {
  export async function getTimeSheet(pageSize?: any, pageNumber?: any) {
    return http.get(
      `/timesheet/v2?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`,
    )
  }

  export async function saveTimeSheet(params: any) {
    return http.post('/timesheet', params)
  }

  export async function deleteTimesheet(id: any) {
    return http.delete(`/timesheet/${id}`)
  }
}
