<script lang>
	import Header from './Header.svelte';
	import { isLoading } from 'svelte-i18n';
	import './styles.css';

	export let data;
		
	
</script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<div class="app">
	{#if $isLoading}
	Loading... 
	{:else}
	<Header email={data.email} isAdmin={data.isAdmin}/>

	<main>
		<slot />
	</main>
	{/if}

</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 90rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
