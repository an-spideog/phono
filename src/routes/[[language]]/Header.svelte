<script lang='ts'>
	import { page } from '$app/stores';
	import { _, isLoading, locale } from 'svelte-i18n';
	import { resolvePath } from '@sveltejs/kit'
	import LoginPanel from './LoginPanel.svelte';
  import HStack from '$lib/components/HStack.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import NavButton from './NavButton.svelte'
	export let email: string;
	export let isAdmin: boolean;
</script>

<header>
	<LoginPanel {email}/>
		<nav>
		{#if !$isLoading}
		<ul>
			{#if isAdmin}
				<NavButton tab=admin icon=shield/>
			{/if}

			<NavButton tab=introduction icon=note/>
			<NavButton tab=reels icon=folder/>
			<NavButton tab=tracks icon=speaker/>
			<NavButton tab=speakers icon=face/>
			<NavButton tab=collectors icon=mic/>
		</ul>
		{/if}
	</nav>
		
	<a class='language-button' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'en'})}> English </a>
	<a class='language-button' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'ga'})}> Irish </a>
</header>

<style>
	header {
		position: sticky;
		width: 100%;
		background: var(--surface-variant);
		display: flex;
		top: 0;
		z-index: 3;
		justify-content: space-between;
	}

	@media screen and (max-width: 600px) {
		header {
			display: none;
		}
	}

	nav {
		margin:auto;
		display: flex;
		justify-content: center;
	}

	.language-button {
		padding: 5px;
		margin: 5px;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}


	nav a, :global(.style-in-parent) {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--on-surface-variant);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--primary);
	}
</style>