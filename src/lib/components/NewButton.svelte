<script lang="ts">
    export let enabled = true;
</script>

<button on:click class='px-4 py-2 rounded bg-blue-800 enabled:hover:bg-blue-700 
    text-white font-bold flex items-center justify-around disabled:saturate-0 disabled:brightness-150' disabled={!enabled}>
    <slot/>
</button>