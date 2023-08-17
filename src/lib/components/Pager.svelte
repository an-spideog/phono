<script lang='ts'>
    import Icon from "$lib/components/Icon.svelte"
    import { MAX_PER_PAGE } from "$lib/globals";
    import { _ } from "svelte-i18n";
    export let page: number;
    export let count: number;
    
    let targetPage = "";
    let pageCount: number;
    $: pageCount = Math.ceil(count / MAX_PER_PAGE)
    $: isAtStart = (page === 1 )
    $: isAtEnd = (page === pageCount)
</script>

<div class='flex shadow justify-around rounded'>
    <a href='?page={page-1 || 1}' class='{!isAtStart ? 'hover:bg-gray-100' : 'cursor-default bg-gray-200'} 
        flex justify-center
        py-4 w-full border-r'>
        <Icon name=chevron_left/>
    </a>

    <div class='py-4 w-full flex justify-center'>
        <input on:keypress={(key) => {
            if (key.code === 'Enter' && Number(targetPage) > 0 && Number(targetPage) <= pageCount) {
                window.location.href = `?page=${targetPage}`
            }
        }} bind:value={targetPage} size=2 placeholder={String(page)}>/{pageCount}
    </div>

    <a href='?page={(page == pageCount) ? page : page+1}' 
        class='flex justify-center py-4 w-full border-l 
            {!isAtEnd ? 'hover:bg-gray-100' : 'cursor-default bg-gray-200'}'>
        <Icon name=chevron_right/>
    </a>
</div>