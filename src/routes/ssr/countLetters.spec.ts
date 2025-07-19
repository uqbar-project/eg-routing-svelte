import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import Counter from './+page.svelte'
import userEvent from '@testing-library/user-event'

describe('count letters', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should start with empty string and should show no result', () => {
    render(Counter)

    const text = screen.getByTestId('palabra') as HTMLInputElement
    expect(text.value).to.equal('')
    expect(screen.queryByTestId('resultado')).not.toBeTruthy()
  })

  it('should show the word length when a word is passed as props', async () => {
    render(Counter, {
      props: {
        form: {
          palabra: 'hola',
          longitud: 4
        }
      }
    })
    const palabra = await screen.getByTestId('palabra') as HTMLInputElement
    expect(palabra.value).to.equal('')
    expect(screen.getByTestId('resultado').textContent).to.equal('La palabra "hola" tiene 4 letras.')
  })

  it('should navigate to the home page when link is clicked', async () => {
    render(Counter)
    const backLink = screen.getByTestId('back-link') as HTMLAnchorElement
    await userEvent.click(backLink)
    expect(window.location.pathname).toBe('/')
  })

  it('envía la palabra correctamente al hacer submit', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        type: 'success',
        data: { palabra: 'hola', longitud: 4 }
      })
    })

    globalThis.fetch = mockFetch

    render(Counter, { props: { form: null } })

    const input = screen.getByTestId('palabra')
    const submit = screen.getByTestId('submit')

    await userEvent.type(input, 'hola')
    await userEvent.click(submit)

    // Verificar que se llamó fetch
    expect(mockFetch).toHaveBeenCalled()

    // Verificamos el FormData enviado
    const fetchCall = mockFetch.mock.calls[0]
    const requestInit = fetchCall[1] as RequestInit
    expect(requestInit.body).toBeInstanceOf(URLSearchParams)
    const params = new URLSearchParams(requestInit.body as string)
    expect(params.get('palabra')).toBe('hola')
  })


})