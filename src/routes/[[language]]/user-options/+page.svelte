<script lang="ts">
    import { enhance } from '$app/forms'
    import { _ } from 'svelte-i18n';
    import Button from '$lib/components/Button.svelte';
    import HStack from '$lib/components/HStack.svelte';
    import VStack from '$lib/components/VStack.svelte';
    import Icon from '$lib/components/Icon.svelte';
    import SummaryBox from '../../../lib/components/SummaryBox.svelte';

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

<HStack --flex-wrap=wrap>
    <VStack --justify-content=start>
        <h1>{data.email}</h1>
        <div class=role>
            <HStack>
                <Icon name={data.isAdmin ? 'shield' : 'person'}/>
                {data.isAdmin ? 'Modhnóir' : 'Gnáthúsáideoir'}
            </HStack>
        </div>
    </VStack>
    <form method='POST' action='login?/logout' use:enhance>
            <Button type=secondary>
                Logáil Amach
            </Button>
        </form>

        <Button type=secondary link='change-password'>
            Athraigh do phasfhocal
        </Button>

</HStack>

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