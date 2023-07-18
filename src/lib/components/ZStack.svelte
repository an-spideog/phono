<div class=z-stack>
    <slot/>
</div>

<style>
    .z-stack {
        display: grid;
    }
    .z-stack > :global(*) {
        grid-row: 1;
        grid-column: 1;
    }
</style>