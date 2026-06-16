import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_MAX_VIDEO_FILE_SIZE_BYTES,
  MAX_VIDEO_FILE_SIZE_BYTES,
  assertVideoFileSizeAllowedForTeam,
  getTeamMaxVideoFileSizeBytes,
} from "@convex/uploadLimits";

test("large upload gate defaults teams to the 5 GiB limit", () => {
  assert.equal(
    getTeamMaxVideoFileSizeBytes(undefined),
    DEFAULT_MAX_VIDEO_FILE_SIZE_BYTES,
  );
  assert.throws(
    () =>
      assertVideoFileSizeAllowedForTeam(
        DEFAULT_MAX_VIDEO_FILE_SIZE_BYTES + 1,
        undefined,
      ),
    /Maximum size is 5 GiB/,
  );
});

test("large upload gate allows enabled teams to use the 30 GiB limit", () => {
  assert.equal(
    getTeamMaxVideoFileSizeBytes(true),
    MAX_VIDEO_FILE_SIZE_BYTES,
  );
  assert.equal(
    assertVideoFileSizeAllowedForTeam(MAX_VIDEO_FILE_SIZE_BYTES, true),
    MAX_VIDEO_FILE_SIZE_BYTES,
  );
});
