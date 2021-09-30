<script>
  import { link, push } from 'svelte-spa-router';
  import InputCustom from '../Components/InputCustom.svelte';
  import axios from 'axios';
  import Swal from 'sweetalert2';

  const ls = localStorage.getItem('token');

  $: if (ls != null) {
    push('/Inicio');
  }

  const login = () => {
    const form = document.getElementById('loginForm');
    axios
      .post('http://localhost/sveltePHP/login/login.php', new FormData(form))
      .then((res) => {
        if (res.data.res === 'success') {
          localStorage.setItem('token', JSON.stringify(res.data.token));
          push('/Inicio');
        } else {
          localStorage.removeItem('token');
          localStorage.clear();
          Swal.fire('Error', 'Email o contraseña incorrectos', 'error');
        }
      });
  };
</script>

<main>
  <h1>Login</h1>
  <form on:submit|preventDefault={login} id="loginForm" autocomplete="off">
    <InputCustom
      type="email"
      id="email"
      name="email"
      label="Email"
      icon="account_circle"
    />
    <InputCustom
      type="password"
      id="pass"
      name="pass"
      label="Contraseña"
      icon="https"
    />

    <button type="submit" class="btn green"> Entrar</button>
    <a href="/Registro" use:link class="btn blue"> Registro </a>
  </form>
</main>
