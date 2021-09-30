<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { push } from 'svelte-spa-router';
  import InputCustom from '../Components/InputCustom.svelte';
  import Session from '../session.js';
  Session.session();

  let user = JSON.parse(localStorage.getItem('user'));
  let foto = JSON.parse(localStorage.getItem('foto'));

  const guardar = () => {
    const form = document.getElementById('formGuardar');
    axios
      .post('http://localhost/sveltePHP/posts/altaPost.php', new FormData(form))
      .then((res) => {
        console.log(res.data);
        if (res.data === 'success') {
          Swal.fire('Exito', 'Tu post fue guardado correctamente', 'success');
          push('/Inicio');
        } else {
          Swal.fire('Error', 'Tu post no pudo ser guardado', 'error');
        }
      });
  };
</script>

<form on:submit|preventDefault={guardar} autocomplete="off" id="formGuardar">
  <h1>Guardar</h1>
  <input type="hidden" name="usuario" bind:value={user} />
  <input type="hidden" name="foto" bind:value={foto} />

  <InputCustom id="titulo" name="titulo" label="Título del post" icon="title" />
  <InputCustom id="post" name="post" label="Escribe el post" icon="comment" />
  <button class="btn blue" type="submit"> Guardar post</button>
</form>
