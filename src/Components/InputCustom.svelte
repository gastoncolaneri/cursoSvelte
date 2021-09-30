<script>
  export let value = '';
  export let type = 'text';
  export let name;
  export let icon;
  export let id;
  export let label;
</script>

<main>
  <div class="input-field">
    <i class="material-icons prefix"> {icon} </i>
    <input {type} {name} {id} {value} on:input required />
    <label for={id}>{label}</label>
  </div>
</main>
