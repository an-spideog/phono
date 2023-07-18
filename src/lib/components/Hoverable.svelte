<script>

  import ZStack from "./ZStack.svelte"

</script>
    <ZStack>
        <slot/>
        <div class=hover-tint></div>
    </ZStack>

<style>
    .hover-tint:hover {
        background-color: var(--hover-color, --on-primary);
        opacity: 0.08;
    }
    .hover-container {
        position: relative;
        border-radius: inherit;
    }

    .hover-container::after {
        content:'\A';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: var(--hover-color, --on-primary);
        opacity: 0;
        border-radius: inherit;
    }

    .hover-container:hover::after {
        opacity: 0.08;
        cursor: pointer;
    }
</style>