import CafeHoppingPage from './components/CafeHoppingPage.svelte';

export function mountWidget(target, props = {}) {
  return new Widget({
    target,
    props
  });
}
