<div class=vertical-stack>
    <slot/>
</div>

<style>
    .vertical-stack {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: var(--justify-content);
    }
</style>