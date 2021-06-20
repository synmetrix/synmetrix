export const sortBy = (arr, field) => {
  return arr.sort((a,b) => (a[field] > b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0)); 
}
