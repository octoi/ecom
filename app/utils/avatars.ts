export const getUserAvatar = (name: string): string => {
  return encodeURI(`https://avatars.dicebear.com/api/identicon/${name}.svg`);
};
