<script>
  import ZStack from "./ZStack.svelte"
  export let enabled = true;
</script>

<ZStack>
    <slot/>
    {#if enabled}
        <div class=hover-tint></div>
    {/if}
</ZStack>

<style>
    .hover-tint:hover {
        background-color: var(--hover-color, --on-primary);
        opacity: 0.08;
    }

    div {
        width: 100%;
        height: 100%;
    }
</style>