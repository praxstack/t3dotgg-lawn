export async function copyTextToClipboard(text: string) {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Some browsers expose the Clipboard API but reject it outside a secure or
    // user-activated context. Fall through to the legacy selection path.
  }

  if (typeof document === "undefined" || !document.body) {
    return false;
  }

  let textarea: HTMLTextAreaElement | undefined;
  let appended = false;

  try {
    textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    appended = true;
    textarea.focus();
    textarea.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    if (textarea && appended) {
      try {
        document.body.removeChild(textarea);
      } catch {
        // The copy result is still authoritative if another listener already
        // removed the temporary element.
      }
    }
  }
}
