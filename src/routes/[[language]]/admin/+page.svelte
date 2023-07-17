<script lang="ts">
    import Modal from "../../../lib/components/Modal.svelte";
    import Button from "../../../lib/components/Button.svelte";
    import UserList from "$lib/components/UserList.svelte"
    export let data;
    let searchText = ''
    let isModalOpen: boolean = false;
</script>

<h1>Úsáideoirí</h1>
<div class='search-and-button'>
<div class=h-stack>
    <input bind:value={searchText} placeholder="Cuardaigh">
    <Button type=primary on:click={() => isModalOpen=true}>Nua</Button>
</div>
</div>

<UserList users={data.users} {searchText}/>

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
    .h-stack {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .search-and-button {
        margin-bottom: 10px;
    }
</style>