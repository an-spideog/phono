<script lang='ts'>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import LanguageSensitiveLink from './LanguageSensitiveLink.svelte'
	import HeaderLink from './HeaderLink.svelte'
	import { resolvePath } from '@sveltejs/kit'
	export let email: string;
</script>


<header>
	{#if email}
	Logged in as: {email}
	{:else}
	<LanguageSensitiveLink link=/login>Login</LanguageSensitiveLink>
	{/if}
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/introduction' ? 'page' : undefined}>
			<HeaderLink link='/introduction'>{$_('introduction')}</HeaderLink>
			</li>
			<li aria-current={$page.url.pathname === '/reels' ? 'page' : undefined}>
				<HeaderLink link="/reels">{$_('reels')}</HeaderLink>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/tracks') ? 'page' : undefined}>
				<HeaderLink link="/tracks">{$_('tracks')}</HeaderLink>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/speakers') ? 'page' : undefined}>
				<HeaderLink link="/speakers">{$_('speakers')}</HeaderLink>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/collectors') ? 'page' : undefined}>
				<HeaderLink link="/collectors">{$_('collectors')}</HeaderLink>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
		
	<a class='language-button' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {language: 'en'})}> English </a>
	<a class='language-button' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {language: 'ga'})}> Irish </a>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		margin:auto;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	.language-button {
		padding: 5px;
		background: white;
		margin: 5px;
		border-radius: 5px;
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
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a, :global(.style-in-parent) {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>