<script lang="ts">
    import { page } from "$app/stores";
    import { resolvePath } from "@sveltejs/kit";
    import Icon from "$lib/components/Icon.svelte";
    import { _ } from "svelte-i18n";
  import HStack from "$lib/components/HStack.svelte"
  import Hoverable from "$lib/components/Hoverable.svelte"
  import VStack from "$lib/components/VStack.svelte"

    export let tab: string;
    export let icon: string;
    export let showText: 'false' | 'beside' | 'under' = 'beside';
</script>

<a aria-current={$page.url.pathname.includes(`/${tab}`) ? 'page' : undefined}
    href={resolvePath(`/[[language]]/${tab}`, $page.params)}>
    <Hoverable --hover-color=var(--on-surface-variant) enabled={!$page.url.pathname.includes(`/${tab}`)}>
        <div class=content>
            {#if showText === 'beside'}
            <HStack --border-radius=2em>
                <Icon name={icon}/>
                {$_(tab)}
            </HStack>
            {:else if showText === 'under'}
            <VStack --align-items=center>
                <Icon name={icon}/>
                {$_(tab)}
            </VStack>
            {:else}
            <Icon name={icon}/>
            {/if}
        </div>
    </Hoverable>
</a>

<style>
	li {
		position: relative;
		height: 100%;
        color: var(--on-surface-variant);
	}
    .content {
        padding: 5px 10px;
    }

	/*li:hover {
        background-color: var(--surface-variant);
        filter: brightness(85%);
	}*/

    a, a:visited, a:hover {
        border-radius: 2em;
        background: none;
        overflow: hidden;
        color: inherit;
        font-weight: 700;
		text-transform: uppercase;
		font-size: 0.7rem;
        padding: 0;
    }

	a[aria-current='page'] {
		background-color: var(--primary-container);
		color: var(--on-primary-container);
	}
</style>