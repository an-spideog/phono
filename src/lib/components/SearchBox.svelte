<script lang='ts'>
    import Button from "$lib/components/deprecated/Button.svelte"
    import { _ } from "svelte-i18n";
    import PopupSelect from "./PopupSelect.svelte"

    export let additionalInputs: {text: string, name: string, options?: [{ID: number, Title: string}]}[] = [];
</script>

<form class='searchbox shadow rounded' data-sveltekit-preload-data>
    <label for='id'>
        {$_('id')}: 
    </label>
    <input type=search name='id' autocomplete="off"/>

    <label for='text'>
        {$_('text')}: 
    </label>
    <input type=search name='text' autocomplete="off" />

    {#each additionalInputs as input}
        <label for={input.name}>
            {input.text}:
        </label>
        {#if input.options}
            <div class=cols>
                <PopupSelect options={input.options} name={input.name} placeholder=""/>
            </div>
        {:else}
            <input type=search name={input.name} autocomplete="off"/>
        {/if}
    {/each}
    <div class=button-position>
        <Button type=primary --button-width=100% --button-margin=0>
            Submit
        </Button>
    </div>
</form>

<style>
form {
    padding: 2em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.5em 2em;
}

label {
  display: block;
  box-sizing: border-box;
}

input, .cols {
  box-sizing: border-box;
  width: 100%;
  grid-column: 1/4;
  margin-bottom: 0.5em;
}

label {
  grid-column: 1;
  text-align: left;
}

.button-position {
  grid-column: 1 / 4;
}

@media screen and (min-width: 600px) {
    .button-position {
        grid-column: 3/4;
    }

    input, .cols {
        grid-column: 2/4;
    }
    
    label {
        grid-column: 1;
    }
}
</style>
