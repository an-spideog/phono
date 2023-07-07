<script lang="ts">
    export let type: 'primary' | 'secondary' | 'danger';
</script>

<button on:click class={type}>
    <slot/>
</button>

<style>
    button {
        padding: 15px;
        border-radius: 30px;
        cursor: pointer;
        display: block;
        margin: inherit;
    }

    button:hover {
        opacity: 0.6;
    }

    .primary {
        background: blue;
        color: white;
        border: none;
        font-weight: bold;
    }

    .secondary {
        background: white;
        color: blue;
        border: blue 2px solid;
    }

    .danger {
        background: none;
        border: none;
        color: red;
    }


</style>