<script lang='ts'>
	import { page } from '$app/stores';
	import { _, isLoading, locale } from 'svelte-i18n';
	import { resolvePath } from '@sveltejs/kit'
	import LoginPanel from './LoginPanel.svelte';
	import HStack from '$lib/components/HStack.svelte'
	import Icon from '$lib/components/Icon.svelte'
	import NavButton from './NavButton.svelte'
	export let isAdmin: boolean;
</script>

<footer>
		<nav>
		{#if !$isLoading}
			<HStack>
			{#if isAdmin}
				<NavButton tab=admin icon=shield showText=under/>
			{/if}

			<NavButton tab=introduction icon=note showText=under/>
			<NavButton tab=reels icon=folder showText=under/>
			<NavButton tab=tracks icon=speaker showText=under/>
			<NavButton tab=speakers icon=face showText=under/>
			<NavButton tab=collectors icon=mic showText=under/>

			</HStack>
		{/if}
	</nav>
</footer>

<style>
	footer {
		height: 100%;
		position: sticky;
		width: 100%;
		background: var(--surface-variant);
		display: flex;
		bottom: 0;
		z-index: 3;
		justify-content: space-between;
	}

	@media screen and (min-width: 600px) {
		footer {
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