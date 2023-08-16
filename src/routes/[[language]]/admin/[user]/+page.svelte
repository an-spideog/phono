<script lang="ts">
    import Icon from "$lib/components/Icon.svelte"
    import TrackListItem from "$lib/components/TrackListItem.svelte"
    import NewButton from "$lib/components/NewButton.svelte"
    import Modal from "$lib/components/Modal.svelte"
    import { _ } from "svelte-i18n"

    export let data; 
    export let form;

    let isModalOpen = false;
</script>


<div class='pb-4 border-b mb-2 flex justify-between items-center'>
    <div>
        <h1>{data.user.Email}</h1>
        <h2 class='flex justify-start items-center text-gray-600 text-2xl'>
            <Icon name={data.user.IsAdmin ? 'shield' : 'account_circle'}/>
            {data.user.IsAdmin ? $_('admin') : $_('user')}
        </h2>
    </div>
    <form method=POST action=?/resetPassword>
    <input type=hidden name=userId value={data.user.ID}>
    <NewButton>
        {$_('linkToResetPassword')}
    </NewButton>
    {#if form?.otp}
        <a class='block text-blue-800' href={form.otp}>{form.otp}</a>
    {/if}
    </form>
</div>

<div class='py-4 border-b mb-10'>
    <div class='flex justify-between items-center'>
        <h1>{$_('tracks')}</h1>
        <NewButton on:click={() => isModalOpen = true}>
            <Icon name=add/>
            {$_('track')}
        </NewButton>
    </div>
    <div class=track-list>
        {#if !data.userTracks.length}
            <div class='self-center text-center text-gray-600'>
                {$_('hasNoTracks')}
            </div>
        {:else}
            <ul>
                {#each data.userTracks as track}
                    <TrackListItem {track} user={data.user}/>
                {/each}
            </ul>
        {/if}
    </div>
</div>

{#if data.expiredTracks.length}
<h1>{$_('expiredTracks')}</h1>
<div class=expired-track-list>
    <ul>
        {#each data.expiredTracks as track}
            <TrackListItem {track} user={data.user} isExpired={true}/>
        {/each}
    </ul>
</div>
{/if}

<Modal bind:isOpen={isModalOpen} title={$_('chooseTrack')}>
    <form method="POST" action="?/add">
        <input type='text' name='trackIds' placeholder="1, 2" class='block mb-2'>
        <input type='hidden' name='userId' value={data.user.ID}>
        <NewButton>{$_('addToUser')}</NewButton>
    </form>
</Modal>