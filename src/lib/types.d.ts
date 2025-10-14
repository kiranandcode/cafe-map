export type Cafe = {
  name: string,
  location: [number, number],
  mapsLink: string?,
  notes: string,
  photos: Array<string>,
  date: string
}

export type CafeHoppingLocation = {
  center: [number, number];
  cafes: Array<Cafe>,
  zoom: number
}


