<script lang="ts">
  import type { Track, User } from "$lib/types"
  import Button from "./Button.svelte"

    export let track: Track;
    export let user: User;
</script>

<div class=track-list-item>
    <div class=left>
        <div class=title-line>
            <span class=nickname>({track.ID}) {track.Nickname}</span>
            <span class=catalogue-entry>{track.CatalogueEntry}</span>
        </div>
        <span class=expiry-date>{track.AccessGranted}</span>
    </div>

    <div class=right>
        <form method="POST" action="?/renew">
            <input type='hidden' name='trackId' value={track.ID}>
            <input type='hidden' name='userId' value={user.ID}>
            <Button type=secondary>Renew</Button>
        </form>
        <form method="POST" action="?/remove">
            <Button type=danger>X Revoke permission now</Button>
            <input type='hidden' name='trackId' value={track.ID}>
            <input type='hidden' name='userId' value={user.ID}>
        </form>
    </div>
</div>

<style>
.track-list-item {
    background-color: white;
    margin-bottom: 2px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left {
    display: flex;
    flex-direction: column;
    text-align: left;
    min-width: 0;
}

.right {
    display: flex;
    flex-direction: column;
    align-content: end;
    justify-content: end;
    text-align: right;
}

.nickname {
    color: black;
    font-weight: bold;
}

.title-line {
    display: block;
    margin-bottom: 10px;
    min-width:0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>