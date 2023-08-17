<div class=vertical-stack>
    <slot/>
</div>

<style>
    .vertical-stack {
        display: flex;
        flex-direction: column;
        align-items: var(--align-items, start);
        justify-content: var(--justify-content, space-between);
        height: var(--v-stack-height, fit-content);
        width: var(--v-stack-width, fit-content);
    }
</style>