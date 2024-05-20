<script>
  let { name } = $props();
  let showGreeting = $state(false);

  const handleClick = () => (showGreeting = true);
</script>

<button onclick={handleClick}>greet</button>
{#if showGreeting}
  <p>hello {name}</p>
{/if}
