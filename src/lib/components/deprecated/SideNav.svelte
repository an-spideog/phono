<script lang="ts">
    import VStack from "$lib/components/deprecated/VStack.svelte"
    import NavButton from "./NavButton.svelte"

    export let isAdmin: boolean;
</script>

<nav class=side-nav>

<VStack --justify-content="space-evenly" --align-items=center>
			{#if isAdmin}
				<NavButton tab=admin icon=shield showText=under/>
			{/if}

			<NavButton tab=introduction icon=note showText=under/>
			<NavButton tab=reels icon=folder showText=under/>
			<NavButton tab=tracks icon=speaker showText=under/>
			<NavButton tab=speakers icon=face showText=under/>
			<NavButton tab=collectors icon=mic showText=under/>
</VStack>
</nav>

<style>
nav {
    background: var(--surface-variant);
    height: 100%;
}
</style>