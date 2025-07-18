<script lang="ts">
  import { enhance } from '$app/forms'

  export let form: { palabra?: string; longitud?: number } | null
</script>

<div class="row">
  <h1>Contar letras server side</h1>
  <hr />
</div>

<div class="row">
  <form method="POST" use:enhance>
    <input name="palabra" placeholder="Escribí una palabra" required />
    <button type="submit">Contar letras</button>
  </form>
</div>

{#if form?.palabra}
  <div class="row">
    <p>La palabra "{form.palabra}" tiene {form.longitud} letras.</p>
  </div>
{/if}

<div class="row">
  <a class="link" href="/">Volver</a>
</div>
