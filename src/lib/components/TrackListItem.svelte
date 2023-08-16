<script lang="ts">
    import type { Track, User } from "$lib/types"
    import { _ } from "svelte-i18n"
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

<!--TODO: might be some more cleanup still due here-->
<div class='track-list-item mb-2 p-4 flex justify-between items-center'>
    <div class='flex-col text-left min-w-0'>
        <div class='block mb-2 min-w-0 overflow-hidden whitespace-nowrap text-ellipsis'>
            <span class='text-black font-bold'>({track.ID}) {track.Nickname}</span>
            <span class='text-gray-700'>{track.CatalogueEntry}</span>
        </div>
        <span class='text-gray-700'> {isExpired ? $_('expiredOn') : $_('until')}: {getExpiryDate(track.AccessGranted).toLocaleDateString('en-UK')}</span>
    </div>

    <div class='flex-col items-end justify-around text-right'>
        <Menu {user} {track} {isExpired}/>
    </div>
</div>