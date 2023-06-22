<script lang="ts">
    import { page } from "$app/stores";
    export let link: string;
</script>

<a href='/{$page.data.language}{link}'><slot/></a>