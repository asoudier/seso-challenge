"use strict";
// Print all entries, across all of the *async* sources, in chronological order.

// Basically the same idea here except async
module.exports = (logSources, printer) => {
  return new Promise((resolve) => {
    const logEntriesPromise = [];

    let i = 0;
    while (i < logSources.length) {
      logEntriesPromise.push(logSources[i].popAsync());
      i++;
    }

    Promise.all(logEntriesPromise).then((results) => {
      const sortedLog = results
        .map((item) => [+new Date(item.date), item])
        .sort(([a], [b]) => a - b)
        .map(([, item]) => item);

      i = 0;
      while (i < logSources.length) {
        printer.print(sortedLog[i]);
        i++;
      }

      printer.done();
    });

    resolve(console.log("Async sort complete."));
  });
};
