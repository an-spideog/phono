<script lang="ts">
  import HStack from "$lib/components/HStack.svelte";
	export let email: string;
</script>

<header>
  <HStack>
    <div class="logo-or-name">Phono</div>

    <a href="/login">{email ? 'Logout' : 'Login'}</a>
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
