<script lang='ts'>
    import { _ } from "svelte-i18n";
    export let additionalInputs: {text: string, name: string}[] = [];
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
                    {input.text}: <input name={input.name} autocomplete="off" size=80/>
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
</style>
