<script lang="ts">
    import Hoverable from "./Hoverable.svelte"

    export let type: 'primary' | 'secondary' | 'danger';
    export let enabled = true;
    export let preload = true;
    export let link = "";
    let hoverColor: string;
    if (type === 'primary') {
        hoverColor = 'var(--on-primary)'
    } else if (type === 'secondary') {
        hoverColor = 'var(--on-secondary-container)'
    }
    
</script>

{#if link}
<!--TODO: the link breaks all the css for some reason, i have no idea why, it is baffling-->
<a href={link} data-sveltekit-preload-data={preload ? true : 'off'} class=rounded>
    <Hoverable --hover-color={hoverColor} {enabled}>
        <div class='button-content {type} {enabled ? 'enabled' : 'disabled'}'>
            <slot/>
        </div>
    </Hoverable>
</a>
{:else}
<button on:click disabled={!enabled} class='rounded'>
    <Hoverable --hover-color={hoverColor} {enabled}>
        <div class='bg-blue-800 button-content {type} {enabled ? 'enabled' : 'disabled'}'>
            <slot/>
        </div>
    </Hoverable>
</button>
{/if}

<style>
    button, a {
        background: none;
        border: none;
        padding: 0;
        width: var(--button-width);
        overflow: hidden;
        margin: var(--button-margin, 1em);
    }

    .button-content {
        padding: 1.2em 2em;
        font-size: 1rem;
        font-weight: 600;
        margin: inherit;
    }

    .primary {
        color: var(--on-primary);
        border: none;
        font-weight: bold;
    }

    .secondary {
        background: var(--primary-container);
        color: var(--on-primary-container);
        border: none;
    }

    .danger {
        background: none;
        border: none;
        color: var(--error);
    }

    .disabled {
        filter: saturate(0);
    }
</style>