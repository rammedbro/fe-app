import type { UserConfig, Commit } from '@commitlint/types';

const BreakingChangeHeaderRegex = /^[a-z]+\(.+\)!:.+$/;
const BreakingChangeFooterRegex = /^BREAKING CHANGE:.+$/;
const ScopeRegex = /^[A-Z]+-[0-9]+$/;

const isBreakingChangeHeader = ({ header }: Commit) => {
  if (!header) {
    return false;
  }

  return BreakingChangeHeaderRegex.test(header);
};

const isBreakingChangeFooter = ({ footer }: Commit) => {
  if (!footer) {
    return false;
  }

  return BreakingChangeFooterRegex.test(footer);
};

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  ignores: [(commit) => /^Release/.test(commit)],
  rules: {
    'type-enum': [2, 'always', ['build', 'ci', 'docs', 'feat', 'fix', 'refactor', 'style', 'test', 'story', 'chore', 'perf', 'revert']],
    'body-max-line-length': [0],
    'footer-empty': [0],
    'function-rules/footer-empty': [
      2,
      'always',
      (commit: Commit) => {
        if (!isBreakingChangeHeader(commit) && isBreakingChangeFooter(commit)) {
          return [false, 'Коммит с BREAKING CHANGE должен содержать "!" перед ":" в header'];
        }
        if (isBreakingChangeHeader(commit) && !isBreakingChangeFooter(commit)) {
          return [false, `Коммит с BREAKING CHANGE должен содержать footer вида ${ BreakingChangeFooterRegex.source }`];
        }

        return [true];
      },
    ],
    'header-min-length': [2, 'always', 5],
    'scope-enum': [0],
    'function-rules/scope-enum': [
      2,
      'always',
      ({ scope }: Commit) => {
        if (!scope) {
          return [false, 'Необходимо указать номер задачи, в рамках которой происходит коммит'];
        }
        if (!ScopeRegex.test(scope)) {
          return [false, 'Необходимо указать номер задачи, в рамках которой происходит коммит'];
        }

        return [true];
      },
    ],
    'subject-case': [2, 'always', ['sentence-case', 'upper-case']],
  },
};

export = config;
