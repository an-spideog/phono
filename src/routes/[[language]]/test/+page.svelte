<script>
    import VStack from "$lib/components/VStack.svelte";
    import HStack from "$lib/components/HStack.svelte";
    import ZStack from "$lib/components/ZStack.svelte";

</script>
<VStack>
    <div class=red>
    
    </div>
    <div class=blue>

    </div>
    <div class=green>

    </div></VStack>
<HStack>
    <div class=red>
    
    </div>
    <div class=blue>

    </div>
    <div class=green>

    </div>
</HStack>
<ZStack>
    <div class=red>
    
    </div>
    <div class=blue>

    </div>
    <div class=green>

    </div>
</ZStack>

<HStack>
    <button>
        <ZStack>
            <div class=content>
                button
            </div>
        </ZStack>
    </button>
    <a href=#>
        <ZStack>
            <div class=content>
                link
            </div>
        </ZStack>
    </a>

</HStack>
<style>
    button {
        border: none;
        background: none;
        padding: 0;
        border-radius: 400px;
        overflow: hidden;
    }

    a {
        border: none;
        background: none;
        padding: 0;
        border-radius: 400px;
        overflow: hidden;

    }

    .content {
        background: blue;
    }
    div {
        padding: 20px;
        opacity: 0.5;
    }
    .blue {
        background-color: blue;
    }
    .red {
        background-color: red;
    }
    .green {
        background-color: green;
    }
</style>