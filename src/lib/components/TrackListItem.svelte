<script lang="ts">
  import type { Track, User } from "$lib/types"
  import Menu from "./Menu.svelte"

    export let track: Track;
    export let user: User;
    export let isExpired = false;

    function getExpiryDate(accessGranted: Date) {
        const expiry = new Date();
        expiry.setDate(accessGranted.getDate() + 7)
        return expiry;
    }
</script>

<div class=track-list-item>
    <div class=left>
        <div class=title-line>
            <span class=nickname>({track.ID}) {track.Nickname}</span>
            <span class=catalogue-entry>{track.CatalogueEntry}</span>
        </div>
        <span class=expiry-date> {isExpired ? 'Caite ar' : 'Go dtí'}: {getExpiryDate(track.AccessGranted).toLocaleDateString('en-UK')}</span>
    </div>

    <div class=right>
        <Menu {user} {track} {isExpired}/>
    </div>
</div>

<style>
.track-list-item {
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
    align-items: end;
    justify-content: space-around;
    text-align: right;
}


button {
    background: none;
    border: none;
    padding: 1em;
}

button:hover {
    background: var(--primary-container);
}

.nickname {
    color: var(--on-surface);
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

.expiry-date {
    color: var(--on-surface-variant);
}

.catalogue-entry {
    color: var(--on-surface-variant);
}
</style>