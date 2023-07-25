<div class=z-stack>
    <slot/>
</div>

<style>
    .z-stack {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'z-stack';
    }
    .z-stack > :global(*) {
        grid-area: z-stack;
    }
</style>