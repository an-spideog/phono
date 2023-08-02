<div class=horizontal-stack>
    <slot/>
</div>

<style>
    .horizontal-stack {
        grid-area: z-stack;
        display: flex;
        flex-direction: row;
        flex-wrap: var(--h-stack-flex-wrap, nowrap);
        justify-content: var(--h-stack-justify-content, space-between);
        align-items: center;
        align-content: center;
        padding: var(--h-stack-padding, 0);
        border-radius: var(--h-stack-border-radius, 0);
        height: var(--h-stack-height, fit-content);
        width: var(--h-stack-width, fit-content);
        box-sizing: border-box;
    }
</style>