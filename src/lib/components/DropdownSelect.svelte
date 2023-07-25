<script lang="ts">
    export let options: [String];
    export let length = 80;
    $: truncatedList = options.map(e => {
        if (e.length > length) {
            return e.substring(0, length) + '...'
        } else {
            return e;
        }
    }) 
</script>

<select 

