<script lang="ts">
  export const prerender = true;
  import type {Cafe}  from "../lib/types";
  export let cafe: Cafe;
  export let onClick : (_: Cafe) => void = () => {};
</script>
  
<div class="text-sm font-semibold text-gray-800">{cafe.name}</div>
<li class="grid-row">
  <span class="grid-column-full">
    {new Date(cafe.date).toDateString()}
  </span>
  <div class="grid-column-full">
    <button class="block link" on:click|preventDefault={(_) => onClick(cafe)}>View ></button>
  </div>
</li>
