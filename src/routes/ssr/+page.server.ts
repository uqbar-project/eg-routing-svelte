import type { Actions } from './$types'

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData()
    const palabra = formData.get('palabra')?.toString() || ''
    const longitud = palabra.length
    return { palabra, longitud }
  }
}
