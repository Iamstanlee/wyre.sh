export const copyToClipboard = async (text: string) => {
  let isCopied = false;
  try {
    await navigator.clipboard.writeText(text);
    isCopied = true;
  } catch (err) {
  }
  return isCopied;
};
