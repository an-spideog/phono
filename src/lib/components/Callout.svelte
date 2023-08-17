<script lang=ts>
    export let color: "red" | "green" | "blue";
</script>

<div class='bg-{color}-100 text-{color}-800 rounded p-2 my-1'>
    <slot/>
</div>
