<script lang="ts">
    import HStack from "$lib/components/HStack.svelte"
    import VStack from "$lib/components/VStack.svelte"
    import Button from "$lib/components/Button.svelte"
    import Icon from "$lib/components/Icon.svelte"
    import TrackListItem from "$lib/components/TrackListItem.svelte"
    import TrackSelectionDialogue from "$lib/components/TrackSelectionDialogue.svelte"
    import NewButton from "$lib/components/NewButton.svelte"

    let isModalOpen = false;
    export let data; 
    export let form;
    console.log(data.user)
</script>
<div class='pb-4 border-b mb-2 flex justify-between items-center'>
    <div>
        <h1>{data.user.Email}</h1>
        <h2 class='flex justify-start items-center text-gray-600'><Icon name={data.user.IsAdmin ? 'shield' : 'account_circle'}/>{data.user.IsAdmin ? 'Riarthóir' : 'Gnáthusáideoir'}</h2>
    </div>
    <form method=POST action=?/resetPassword>
    <input type=hidden name=userId value={data.user.ID}>
    <NewButton>
        Link to reset password
   </NewButton>
   {#if form?.otp}
   <a class='block text-blue-800' href={form.otp}>{form.otp}</a>
   {/if}
    </form>
</div>

<div class='py-4 border-b mb-10'>
    <div class='flex justify-between items-center'>
        <h1>Traiceanna</h1>
        <button on:click={() => {isModalOpen=true}} class='rounded bg-blue-800 font-bold px-4 py-2 text-white flex items-center justify-between'>
            <Icon name=add/>
            Traic
        </button>
    </div>
    <div class=track-list>
        {#if !data.userTracks.length}
        <div class='self-center text-center text-gray-600'>
            Níl aon traiceanna ag an úsáideoir seo.
        </div>
        {/if}
        <ul>
        {#each data.userTracks as track}
                <TrackListItem {track} user={data.user}/>
        {/each}
        </ul>
    </div>
</div>

<h1> Traiceanna Caite </h1>
<div class=expired-track-list>
    <ul>
        {#each data.expiredTracks as track}
            <TrackListItem {track} user={data.user} isExpired={true}/>
        {/each}
    </ul>
</div>

<TrackSelectionDialogue user={data.user} tracks={data.staticTracks} bind:isOpen={isModalOpen}/>

<style>
    .track-list {
        display: block;
    }

    h1 {
        margin: 5px;
    }

    h2 {
        font-size: 1.5rem;
        margin: 2px;
    }
    ul {
        margin: none;
        padding: 0;
    }

    .role {
        color: var(--on-surface-variant)
    }

    .info {
        margin-bottom: 100px;
        border-bottom: 1px solid var(--on-surface-variant);
    }
</style>