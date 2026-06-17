import test from "node:test";
import assert from "node:assert/strict";
import { parseCommentLinks } from "@/lib/commentLinks";

function reconstructComment(parts: ReturnType<typeof parseCommentLinks>) {
  return parts.map((part) => part.value).join("");
}

test("links http and https URLs while preserving surrounding whitespace", () => {
  const text =
    "First: http://example.com/path\n\nSecond:\thttps://example.org?q=one#two";
  const parts = parseCommentLinks(text);

  assert.deepEqual(
    parts.filter((part) => part.type === "link"),
    [
      {
        type: "link",
        value: "http://example.com/path",
        href: "http://example.com/path",
      },
      {
        type: "link",
        value: "https://example.org?q=one#two",
        href: "https://example.org?q=one#two",
      },
    ],
  );
  assert.equal(reconstructComment(parts), text);
});

test("leaves sentence punctuation and unmatched delimiters outside links", () => {
  const text =
    'See (https://example.com/docs), then "https://example.org/test".';
  const parts = parseCommentLinks(text);

  assert.deepEqual(
    parts.filter((part) => part.type === "link"),
    [
      {
        type: "link",
        value: "https://example.com/docs",
        href: "https://example.com/docs",
      },
      {
        type: "link",
        value: "https://example.org/test",
        href: "https://example.org/test",
      },
    ],
  );
  assert.equal(reconstructComment(parts), text);
});

test("keeps balanced delimiters that are part of a URL", () => {
  const text = "Reference https://example.com/functions/call(value).";
  const parts = parseCommentLinks(text);

  assert.deepEqual(parts, [
    { type: "text", value: "Reference " },
    {
      type: "link",
      value: "https://example.com/functions/call(value)",
      href: "https://example.com/functions/call(value)",
    },
    { type: "text", value: "." },
  ]);
  assert.equal(reconstructComment(parts), text);
});

test("does not link unsupported or malformed URLs", () => {
  const text = "ftp://example.com http:// and https://?missing-host";
  const parts = parseCommentLinks(text);

  assert.deepEqual(parts, [{ type: "text", value: text }]);
});
