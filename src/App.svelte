<script>
  import Router from 'svelte-spa-router';
  import routes from './routes';
  import Menu from './Components/Menu.svelte';
</script>

<main>
  <Menu />
  <div class="container">
    <Router {routes} />
  </div>
</main>
