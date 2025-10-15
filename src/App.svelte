<script lang="ts">
  export const prerender = true;
  import { MapLibre, Marker, Popup } from 'svelte-maplibre';
  import { Coffee } from 'lucide-svelte';
  import Markdown from 'svelte-exmarkdown';
  import AtpAgent from '@atproto/api';
  import { onMount } from 'svelte';

  import PhotoGrid from './components/PhotoGrid.svelte';
  import CoffeeMarkerLabel from './components/CoffeeMarkerLabel.svelte';
  import CoffeeListLabel from './components/CafeListLabel.svelte';
  import type {Cafe, CafeHoppingLocation} from './lib/types';
  import {loadCafeList} from './lib/loader';
  import { sortCafeList } from './lib/utils';

  let agent: AtpAgent;

  let cafes : Record<string,CafeHoppingLocation> = {};
  let currentlySelectedCafe : Cafe | null = null;
  let center: [number, number] | null = null;
  let zoom: number | null = null;

  function viewCafe(cafe: Cafe) : void {
    currentlySelectedCafe = cafe;
    center = [currentlySelectedCafe.location[1],currentlySelectedCafe.location[0],];
    zoom = 15;
  }
  function viewCafeHoppingLocation(location: CafeHoppingLocation) : void {
    center = [location.center[1], location.center[0]];
    zoom = location.zoom;
  }

  onMount(() => {
    agent = new AtpAgent({service: 'https://bsky.social' });
  });

  onMount(async () => {
    cafes = await loadCafeList();
    let location = Object.keys(cafes)[0];
    viewCafeHoppingLocation(cafes[location]);
  });

</script>
<div class="body">
<span class="caption-m">To all the cafes I've snacked at.</span>
<h1 class="heading-l">Kiran's Cafe Hopping Adventures!</h1>

One of my hobbies is going Cafe-hopping!  I just love cafe vibes for
doing work, getting stuff done etc. This is a little bit of fun, but I
thought I'd collate all of my cafe-related photos with a little map
view so we could track exactly which cafes I've gone to and like
thoughts or fun stories about each!

Have a look around, I hope you enjoy your stay!
</div>
<div class="grid-row">
<div class="grid-column-one-half h-80 w-full">
<MapLibre
  standardControls
  class="relative h-full w-full inset-0 body"
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
  center={center}
  zoom={zoom}
  >
  {#each Object.keys(cafes) as area}
    {#each cafes[area].cafes as cafe}
<Marker
  lngLat={[cafe.location[1], cafe.location[0]]}
  class="group relative grid h-10 w-10 place-items-center rounded-full border border-gray-300 bg-black-200 shadow-lg transition hover:scale-110 hover:shadow-2xl"
>
  <Coffee class="h-5 w-5"> </Coffee>
  <Popup openOn="hover" offset={[0, -12]}>
    <CoffeeMarkerLabel onClick={viewCafe} cafe={cafe}></CoffeeMarkerLabel>
  </Popup>
</Marker>
    {/each}
  {/each}
</MapLibre>
</div>
  <div class="grid-column-one-half body">
    <h2 class="heading-m">Cafe List</h2>
    <div class="overflow-y-scroll max-h-60">
    <ul>
      {#each Object.keys(cafes) as area }
        <li>
          <h3 class="heading-s">
            <button
              class="block link"
              on:click|preventDefault={(_) => viewCafeHoppingLocation(cafes[area])}>
              {area}
            </button>
          </h3>
        </li>
        <ul class="summary-list">
          {#each sortCafeList(cafes[area].cafes) as cafe }
            {@const isActive = cafe === currentlySelectedCafe}
            <CoffeeListLabel {isActive} {cafe} onClick={viewCafe}/>
          {/each}
        </ul>
      {/each}
    </ul>
    </div>
  </div>
</div>
{#if currentlySelectedCafe !== null}
<main class="body">
  <div class="outline-container">
  <h3 class="heading-m">{currentlySelectedCafe.name}</h3>
  <span class="date"><time datetime={currentlySelectedCafe.date}>{
        new Date(currentlySelectedCafe.date).toDateString()
      }</time>
  </span>
    <span class="tag">
      <button class="block link" on:click|preventDefault={viewCafe(currentlySelectedCafe)}>View ></button>
    </span>
  <!-- {#if currentlySelectedCafe.mapsLink} -->
  <!--   <span class="tag"> -->
  <!--     <a class="link" href={currentlySelectedCafe.mapsLink}>GMaps ></a> -->
  <!--   </span> -->
  <!-- {/if} -->
  <div class="grid-row">
    <div class="grid-column-full">
      <div class="body">
      <Markdown md={currentlySelectedCafe.notes}/>
      </div>
    </div>
  </div>
  <div class="grid-row">
    
    <div class="grid-column-full">
      <PhotoGrid agent={agent} photos={currentlySelectedCafe.photos}/>
    </div>
  </div>
  </div>
</main>
{/if}
