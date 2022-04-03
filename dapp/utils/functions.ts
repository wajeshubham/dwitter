export const addClassToBody = (className: string) => {
  document.body.classList.add(className);
};

export const removeClassFromBody = (className: string) => {
  document.body.classList.remove(className);
};

export const isLgScreen = () => {
  return window.innerWidth < 1024;
};

export const isMdScreen = () => {
  return window.innerWidth < 768;
};

export const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(
    address.length - 6,
    address.length
  )}`;
