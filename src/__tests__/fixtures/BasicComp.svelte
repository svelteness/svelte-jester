<script>
  export let name;

  let count = 0;
  let isCounterActive = false;

  const increment = () => {
    count += 1;
  };

  const toggle = () => {
    isCounterActive = !isCounterActive;
  };

  const nodeEnv = process.env.NODE_ENV;

  $: buttonTitle = isCounterActive ? "Show Counter" : "Hide Counter";
</script>

<h1>Hello {name}!</h1>

<span class="counter" class:active={isCounterActive} on:click={increment}>
  {count}
</span>

<button on:click={toggle}>buttonTitle</button>

<span>{nodeEnv}</span>

<style>
  .counter {
    display: block;
    opacity: 0;
    padding: 8px;
    transition: opacity 0.3s ease-in-out;
  }
  .counter.active {
    opacity: 1;
  }
</style>
