export function createRequestEpoch() {
  let epoch = 0;

  return {
    current: () => epoch,
    next: () => {
      epoch += 1;
      return epoch;
    },
    invalidate: () => {
      epoch += 1;
    },
    isCurrent: (requestEpoch: number) => requestEpoch === epoch,
  };
}
