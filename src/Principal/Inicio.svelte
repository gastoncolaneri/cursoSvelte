<script>
  import Session from '../session.js';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  Session.session();

  let usuario;

  const getUser = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    axios
      .post('http://localhost/sveltePHP/posts/user.php?token=' + token)
      .then((res) => {
        usuario = res.data.user;
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('foto', JSON.stringify(res.data.foto));
      });
  };

  onMount(getUser);

  let posts = [];
  let promesa = ajax();
  async function ajax() {
    const res = await fetch('http://localhost/sveltePHP/posts/posts.php');
    posts = await res.json();

    if (res.ok) {
      return posts;
    } else {
      throw new Error('Error de conexión');
    }
  }
</script>

<h1>Bienvenido {usuario}</h1>

{#await promesa}
  <p>Cargando datos...</p>
{:then posts}
  {#each posts as item}
    <div class="row">
      <div class="col s1">
        <img src={item.foto} alt="" width="50" height="50" />
      </div>
      <div class="col s11">
        <b>{item.usuario}</b>
        <h5>
          {item.titulo}
          {#if item.usuario === usuario}
            <a href="/Editar/{item.id}" use:link
              ><i class="material-icons">edit</i></a
            >
          {/if}
        </h5>
        <p>{item.post}</p>
        <hr />
      </div>
    </div>
  {:else}
    <p>No hay datos en la base</p>
  {/each}
{:catch error}
  <p>{error}</p>
{/await}
