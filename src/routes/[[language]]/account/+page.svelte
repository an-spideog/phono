<script lang="ts">
    import { enhance } from '$app/forms'
    import { _ } from 'svelte-i18n';
    import { page } from '$app/stores';
    import { resolvePath } from '@sveltejs/kit';
    import Icon from '$lib/components/Icon.svelte';
    import SummaryBox from '$lib/components/SummaryBox.svelte';

    export let data

    // Ideally replace this with DORAS
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
    <div class='flex flex-col gap-3 mb-5'>
        <div class='flex justify-start items-center text-2xl'>
            <Icon name={data.isAdmin ? 'shield' : 'person'}/>
            {data.isAdmin ? $_('admin') : $_('user')}
        </div>
        <form method='POST' action='login?/logout' use:enhance>
            <button class='text-blue-800 text-2xl'>
                {$_('logOut')}
            </button>
        </form>
        <a href='change-password' class='text-blue-800 text-2xl'>
            {$_('changePassword')}
        </a>
        <div class='flex gap-2 md:hidden'>
            <a class='flex md:hidden rounded items-center px-4 py-2 bg-blue-800 
                text-white' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'ga'})}>
                Gaeilge
            </a>
            <a class='flex md:hidden rounded items-center px-4 py-2 bg-blue-200 
                text-black' data-sveltekit-preload-data=off href={resolvePath($page.route.id ?? '', {...$page.params, language: 'en'})}>
                English
            </a>
        </div>
    </div>

    {#if data.tracks.length}
        <h1>{$_('yourTracks')}</h1>
        {#each data.tracks as track}
        <SummaryBox>
            <h2 slot=title>{track.CatalogueEntry}</h2>
            <div slot=body>
                <ul>
                    <li>{$_('id')} : {track.ID} </li>
                    <li> {$_('nickname')} : {track.Nickname}</li>
                    <li> {$_('recordingDate')} : {track.RecordingDate}</li>
                </ul>
                <audio controls 
                    src="https://www.logainm.ie/phono/PHONO/{findInitialID(track.Nickname)}mp3s/{track.Nickname}.mp3">
                </audio>
            </div>
        </SummaryBox>
        {/each}
    {/if}
{:else}
    {$_('mustLogin.1')}
    <a href=login class='text-blue-800'>{$_('login')}</a> 
    {$_('mustLogin.2')} 
{/if}