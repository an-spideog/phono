<script lang="ts">
    interface Reel {
        id: number,
        title: string,
        refId: number,
        dates: string,
        collectors: number[],
        note: string,
    }

    

    

    let reels: Reel[] = [
        {id: 1, title: "Cuntais ar Logainmneacha i bParóiste Chairlinn, Co. Lú", refId: 1, dates: "1961", collectors: [1, 2], note: "3 3/4 ips"},
        {id: 2, title: "Cuntais ar Logainmneacha i bParóiste Chairlinn, Co. Lú", refId: 2, dates: "1962", collectors: [1], note: "1 7/8 ips"},
        {id: 3, title: "Cuntais ar Logainmneacha i mBarúntacht na nDéise laistigh den Drom, Co. Phort Láirge", refId: 3, dates: "1962", collectors: [1, 3], note: "1 7/8 ips"},
    ];

</script>
<h1> Spóileanna </h1>

<!--Search Bar Here -->

{#each reels as reel}
<div class="summary-box">
    <h2>{reel.id.toString() + " [" + reel.title + "] "}</h2>
    <ul>
        <li>teideal: {reel.title}</li>
        <li>uimhir thagartha: {reel.refId}</li>
        <li>dáta cruthaithe: {reel.dates}</li>
        <li>bailitheoir: {reel.collectors}</li>
        <li>nóta: {reel.note}</li>
    </ul>
    <a href="/tracks">tracks</a>
</div>
{/each}

<style>
.summary-box {
    border-bottom: 1px solid orangered;
}
</style>