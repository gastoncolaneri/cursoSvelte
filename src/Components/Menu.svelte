<script>
  import { link, push } from 'svelte-spa-router';
  import axios from 'axios';
  import { token } from '../store.js';
  const salir = () => {
    const tokenPHP = JSON.parse(localStorage.getItem('token'));
    axios
      .post('http://localhost/sveltePHP/login/salir.php?token=' + tokenPHP)
      .then((res) => {
        if (res.data === 'success') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('foto');
          token.set(0);
          push('/');
        }
      });
  };
</script>

<nav class="blue pl10 pr10">
  <div class="nav-wrapper">
    <a href="/Inicio" use:link class="brand logo"> Svelte-PHP</a>
    {#if $token === 1}
      <ul class="hide-on-med-and-down right">
        <li><a href="/Inicio" use:link>Inicio</a></li>
        <li><a href="/Guardar" use:link>Guardar</a></li>
        <li><a href="#/" use:link on:click={salir}>Salir</a></li>
      </ul>
    {/if}
  </div>
</nav>

<style>
  .pl10 {
    padding-left: 20px;
  }
  .pr10 {
    padding-right: 20px;
  }
</style>
