import type {CafeHoppingLocation} from './types';
const dataUrl = 'https://raw.githubusercontent.com/kiranandcode/cafe-map/refs/heads/main/static/cafe-data.json'

export async function loadCafeList() : Promise<Record<string, CafeHoppingLocation>> {
  let res = await fetch(dataUrl);
  if(!res.ok) throw new Error('failed to retrieve cafe data :(');
  return await res.json()
}
