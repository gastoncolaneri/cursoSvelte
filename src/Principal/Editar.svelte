<script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import InputCustom from '../Components/InputCustom.svelte';
  import Session from '../session.js';
  Session.session();

  export let params = {};

  let post = {};
  let id = params.id;

  const getPost = () => {
    axios
      .get('http://localhost/sveltePHP/posts/post.php?id=' + id)
      .then((res) => {
        post = res.data;
      });
  };
  onMount(getPost);

  const editar = () => {
    const form = document.getElementById('formEditar');
    axios
      .post(
        'http://localhost/sveltePHP/posts/editarPost.php',
        new FormData(form)
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === 'success') {
          Swal.fire('Exito', 'Tu post fue editado correctamente', 'success');
          push('/Inicio');
        } else {
          Swal.fire('Error', 'Tu post no pudo ser editado', 'error');
        }
      });
  };

  const eliminar = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post('http://localhost/sveltePHP/posts/eliminar.php?id=' + id)
          .then((res) => {
            Swal.fire('Eliminado!', 'El post ha sido eliminado', 'success');
            push('/Inicio');
          });
      }
    });
  };
</script>

<form on:submit|preventDefault={editar} autocomplete="off" id="formEditar">
  <h1>Editar</h1>
  <input type="hidden" name="id" bind:value={id} />

  <InputCustom name="titulo" icon="title" value={post.titulo} editar={false} />
  <InputCustom name="post" icon="comment" value={post.post} editar={false} />
  <button class="btn blue" type="submit"> Editar post</button>
</form>
<br />
<button class="btn red" on:click={eliminar}> Eliminar post</button>
