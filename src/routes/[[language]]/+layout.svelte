<script lang>
	import Header from '$lib/components/Header.svelte';
	import { isLoading } from 'svelte-i18n';
	import './styles.css';
	import NavBarBottom from './MobileBottomBar.svelte'
	import MobileBottomBar from './MobileBottomBar.svelte'
	import MobileTopBar from './MobileTopBar.svelte'
	import SideNav from './SideNav.svelte'
	import HStack from '$lib/components/HStack.svelte'

	export let data;
		
	
</script>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
<div class="app">
	{#if $isLoading}
	Loading... 
	{:else}
	<!--I should probably use a grid for sidenav instead, TODO: figure out how to do that-->

	<div class=side-nav>
		<SideNav isAdmin={data.isAdmin}/>
	</div>
	<div class=top>
		<Header email={data.email} isAdmin={data.isAdmin}/>
		<MobileTopBar email={data.email}/>
	</div>

	<main>
		<slot />
	</main>

	<div class=bottom>
		<MobileBottomBar isAdmin={data.isAdmin}/>
	</div>
	{/if}

</div>

<style>
	
	.app {
		display: grid;
		height: 100vh;
		width: 100vw;
		gap: 0px 0px;
		grid-template-rows: 0.1fr 1fr 0.2fr; 
		grid-template-columns: 0.05fr 1fr;
		grid-template-areas: 
			"header header"
			"main main"
			"footer footer"
		;
	}
	.side-nav {
		grid-area: side;
		display: none;
	}
	/* Medium Layout */
	@media screen and (min-width: 600px) {
		.app {
			grid-template-rows: 0.05fr 1fr 0.2fr;
			grid-template-areas:
				"header header"
				"side main"
				"side main"
		}

		.side-nav {
			display: block;
		}

		.bottom {
			display: none;
		}
	}

	/* Large Layout */
	@media screen and (min-width: 1000px) {
		.app {
			grid-template-rows: 0.1fr 1fr 0.2fr;
			grid-template-areas:
				"header header"
				"main main"
				"main main";
		}
		.side-nav {
			display: none;
		}

		.bottom {
			display: none;
		}
	}

	.top {
		grid-area: header;
	}

	.bottom {
		grid-area: footer;
	}

	

	main {
		grid-area: main;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 90rem;
		margin: 0 auto;
		box-sizing: border-box;
		overflow: scroll;
	}
</style>
