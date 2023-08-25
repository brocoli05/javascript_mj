// Helper JavaScript Functions
export function getCustomProperty(elem, prop) {
  // convert string into number (string default)
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
