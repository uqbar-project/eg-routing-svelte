// tests/page.server.test.ts
import { describe, it, expect } from 'vitest'
import { actions } from './+page.server'
import type { RequestEvent } from '@sveltejs/kit'
import type { RouteParams } from './$types'

describe('actions.default', () => {
  it('debería devolver palabra y longitud', async () => {
    const mockRequest = {
      formData: async () =>
        new Map([['palabra', 'svelte']]) as unknown as FormData
    }

    // Simulamos el objeto RequestEvent mínimamente
    const event = { request: mockRequest } as unknown as RequestEvent<RouteParams, '/ssr'>

    const result = await actions.default(event)
    expect(result).toEqual({
      palabra: 'svelte',
      longitud: 6
    })
  })
})
