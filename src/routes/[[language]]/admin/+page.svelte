<script lang="ts">
    import Modal from "../../../lib/components/Modal.svelte";
    import Button from "../../../lib/components/Button.svelte";
    import UserList from "$lib/components/UserList.svelte"
    import Icon from "$lib/components/Icon.svelte"
    export let data;
    export let form;
    let searchText = ''
    let isModalOpen: boolean = form?.link ? true : false;
</script>

<h1>Úsáideoirí</h1>
    <div class='flex justify-between gap-10 py-4'>
        <input bind:value={searchText} placeholder="Cuardaigh" class='pl-2 grow'>
        <button on:click={() => {isModalOpen = true}} 
            class='hidden md:flex bg-blue-800 font-bold text-white px-6 rounded py-3'>Nua</button>
        <!--Button type=primary on:click={() => isModalOpen=true}>Nua</Button> -->
    </div>

<UserList users={data.users} {searchText}/>

<Modal title="Úsáideoir Nua"
    bind:isOpen={isModalOpen}>
    <form method="POST" action="?/add" class='flex-row gap-2'>
        <label for=email class='block py-2'>
            Seoladh Ríomhphost: <input type='text' name='email'>
        </label>
        <label for=isAdmin class='block py-2'>
            Riarthóir: <input type='checkbox' name='isAdmin'>
        </label>

        <button class='flex bg-blue-800 font-bold text-white px-6 rounded py-3'>Cruthaigh Úsáideoir</button>
    </form>
    {#if form?.link}
    Send this link to the user to set their password: {form.link}
    {/if}
</Modal>

<div class='flex justify-end sticky bottom-20 right-0 z-10'>
    <button on:click={() => {isModalOpen = true}} 
        class='md:hidden bg-blue-800 font-bold flex justify-center items-center shadow-4xl rounded text-white mx-2 my-3 p-5'>
        <Icon name=add/>
    </button>
</div>
