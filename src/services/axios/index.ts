import axios, { AxiosError } from 'axios'
import Router from 'next/router'
import { parseCookies } from 'nookies'

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      authorization: `Bearer ${cookies['vittoauth.token']}`
    }
  })
  return api
}
