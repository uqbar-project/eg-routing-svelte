
## Ejercicio routing

[![Build](https://github.com/uqbar-project/eg-routing-svelte/actions/workflows/build.yml/badge.svg)](https://github.com/uqbar-project/eg-routing-svelte/actions/workflows/build.yml) [![codecov](https://codecov.io/gh/uqbar-project/eg-routing-svelte/graph/badge.svg?token=CoIkZl3HJ6)](https://codecov.io/gh/uqbar-project/eg-routing-svelte)

## El ejemplo

Queremos tener

- un input para ingresar un texto
- opcionalmente podemos tener un botón...
- ...y deberíamos visualizar la longitud del texto que ingresamos

## El menú principal

En el menú principal podemos ir a dos páginas diferentes:

- la url `http://localhost:5173/csr`, donde vemos el ejemplo Client Side Rendering
- la url `http://localhost:5173/ssr`, donde vemos el ejemplo Server Side Rendering

Acá comenzamos a ver cómo funciona el mecanismo de routing de Svelte, que está basado en el de un file system:

```
+ src
  - routes
    - +page.svelte <== acá está el menú principal
    + csr
      - +page.svelte <== está la página apuntada por la url `/csr`
    + ssr
      - +page.svelte <== está la página apuntada por la url `/ssr`
```

Entonces por defecto en `src/routes` están las páginas, vos [podés cambiar la configuración `routes` de tu proyecto](https://svelte.dev/docs/kit/routing#:~:text=by%20editing%20the-,project%20config,-.).

## Client-side rendering (CSR)

<img src="./images/input_csr.png" alt="input client side" height="auto" width="30%">

La resolución es bastante simple, nos alcanza con modelar un `$state` que esté bindeado al input y luego utilizarlo para calcular la longitud:

```svelte
<script lang="ts">
let palabra = $state('')
</script>
...
<div class="row">
  <input name="palabra" data-testid="palabra" bind:value={palabra} placeholder="Escribí una palabra" required />
</div>
...
{#if palabra}
  <div class="row">
    <p data-testid="resultado">La palabra "{palabra}" tiene {palabra.length} letras.</p>
  </div>
{/if}
```

Cuando hablamos de "client-side" tenemos en cuenta la interacción entre nuestro navegador local y el servidor web que está hosteando nuestra aplicación.

<img src="./images/csr-architecture.png" alt="csr architecture" height="auto" width="50%">

Entonces la primera vez que cargamos la página

- nuestro "server" (el localhost:5173 que sirve la app web Svelte) nos envía html
- pero también código javascript
- especialmente el que forma parte del framework de Svelte

Si presionás F12, en la solapa Network vas a poder ver una gran cantidad de descargas de archivos de distinto tipo. Pero ojo, esto ocurre solo la primera vez que comienza la aplicación, o bien si forzás la recarga (con Ctrl + Shift + R).

<img src="./images/csr_network_browser.png" height="auto" width="70%">

Si borrás la interacción 

<img src="./images/csr_delete_network_log.png" alt="delete network log" height="auto" width="20%">

y después escribís en el input, vas a ver que no se dispara ningún pedido hacia el server. El trabajo es absolutamente local, en nuestro cliente.

<img src="./images/csr_all_local.gif" alt="client side solo local" height="auto" width="60%">

Más adelante vamos a ver ejemplos donde quizás necesitemos disparar una búsqueda de información al server, aun así seguimos manteniendo la naturaleza client-side: solo vamos al server para buscar datos pero el control de los elementos del DOM se hace siempre en nuestro navegador. Esto implica navegar a otras páginas, mostrar más información o hacer aparecer nuevos elementos visuales, entre otras cosas.

## Server-side rendering (SSR)

