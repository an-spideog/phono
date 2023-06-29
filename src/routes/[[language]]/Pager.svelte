<script lang='ts'>
    import { MAX_PER_PAGE } from "$lib/globals";
    import { _ } from "svelte-i18n";
    export let page: number;
    export let count: number;
    let pageCount: number;
    $: pageCount = Math.ceil(count / MAX_PER_PAGE)
</script>

{#if page > 1}
<a href='?page={page-1}' >{$_('back')}</a>
{/if}

{#if page < pageCount}
<a href='?page={page+1}'>{$_('next')}</a>
{/if}

<!--This is kind of a hack to get all the numbers in a list, I don't know 
    If there's a better way-->
<div class=pager>
    <div class=number-list>
        {#each [...Array(pageCount).keys()].map(x => x + 1) as i}
                {#if page == i}
                    {i}
                {:else}
                    <a data-sveltekit-preload-data=off class=page-number href='?page={i}'> {i} </a>
                {/if}
        {/each}
    </div>
</div>

<style>
    .number-list {
        background-color: #DDDDDD;
        padding: 10px 10px;
        font-size: 85%;
        line-height: 2em;
        position: relative;
        margin: 0px 100px;
        text-align: center;
    }

    .page-number {
        padding: 2px 5px;
        text-decoration: none;
        border: 1px solid #DDDDDD;
    }
</style>