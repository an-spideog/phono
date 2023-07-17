<script lang='ts'>
	import { page } from '$app/stores';
	import { _, isLoading, locale } from 'svelte-i18n';
	import { resolvePath } from '@sveltejs/kit'
	import LoginPanel from './LoginPanel.svelte';
	export let email: string;
	export let isAdmin: boolean;
</script>

<header>
	<LoginPanel {email}/>
		<nav>
		{#if !$isLoading}
		<ul>
			{#if isAdmin}
			<li aria-current={$page.url.pathname.includes('/admin') ? 'page' : undefined}>
				<a href={resolvePath('/[[language]]/admin', $page.params)}>{$_('admin')}</a>
			</li>
			{/if}

			<li aria-current={$page.url.pathname.includes('/introduction') ? 'page' : undefined}>
			<a href={resolvePath('/[[language]]/introduction', $page.params)}>{$_('introduction')}</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/reels') ? 'page' : undefined}>
				<a href={resolvePath('/[[language]]/reels', $page.params)}>{$_('reels')}</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/tracks') ? 'page' : undefined}>
				<a href={resolvePath('/[[language]]/tracks', $page.params)}>{$_('tracks')}</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/speakers') ? 'page' : undefined}>
				<a href={resolvePath('/[[language]]/speakers', $page.params)}>{$_('speakers')}</a>
			</li>
			<li aria-current={$page.url.pathname.includes('/collectors') ? 'page' : undefined}>
				<a href={resolvePath('/[[language]]/collectors', $page.params)}>{$_('collectors')}</a>
			</li>
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

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--secondary);
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