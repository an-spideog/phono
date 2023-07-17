<script lang="ts">
  import type { User } from "$lib/types"
  import UserListItem from "./UserListItem.svelte"

    export let users: User[];
    export let searchText = '';
</script>

<ul>
    {#each users as user}
        {#if !searchText || user.Email.includes(searchText)}
            <UserListItem {user}/>
        {/if}
    {/each}
</ul>

<style>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
</style>