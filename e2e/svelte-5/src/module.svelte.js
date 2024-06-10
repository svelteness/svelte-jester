export const createCounter = () => {
  let count = $state(0)

  return {
    get count () {
      return count
    },

    increment () {
      count = count + 1
    }
  }
}
