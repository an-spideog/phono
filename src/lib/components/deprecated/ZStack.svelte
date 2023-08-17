<div class=z-stack>
    <slot/>
</div>

<style>
    .z-stack {
        height: var(--z-stack-height, fit-content);
        width: var(--z-stack-width, fit-content);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'z-stack';
    }
    .z-stack > :global(*) {
        grid-area: z-stack;
    }
</style>