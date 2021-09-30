<script>
  import { link, push } from 'svelte-spa-router';
  import InputCustom from '../Components/InputCustom.svelte';
  import File from '../Components/File.svelte';
  import Swal from 'sweetalert2';
  import axios from 'axios';

  let pass = '';
  let pass2 = '';
  let email = '';
  let show = false;
  const registrarse = () => {
    if (pass === pass2) {
      const form = document.getElementById('registroForm');
      axios
        .post(
          'http://localhost/sveltePHP/login/registro.php',
          new FormData(form)
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === 'success') {
            Swal.fire('Exito', 'Registrado correctamente', 'success');
            push('/');
          } else {
            Swal.fire('Error', 'Error al registrarte', 'error');
          }
        });
    } else {
      Swal.fire('Error', 'Las contraseñas deben coincidir', 'error');
    }
  };

  const validarEmail = () => {
    if (email != '') {
      const datosEmail = new FormData();
      datosEmail.append('email', email);
      axios
        .post('http://localhost/sveltePHP/login/validarEmail.php', datosEmail)
        .then((res) => {
          if (res.data === 'success') {
            show = true;
          } else {
            show = false;
            Swal.fire(
              'Error',
              'El correo electrónico ingresado ya existe',
              'error'
            );
          }
        });
    }
  };
</script>

<main>
  <h1>Registro</h1>
  <form
    on:submit|preventDefault={registrarse}
    id="registroForm"
    autocomplete="off"
    enctype="multipart/form-data"
  >
    <div class="input-field">
      <i class="material-icons prefix"> email </i>
      <input
        type="email"
        name="email"
        id="email"
        bind:value={email}
        on:blur={validarEmail}
        required
      />
      <label for="email">Email</label>
    </div>
    <InputCustom
      type="password"
      id="pass"
      name="pass"
      label="Contraseña"
      icon="https"
      value={pass}
      on:input={(event) => (pass = event.target.value)}
    />
    <InputCustom
      type="password"
      id="pass2"
      name="pass"
      label="Repetir contraseña"
      icon="https"
      value={pass2}
      on:input={(event) => (pass2 = event.target.value)}
    />
    <InputCustom
      id="usuario"
      name="usuario"
      label="Usuario"
      icon="account_circle"
    />
    <File />
    {#if show}
      <button type="submit" class="btn blue"> Registrarse</button>
    {/if}

    <a href="/" use:link class="btn green"> Login </a>
  </form>
</main>
