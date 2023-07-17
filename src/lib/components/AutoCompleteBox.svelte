<script lang="ts">
    export let suggestions: string[] = ['apple', 'banana', 'pear'];
    let selectedOptions: string[] = [];
    let isSuggestionBoxShowing = false;
    let text = ""
    $: filteredSuggestions = suggestions.filter(s => s.includes(text) && !selectedOptions.includes(s));
</script>

<div class=autocomplete-box>
    <div>The current selections are: {selectedOptions}</div>
    <input id=search-region 
        bind:value={text} 
        on:focus={() => isSuggestionBoxShowing = true} 
        on:blur={() => isSuggestionBoxShowing = false}
        on:keyup={(e) => {
            if (e.key === 'Enter' || e.key === 'Tab') {
                selectedOptions = [...selectedOptions, filteredSuggestions[0]];
                text = ""
            } else if (e.key == 'Escape') {
                // unfocus the thing
            }
        }}
        placeholder="Traic">

    {#if isSuggestionBoxShowing}
    <div class=autocomplete-suggestions>
        <ul>
        {#each filteredSuggestions as suggestion}
        <li>
            <button on:click|stopPropagation={() => {
                selectedOptions = [...selectedOptions, suggestion]
                document.getElementById('search-region')?.focus();
                console.log('ooga booga')
                }}>
                {suggestion}
            </button>
        </li>
       {/each}
        </ul>
    </div>
    {/if}
</div>

<style>
    .autocomplete-box {
        position: relative;
        margin-bottom: 50px;
    }

    .autocomplete-suggestions {
        position: absolute;       
        top: 100%;
        background: var(--surface);
        z-index: 99;
        box-shadow: 1em black;
        max-height: 10em;
        overflow: scroll;
    }
</style>

