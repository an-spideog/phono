<script>
  import HStack from "../../../HStack.svelte"
  import VStack from "../../../VStack.svelte"
  import ZStack from "../../../ZStack.svelte"

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

<style>
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