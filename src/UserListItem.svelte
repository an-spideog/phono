<script lang="ts">
  import type { User } from "$lib/types"
  import TrackListItem from "./TrackListItem.svelte"

  export let user: User
</script>

<li>
  <a href='admin/{user.ID}'>
    <div class="left">
      <span class=email>
        {user.Email}
      </span>
      <span class=role>
        {user.IsAdmin ? 'Riarthóir' : 'Úsáideoir'}
      </span>
    </div>
    <div class="right">
      {#if user.IsAdmin}
        gach traic
      {:else if !user.TrackCount}
        gan aon traic
      {:else}
      {user.TrackCount} traic
      {/if}
    </div>
  </a>
</li>

<style>
  li {
    padding: 20px;
    list-style: none;
    margin-bottom: 2px;
    background: white;
  }
  li:hover {
    background: #eee;
  }
  a {
    display: flex;
    justify-content: space-between;
  }
  a:hover {
    text-decoration: none;
  }
  .left {
    display: flex;
    flex-direction: column;
  }

  .right {
    display: flex;
    align-items: center;
    color: grey;
  }

  .role {
    color: grey;
  }

  .email {
    font-weight: bold;
    color: black;
  }
</style>