export type CommentTextPart =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

const URL_PATTERN = /https?:\/\/[^\s<]+/giu;
const TRAILING_PUNCTUATION = new Set([".", ",", "!", "?", ";", ":", "'", '"', ">"]);
const CLOSING_DELIMITERS = {
  ")": "(",
  "]": "[",
  "}": "{",
} as const;

function countCharacter(value: string, character: string) {
  let count = 0;

  for (const currentCharacter of value) {
    if (currentCharacter === character) {
      count += 1;
    }
  }

  return count;
}

function splitTrailingPunctuation(candidate: string) {
  let link = candidate;

  while (link.length > 0) {
    const lastCharacter = link.at(-1);
    if (!lastCharacter) break;

    if (TRAILING_PUNCTUATION.has(lastCharacter)) {
      link = link.slice(0, -1);
      continue;
    }

    if (lastCharacter in CLOSING_DELIMITERS) {
      const openingDelimiter =
        CLOSING_DELIMITERS[lastCharacter as keyof typeof CLOSING_DELIMITERS];
      if (
        countCharacter(link, lastCharacter) >
        countCharacter(link, openingDelimiter)
      ) {
        link = link.slice(0, -1);
        continue;
      }
    }

    break;
  }

  return {
    link,
    trailingText: candidate.slice(link.length),
  };
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      Boolean(url.hostname)
    );
  } catch {
    return false;
  }
}

function appendText(parts: CommentTextPart[], value: string) {
  if (!value) return;

  const previousPart = parts.at(-1);
  if (previousPart?.type === "text") {
    previousPart.value += value;
    return;
  }

  parts.push({ type: "text", value });
}

export function parseCommentLinks(text: string) {
  const parts: CommentTextPart[] = [];
  let cursor = 0;

  for (const match of text.matchAll(URL_PATTERN)) {
    const candidate = match[0];
    const matchIndex = match.index;

    appendText(parts, text.slice(cursor, matchIndex));

    const { link, trailingText } = splitTrailingPunctuation(candidate);
    if (link && isValidHttpUrl(link)) {
      parts.push({ type: "link", value: link, href: link });
      appendText(parts, trailingText);
    } else {
      appendText(parts, candidate);
    }

    cursor = matchIndex + candidate.length;
  }

  appendText(parts, text.slice(cursor));
  return parts;
}
