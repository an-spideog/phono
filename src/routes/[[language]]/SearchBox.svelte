<script lang='ts'>
    import { _ } from "svelte-i18n";
    export let additionalInputs: {text: string, name: string, options?: [{ID: number, Title: string}]}[] = [];
</script>

<form data-sveltekit-preload-data>
    <fieldset>
        <p>
            <label for='id'>
                {$_('id')}: <input name='id' autocomplete="off" size=80/>
            </label>
        </p>
        <p>
            <label for='text'>
                {$_('text')}: <input name='text' autocomplete="off" size=80/>
            </label>
        </p>
        {#each additionalInputs as input}
            <p>

                <label for={input.name}>
                    {#if input.options}
                        {input.text}: 
                        <select name={input.name} id={input.name}>
                            <option></option>
                            {#each input.options as option}
                                <option value={option.ID}>{option.ID} {option.Title}</option>
                            {/each}
                        </select>
                    {:else}
                        {input.text}: <input name={input.name} autocomplete="off" size=80/>
                    {/if}
                </label>
            </p>
        {/each}
        <input type="submit" value='>>'/> 
    </fieldset>
</form>

<style>
    input {
        float: right;
    }

    select {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
