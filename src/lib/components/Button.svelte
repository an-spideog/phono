<script lang="ts">
    import Hoverable from "./Hoverable.svelte"

    export let type: 'primary' | 'secondary' | 'danger';
</script>


<button on:click>
    <Hoverable --hover-color=var(--on-primary)>
        <div class='button-content {type}'>

            <slot/>
        </div>
    </Hoverable>
</button>


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
        cursor: pointer;
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


</style>