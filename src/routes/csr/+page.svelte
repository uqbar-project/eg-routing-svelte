<script lang="ts">
let palabra = $state('')
</script>

<div class="row">
  <h1>Contar letras client side</h1>
  <hr />
</div>

<div class="row">
  <input name="palabra" data-testid="palabra" bind:value={palabra} placeholder="Escribí una palabra" required />
</div>
<div class="row">
  <a class="link" data-testid="back-link" href="/">Volver</a>
</div>

{#if palabra}
  <div class="row">
    <p data-testid="resultado">La palabra "{palabra}" tiene {palabra.length} letras.</p>
  </div>
{/if}