<script lang="ts">
    import Button from "../../../../Button.svelte"
    import TrackListItem from "../../../../TrackListItem.svelte"
    import TrackSelectionDialogue from "../../../../TrackSelectionDialogue.svelte"
    import ZStack from "../../../../ZStack.svelte"

    let isModalOpen = false;
    export let data; 
    console.log(data)
</script>
<div class=page>
<h1>{data.user.Email}</h1>
<h2>{data.user.isAdmin ? 'Admin' : 'User'}</h2>

<div>
    <h1 class=left>Tracks</h1>
    <div class=right>
        <Button type=primary on:click={() => { isModalOpen=true; console.log('hi')}}>Add</Button>
    </div>
</div>
<div class=track-list>
    <ul>
    {#each data.userTracks as track}
            <TrackListItem {track} user={data.user}/>
    {/each}
    </ul>
</div>
</div>
<TrackSelectionDialogue user={data.user} tracks={data.staticTracks} bind:isOpen={isModalOpen}/>

<style>
    div {
    }

    .left {
        margin: auto;
    }

    .right {
        margin-left: auto;
    }

    .track-list {
        display: block;
    }

    h2 {
        font-size: large;
    }
    ul {
        margin: none;
        padding: 0;
    }

</style>