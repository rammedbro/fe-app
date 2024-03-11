const {
  CI_COMMIT_BRANCH,
  CI_COMMIT_SHORT_SHA
} = process.env;
const formattedBranch = CI_COMMIT_BRANCH
  .trim()
  .toLowerCase()
  .replace(/\W|_/g, '-');

process.stdout.write(`${ formattedBranch }.${ CI_COMMIT_SHORT_SHA }`);
