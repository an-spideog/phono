<script lang="ts">
    import Modal from "../../../lib/components/Modal.svelte";
    import Button from "../../../lib/components/deprecated/Button.svelte";
    import Icon from "$lib/components/Icon.svelte"
    import { _ } from "svelte-i18n";
    import NewButton from "$lib/components/NewButton.svelte"

    export let data;
    export let form;

    let searchText = ''
    let isModalOpen: boolean = form?.link ? true : false;
</script>


<h1>{$_('users')}</h1>
<div class='flex justify-between gap-10 py-4'>
    <input bind:value={searchText} placeholder={$_('search')} class='pl-2 grow'>
    <NewButton on:click={() => isModalOpen = true}>
        {$_('new')}
    </NewButton>
</div>

<ul>
    {#each data.users as user}
        {#if !searchText || user.Email.includes(searchText)}
            <!--User List Item, could be extracted into its own component, 
                but isn't used anywhere else-->
            <li class='mb-1 hover:bg-gray-100 rounded'>
                <a href='admin/{user.ID}'>
                    <div class='flex w-full justify-between p-5 items-center'>
                        <div class='flex-col justify-start w-fit'>
                            <div class='font-bold text-black'>
                                {user.Email}
                            </div>
                            <div class='text-gray-500'>
                                {user.IsAdmin ? $_('admin') : $_('user')}
                            </div>
                        </div>
                        <div class='flex-col w-fit'>
                            {#if user.IsAdmin}
                                {$_('allTracks')}
                            {:else if !user.TrackCount}
                                {$_('noTracks')}
                            {:else}
                                {user.TrackCount} {$_('trackCounter')}
                            {/if}
                        </div>
                    </div>
                </a>
            </li>
        {/if}
    {/each}
</ul>

<Modal title={$_('newUser')} bind:isOpen={isModalOpen}>
    <form method="POST" action="?/add" class='flex-row gap-2'>
        <label for=email class='block py-2'>
            {$_('email')}: <input type='text' name='email'>
        </label>

        <label for=isAdmin class='block py-2'>
            {$_('admin')}: <input type='checkbox' name='isAdmin'>
        </label>

        <NewButton>
            {$_('createUser')}
        </NewButton>
    </form>
    {#if form?.link}
        {$_('sendThisLink')} {form.link}
    {/if}
</Modal>

<div class='flex justify-end sticky bottom-20 right-0 z-10'>
    <button on:click={() => {isModalOpen = true}}
        class='md:hidden bg-blue-800 font-bold flex justify-center 
            items-center shadow-4xl rounded text-white mx-2 my-3 p-5'>
        <Icon name=add/>
    </button>
</div>
