<script lang='ts'>
  import Button from "$lib/components/Button.svelte"
    import DropdownSelect from "$lib/components/DropdownSelect.svelte"
import HStack from "$lib/components/HStack.svelte"
  import VStack from "$lib/components/VStack.svelte"
import { _ } from "svelte-i18n";
  import PopupSelect from "./PopupSelect.svelte"
    export let additionalInputs: {text: string, name: string, options?: [{ID: number, Title: string}]}[] = [];
</script>

<form data-sveltekit-preload-data>
    <fieldset>
        <VStack --align-items=stretch>
            <HStack --justify-content=space-between --flex-wrap=wrap --padding="0.5em">
            <label for='id'>
                {$_('id')}: 
            </label>
            <input name='id' autocomplete="off"/>
            </HStack>

            <HStack --justify-content=space-between --flex-wrap=wrap --padding="0.5em">
                <label for='text'>
                    {$_('text')}: 
                </label>
                <input name='text' autocomplete="off" />
            </HStack>
        {#each additionalInputs as input}
            <HStack --justify-content=space-between --flex-wrap=wrap --padding="0.5em">
                <label for={input.name}>
                    {input.text}:
                </label>
                {#if input.options}
                    <PopupSelect options={input.options} name={input.name} placeholder=""/>
                {:else}
                    <input name={input.name} autocomplete="off"/>
                {/if}

            </HStack>
        {/each}
        <HStack --justify-content=end>
            <Button type=primary>
                Submit
            </Button>
        </HStack>
        </VStack>
    </fieldset>
</form>

<style>
    form {
        border-radius: 1em;
        border: black 1px solid;
        padding: 0.5em;
    }
    fieldset {
        border: none;
    }
</style>
