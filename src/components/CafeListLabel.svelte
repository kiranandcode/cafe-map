<script lang="ts">
  export const prerender = true;
  import type { Cafe } from "$lib/types";
	import type { Attachment } from "svelte/attachments";
  export let cafe: Cafe;
  export let onClick: (_: Cafe) => void = () => {};
  export let isActive: boolean = false;

  let cafeListScrollIntoView : Attachment = (element) => {
    if(isActive) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return () => {};
  }

</script>
<li {@attach cafeListScrollIntoView} class="summary-list__row">
  <span class="summary-list__value">
  {cafe.name} - {new Date(cafe.date).toDateString()}
  </span>
  <div class="summary-list__actions">
    <button href="#" class="block link" on:click|preventDefault={(_) => onClick(cafe)}>View ></button>
  </div>
</li>  
