<div class=vertical-stack>
    <slot/>
</div>

<style>
    .vertical-stack {
        display: flex;
        flex-direction: column;
        align-items: var(--align-items, start);
        justify-content: var(--justify-content);
        height: 100%;
    }
</style>