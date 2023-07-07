<script lang="ts">
  import UserListItem from "../../../UserListItem.svelte"
  import Modal from "../../../Modal.svelte";
  import Button from "../../../Button.svelte";
    export let data;
    let isModalOpen: boolean = false;
    let searchText=''
</script>

<h1>Úsáideoirí</h1>
<div class='search-and-button'>
    <input bind:value={searchText} placeholder="cuardaigh">
    <button on:click={() => isModalOpen=true}>Nua</button>
</div>

<ul>
    {#each data.users as user}
    <UserListItem {user}/>
    {/each}
</ul>

<Modal title="Úsáideoir Nua"
    bind:isOpen={isModalOpen}>
    <form method="POST" action="?/add">
        Seoladh Ríomhphost: <input type='text' name='email'>
        Pasfhocal: <input type='password' name='password'>
        Riarthóir: <input type='checkbox' name='isAdmin'>
        <Button type=primary>Cruthaigh Úsáideoir</Button>
    </form>
</Modal>


<style>
ul {
    margin: 0;
    padding: 0;
}
</style>

