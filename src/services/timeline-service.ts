import http from "../http";

export namespace TimelineService {

  export async function timelineHandle(id: any,) {
    return http.get(`/timesheet/v2?employee=${id}`)
  }
}