<script lang="ts">
    interface Track {
            id: number,
            nickname: string,
            catalogueEntry: string,
            places: number[],
            recordingDate: string,
            speakers: number[],
            languages: string[],
            reels: number[],
    }

    let tracks: Track[] = [
        {id: 1, nickname: '1a1', catalogueEntry: "", places: [132329], recordingDate: '1961-03', speakers: [1], languages: [], reels: [1]},
        {id: 2, nickname: '1b1', catalogueEntry: "", places: [132329], recordingDate: '1961-03', speakers: [1, 2], languages: [], reels: [1]},
        {id: 3, nickname: '2a1', catalogueEntry: "", places: [132329], recordingDate: '1962-09-06', speakers: [1], languages: [], reels: [2]},
    ];

</script>
<h1> Traiceanna </h1>
<!--Search Bar Here -->

{#each tracks as track}
    <!--Proof of concept filtering-->
    {#if track.speakers.includes(2)}
    <div class="summary-box">
        <h2>{track.id.toString() + " [" + track.nickname + "] "}</h2>
        <ul>
            <li>áit: <a href={"https://logainm.ie/" + track.places[0]}>#{track.places[0]}</a></li>
            <li>dáta taifeadta: {track.recordingDate}</li>
            <li>cainteoir: {track.speakers}</li>
            <li>spól: {track.reels}</li>
        </ul>
        <span>comhad fuaime ar fáil d'úsáideoirí cláraithe</span>
    </div>
    {:else}
    <div class="empty"></div>
    {/if}
{/each}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>