<script lang="ts">
  import HStack from "./HStack.svelte"
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
    /* How do button and the hoverable have different border radiuses?? */
    /* because they're calculating from different like boxes, I think */
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