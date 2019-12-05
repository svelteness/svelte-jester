<div class="active">Hello {name}</div>

<script>
  export let name
</script>

<style type="text/scss">
  div {
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }
</style>