<script lang="ts">
    interface Speaker {
        id: number,
        gender: string,
        name: {
            full: string,
            first: string,
            last: string,
        }
    }

    let speakers: Speaker[] = [
        {id: 1, gender: "M", name: {full: 'Peadar Ó Sluagháin', first: 'Peadar', last: 'Ó Sluagháin'}},
        {id: 2, gender: "F", name: {full: 'Bean Uí Anluáin', first: '', last: 'Uí Anluáin'}},
        {id: 3, gender: "M", name: {full: 'Pádraig Cionnáith', first: 'Pádraig', last: 'Cionnaith'}},
    ];

</script>

<h1> Cainteoirí </h1>
<!--Search Bar Here -->

{#each speakers as speaker}
    <div class="summary-box">
        <h2>{speaker.id.toString() + " " + speaker.name.full + " " + "(inscne: " + (speaker.gender === 'M' ? 'fear' : 'bean') + ")"}</h2>
        <ul>
            <li>ainm iomlán : {speaker.name.full}</li>
            <li>céad ainm : {speaker.name.first}</li>
            <li>sloinne : {speaker.name.last}</li>
        </ul>
    </div>
    <a href="/tracks">tracks</a>
{/each}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>