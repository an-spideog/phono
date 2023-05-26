<script lang="ts">
    interface Collector {
            id: number,
            name: {
                first: string,
                last: string,
            }
    }

    let collectors: Collector[] = [
        {id: 1, name: {first: 'Art', last: 'Maolfabhail'}},
        {id: 2, name: {first: 'Éamonn', last: 'de hÓir'}},
        {id: 3, name: {first: 'Cionath', last: 'Bale'}},
    ];

</script>

<h1> Bailitheoirí </h1>
<!--Search Bar Here -->
<form class="search">
    <div class="formline">
        <label for="srchText"><span class="cga">Téacs</span></label>
        <input class="textbox" id="srchText" name="Text" value="" />
    </div>
    <div class="formline">
        <label for="srchID">ID</label>
        <input class="textbox" id="srchID" name="ID" value="" />
    </div>
    <div class="submitline">
        <input class="submit" type="submit" value="»" />
    </div>
</form>

{#each collectors as collector}
    <div class="summary-box">
        <h2>{collector.id.toString() + " " + collector.name.first + " " + collector.name.last}</h2>
        <ul>
            <li>céad ainm : {collector.name.first}</li>
            <li>sloinne : {collector.name.last}</li>
        </ul>
    </div>
    <a href="/reels">reels</a>
{/each}

