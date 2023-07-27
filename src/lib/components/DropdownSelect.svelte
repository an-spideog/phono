<script lang="ts">
    export let options: {ID: number, Title: string}[];
    export let length = 80;
    export let name: string;

    function truncate(s: string) {
        if (s && s.length > length) {
            return s.substring(0, length) + '...'
        } else {
            return s;
        }
    }
</script>

<select {name} id={name}>
    <option></option>
    {#each options as option}
        <option value={option.ID}>{option.ID} {truncate(option.Title)}</option>
    {/each}
</select>

