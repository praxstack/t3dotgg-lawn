import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { copyTextToClipboard } from "./clipboard";

const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, "navigator");
const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, "document");

function setGlobal(name: "navigator" | "document", value: unknown) {
  Object.defineProperty(globalThis, name, { configurable: true, value });
}

function restoreGlobal(name: "navigator" | "document", descriptor?: PropertyDescriptor) {
  if (descriptor) {
    Object.defineProperty(globalThis, name, descriptor);
  } else {
    Reflect.deleteProperty(globalThis, name);
  }
}

afterEach(() => {
  restoreGlobal("navigator", navigatorDescriptor);
  restoreGlobal("document", documentDescriptor);
});

test("awaits the native Clipboard API before reporting success", async () => {
  let written = "";
  setGlobal("navigator", {
    clipboard: {
      writeText: async (text: string) => {
        written = text;
      },
    },
  });
  setGlobal("document", undefined);

  assert.equal(await copyTextToClipboard("https://lawn.video/watch/one"), true);
  assert.equal(written, "https://lawn.video/watch/one");
});

test("falls back to execCommand when the native Clipboard API rejects", async () => {
  let appended = false;
  let removed = false;
  let copiedValue = "";
  const textarea = {
    value: "",
    style: {},
    setAttribute: () => undefined,
    focus: () => undefined,
    select: () => {
      copiedValue = textarea.value;
    },
  };

  setGlobal("navigator", {
    clipboard: { writeText: async () => Promise.reject(new Error("permission denied")) },
  });
  setGlobal("document", {
    body: {
      appendChild: () => {
        appended = true;
      },
      removeChild: () => {
        removed = true;
      },
    },
    createElement: () => textarea,
    execCommand: () => true,
  });

  assert.equal(await copyTextToClipboard("fallback text"), true);
  assert.equal(copiedValue, "fallback text");
  assert.equal(appended, true);
  assert.equal(removed, true);
});

test("reports failure and still cleans up when both clipboard paths fail", async () => {
  let removed = false;
  const textarea = {
    value: "",
    style: {},
    setAttribute: () => undefined,
    focus: () => undefined,
    select: () => undefined,
  };

  setGlobal("navigator", {
    clipboard: { writeText: async () => Promise.reject(new Error("permission denied")) },
  });
  setGlobal("document", {
    body: {
      appendChild: () => undefined,
      removeChild: () => {
        removed = true;
      },
    },
    createElement: () => textarea,
    execCommand: () => {
      throw new Error("copy unsupported");
    },
  });

  assert.equal(await copyTextToClipboard("uncopyable"), false);
  assert.equal(removed, true);
});

test("reports failure when the fallback cannot be mounted", async () => {
  setGlobal("navigator", undefined);
  setGlobal("document", {
    body: {
      appendChild: () => {
        throw new Error("document is no longer active");
      },
      removeChild: () => undefined,
    },
    createElement: () => ({
      value: "",
      style: {},
      setAttribute: () => undefined,
      focus: () => undefined,
      select: () => undefined,
    }),
    execCommand: () => true,
  });

  assert.equal(await copyTextToClipboard("uncopyable"), false);
});
