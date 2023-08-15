<script lang="ts">
  import HStack from "$lib/components/HStack.svelte";
  import Icon from "$lib/components/Icon.svelte"
	export let email: string;
</script>

<header>
  <HStack --h-stack-width=100%>
    <div class="logo-or-name">Phono</div>

    <a href='account'><Icon name='account_circle'/></a>
  </HStack>
</header>

<style>
  header {
    background: var(--surface-variant);
    height: 100%;
  }
  @media screen and (min-width: 1000px) {
      header {
        display: none;
      }
  }
  .logo-or-name {
    font-size: 2em;
  }
</style>
