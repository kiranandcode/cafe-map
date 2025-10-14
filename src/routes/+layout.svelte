<script lang="ts">
  export const csr = true;
  export const ssr = false;
  export const prerender = true;
  import '../app.css';
  let { children } = $props();
</script>

{@render children?.()}


