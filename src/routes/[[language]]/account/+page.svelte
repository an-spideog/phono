<script lang="ts">
    import { enhance } from '$app/forms'
    import { _ } from 'svelte-i18n';
    import Icon from '$lib/components/Icon.svelte';
    import SummaryBox from '$lib/components/SummaryBox.svelte';

    export let data
    function findInitialID(nickname: string) {
        let id = '';
        for (let c of nickname.split('')) {
            if (c < '0' || c > '9') {
                return id;
            } else {
                id += c;
            }
        }
    }
</script>

{#if data.email}
    <h1>{data.email}</h1>
    <div class='flex-row gap-4'>
        <div class='flex justify-start items-center text-2xl'>
            <Icon name={data.isAdmin ? 'shield' : 'person'}/>
            {data.isAdmin ? 'Riarthóir' : 'Gnáthúsáideoir'}
        </div>

        <form method='POST' action='login?/logout' use:enhance>
            <button class='text-blue-800 text-2xl'>
                Logáil Amach
            </button>
        </form>
        <a href='change-password' class='text-blue-800 text-2xl'>
            Athraigh do phasfhocal
        </a>
    </div>

    <h1>Do chuid traiceanna</h1>
    {#each data.tracks as track}
        <SummaryBox>
            <h2>{track.CatalogueEntry}</h2>
            <ul>
                <li>{$_('id')} : {track.ID} </li>
                <li> {$_('nickname')} : {track.Nickname}</li>
                <li> {$_('recordingDate')} : {track.RecordingDate}</li>
                        </ul>
            <audio controls src="https://www.logainm.ie/phono/PHONO/{findInitialID(track.Nickname)}mp3s/{track.Nickname}.mp3"></audio>
        </SummaryBox>
    {/each}
{:else}
    Ní mór duit <a href=login class='text-blue-800'>logáil isteach</a> ar dtús
{/if}