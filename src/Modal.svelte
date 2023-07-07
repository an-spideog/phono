<script lang="ts">
    export let isOpen: boolean=false;
    export let title: string;
</script>

{#if isOpen}
<div class=modal-container>
    <div class=modal>
        <div class=title-line>
            {title}
            <button on:click={() => isOpen = false}>X</button>
        </div>
        <slot/>
    </div>
</div>
{/if}

<style>

    .modal-container {
        z-index: 2;
        position: fixed;
        inset: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal {
        padding: 50px;
        background: white;
    }

    .title-line {
        display: flex;
        justify-content: space-between;
    }

</style>