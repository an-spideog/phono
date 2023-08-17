<script lang="ts">
    import Button from "./deprecated/Button.svelte"
    import Icon from "./Icon.svelte";
    import { page } from "$app/stores";
    import { resolvePath } from "@sveltejs/kit";
  import NavButton from "../../routes/[[language]]/NavButton.svelte"
  import Hoverable from "./deprecated/Hoverable.svelte"
</script>

<header>
    <h1>
        <div>
            <Icon name='album'/>
        </div>
        <div>
            Phono
        </div>
    </h1>

    <div class=button-group>
        <div class=hide-on-medium>
            <Icon name=shield --font-size=50/>
        </div>
        <div class='language-buttons hide-on-small'>
            <Button
                type=secondary
                on:click={() => window.location.href=resolvePath(
                    $page.route.id ?? '', {...$page.params, language: 'ga'}
                )}>
                Gaeilge
            </Button>
            <Button 
                type=primary 
                on:click={() => window.location.href=resolvePath(
                    $page.route.id ?? '', {...$page.params, language: 'en'}
                )}>
                English
            </Button>
        </div>
        <a href=account class='flex align-center rounded overflow-hidden'>
            <Hoverable>
                <Icon name=account_circle/>
            </Hoverable>
        </a>
    </div>
</header>

<style>
header, div, h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-group {
    font-size: 4em;
}

.hide-on-small {
    display: none;
}

@media screen and (min-width: 600px) {
    .hide-on-medium {
        display: none;
    }

    .hide-on-small {
        display: block;
    }
}
</style>