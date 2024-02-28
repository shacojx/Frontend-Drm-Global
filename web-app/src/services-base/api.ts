import { API_DOMAIN } from "../_loadEnv";

type ApiMethod = 'GET' | 'POST'
export async function callApi<T>(method: ApiMethod, path: string, params: any): Promise<T> {
  try {
    const apiUrl = new URL(path, API_DOMAIN)
    const response = await fetch(
      apiUrl,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    )
    if (!response.ok) {
      throw new Error('API return error')
    }
    return await response.json()
  } catch (e) {
    console.error(e)
    throw new Error('API return error')
  }

}
