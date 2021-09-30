<script>
  export let value = '';
  export let type = 'text';
  export let name;
  export let icon;
  export let id = '';
  export let label = '';
  export let editar = true;
</script>

<main>
  <div class="input-field">
    {#if editar}
      <i class="material-icons prefix"> {icon} </i>
      <input {type} {name} {id} {value} on:input required />
      <label for={id}>{label}</label>
    {:else}
      <i class="material-icons prefix"> {icon} </i>
      <input {type} {name} {value} on:input required />
    {/if}
  </div>
</main>
