<script lang="ts">
    export let type: 'primary' | 'secondary' | 'danger';
</script>

<button on:click class={type}>
    <slot/>
</button>

<style>
    button {
        padding: 1.2em 2em;
        border-radius: 30px;
        cursor: pointer;
        display: block;
        margin: inherit;
    }

    button:hover {
        opacity: 0.6;
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