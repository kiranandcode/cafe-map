import type {CafeHoppingLocation} from 'types';
const dataUrl = 'https://kirancodes.me/'

export async function loadCafeList() : Promise<Record<string, CafeHoppingLocation>> {
  let res = await fetch('/cafe-data.json');
  if(!res.ok) throw new Error('failed to retrieve cafe data :(');
  return await res.json()
}
