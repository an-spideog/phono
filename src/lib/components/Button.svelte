<script lang="ts">
    import Hoverable from "./Hoverable.svelte"

    export let type: 'primary' | 'secondary' | 'danger';
    export let enabled = true;
    export let link = "";
    let hoverColor: string;
    if (type === 'primary') {
        hoverColor = 'var(--on-primary)'
    } else if (type === 'secondary') {
        hoverColor = 'var(--on-secondary-container)'
    }
    
</script>

{#if link}
<a href={link}>
    <Hoverable --hover-color={hoverColor} {enabled}>
        <div class='button-content {type} {enabled ? 'enabled' : 'disabled'}'>
            <slot/>
        </div>
    </Hoverable>
</a>
{:else}
<button on:click disabled={!enabled}>
    <Hoverable --hover-color={hoverColor} {enabled}>
        <div class='button-content {type} {enabled ? 'enabled' : 'disabled'}'>
            <slot/>
        </div>
    </Hoverable>
</button>
{/if}

<style>
    button {
        background: none;
        border: none;
        padding: 0;
        border-radius: 800px;
        overflow: hidden;
    }

    .button-content {
        padding: 1.2em 2em;
        font-size: 1rem;
        font-weight: 600;
        margin: inherit;
    }

    .primary {
        background: var(--primary);
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

    a, a:hover, a:active {
        text-decoration: none;
        padding: 0;
        margin: 0;
        border-radius: 1000px;
        overflow: hidden;
    }
</style>