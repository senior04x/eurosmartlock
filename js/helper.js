// export const findElement = (element, parent = document) => {
//     return parent.querySelector(element)
// }

export function findElement(selector, context = document) {
    return context.querySelector(selector);
  }
    