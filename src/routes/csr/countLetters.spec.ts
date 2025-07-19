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

  it('should count the word length', async () => {
    render(Counter)

    const text = screen.getByTestId('palabra') as HTMLInputElement
    await userEvent.type(text, 'hola mundo')

    const resultado = screen.getByTestId('resultado') as HTMLInputElement
    expect(resultado.innerHTML).to.equal('La palabra "hola mundo" tiene 10 letras.')
  })

  it('should navigate to the home page when link is clicked', async () => {
    render(Counter)
    const backLink = screen.getByTestId('back-link') as HTMLAnchorElement
    await userEvent.click(backLink)
    expect(window.location.pathname).toBe('/')
  })
})