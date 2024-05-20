<script>
  export let name;
  let showGreeting = false;

  const handleClick = () => (showGreeting = true);
</script>

<button on:click={handleClick}>greet</button>
{#if showGreeting}
  <p>hello {name}</p>
{/if}
