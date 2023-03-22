import axios from 'axios'
import { constants } from '../constants'

export namespace AuthService {
  export async function login(user: string, password: string) {
    return axios
      .post(`${constants.baseAPI}/api/public/auth?longToken=false`, {
        user,
        password,
      })
      .then((response: any) => {
        const data = response.data

        return {
          id: data.id,
          username: data.username,
          phone: data.phone,
          picture: data.picture,
          token: data.token,
          employee: {
            ...data.employee,
          },
        }
      })
  }

  export async function me(token: string) {
    return axios.get(`${constants.baseAPI}/public/token/get/${token}`)
  }

  export async function companies(token: string) {
    return axios.get(
      `${constants.baseAPI}/api/public/token/organizations/${token}`,
    )
  }
}
