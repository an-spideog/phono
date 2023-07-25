<div class=horizontal-stack>
    <slot/>
</div>

<style>
    .horizontal-stack {
        grid-area: z-stack;
        display: flex;
        flex-direction: row;
        justify-content: var(--justify-content, space-between);
        align-items: center;
        align-content: center;
        padding: var(--padding, 0);
        border-radius: var(--border-radius, 0);
    }
</style>