<script lang="ts">
  import { enhance } from '$app/forms'

  const { form } = $props<{ form: { palabra?: string; longitud?: number } | null }>()
</script>

<div class="row">
  <h1>Contar letras server side</h1>
  <hr />
</div>

<div class="row">
  <form method="POST" use:enhance>
    <input name="palabra" placeholder="Escribí una palabra" data-testid="palabra" required />
    <button type="submit" data-testid="submit">Contar letras</button>
  </form>
</div>

{#if form?.palabra}
  <div class="row">
    <p data-testid="resultado">La palabra "{form.palabra}" tiene {form.longitud} letras.</p>
  </div>
{/if}

<div class="row">
  <a data-testid="back-link" class="link" href="/">Volver</a>
</div>
