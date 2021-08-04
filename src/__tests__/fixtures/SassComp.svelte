<script>
  export let name;
</script>

<div class="active">Hello {name}</div>

<style type="text/scss">
  div {
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }
</style>
