<script lang='ts'>
    import { MAX_PER_PAGE } from "$lib/globals";
    import { _ } from "svelte-i18n";
    export let page: number;
    export let count: number;
</script>

{#if page > 1}
<a href='?page={page-1}' >{$_('back')}</a>
{/if}

{#if page < Math.ceil(count / MAX_PER_PAGE) }
<a href='?page={page+1}'>{$_('next')}</a>
{/if}
