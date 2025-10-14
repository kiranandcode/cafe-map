<script lang="ts">
  export const prerender = true;
  import { AtpAgent } from '@atproto/api';

  import BlueskyPost  from '../components/BlueskyPost.svelte';
  import {bskyUrlToPostData} from "$lib/resolver";
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

  export let agent : AtpAgent;

  // import 'bluesky-post-embed';
  export let photos : string[] = [];


// https://bsky.app/profile/kirancodes.me/post/3lzuh7wjzes2z  
  

  function isBskyPost(str: string) : boolean {
    return str.startsWith('https://bsky.app/');
  }
</script>
<div class="photo-grid gap-4 grid grid-cols-1 md:grid-cols-3">
  {#each photos as photo}
    {#if isBskyPost(photo)}
      {#await bskyUrlToPostData(agent, photo) then data}
        <BlueskyPost {data}/>
      {:catch _e}
      {/await}
    {:else}
      <img src={photo}/>
    {/if}
  {/each}
</div>
