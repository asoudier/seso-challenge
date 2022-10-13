"use strict";

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  let log = [];

  // for data manipulation used while loops they are the fastest in javascript
  // https://stackoverflow.com/questions/5349425/whats-the-fastest-way-to-loop-through-an-array-in-javascript
  let i = 0;
  while (i < logSources.length) {
    log.push(logSources[i].pop());
    i++;
  }

  // used the schwartzian transformations for faster sorting https://en.wikipedia.org/wiki/Schwartzian_transform
  const sortedLog = log
    .map((item) => [+new Date(item.date), item])
    .sort(([a], [b]) => a - b)
    .map(([, item]) => item);

  // log.sort((a, b) => a.date - b.date);

  i = 0;
  while (i < sortedLog.length) {
    printer.print(sortedLog[i]);
    i++;
  }

  printer.done();

  return console.log("Sync sort complete.");
};
