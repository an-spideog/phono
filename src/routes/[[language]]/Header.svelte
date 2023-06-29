<script lang='ts'>
	import { page } from '$app/stores';
	import { _ } from 'svelte-i18n';
	import { resolvePath } from '@sveltejs/kit'
	import LoginPanel from './LoginPanel.svelte';
	export let email: string;
</script>


<header>
	<LoginPanel {email}/>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname.endsWith('/introduction') ? 'page' : undefined}>
			<a href='introduction'>{$_('introduction')}</a>
			</li>
			<li aria-current={$page.url.pathname.endsWith('/reels') ? 'page' : undefined}>
				<a href="reels">{$_('reels')}</a>
			</li>
			<li aria-current={$page.url.pathname.endsWith('/tracks') ? 'page' : undefined}>
				<a href="tracks">{$_('tracks')}</a>
			</li>
			<li aria-current={$page.url.pathname.endsWith('/speakers') ? 'page' : undefined}>
				<a href="speakers">{$_('speakers')}</a>
			</li>
			<li aria-current={$page.url.pathname.endsWith('/collectors') ? 'page' : undefined}>
				<a href="collectors">{$_('collectors')}</a>
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