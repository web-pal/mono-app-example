# mono-web-example

Example web project with [yarn workspaces][yarn-workspaces].

## Benefits of workspaces
* Your dependencies can be linked together, which means that your workspaces can depend on one
another while always using the most up-to-date code available. This is also a better
mechanism than `yarn link` since it only affects your workspace tree rather than your whole system.
* All your project dependencies will be installed together, giving Yarn more latitude to better
optimize them.
* Yarn will use a single lockfile rather than a different one for each project,
which means less conflicts and easier reviews.
* Shared eslint config
* Shared flowconfig and flow-typed
* Easy IDE integrations, since we don't have multiple root dirs in the project

## Built With

* [yarn-workspaces][yarn-workspaces] - It allows you to setup multiple packages
* [webpack][webpack] - Is a module bundler. Its main purpose is to bundle JavaScript files
for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about
any resource or asset.
* [react][react] - A JavaScript library for building user interfaces
* [redux][redux] - Is a predictable state container for JavaScript apps
* [redux-saga][redux-saga] - An alternative side effect model for Redux apps
* [flowtype][flowtype] - Is a static type checker for JavaScript
* [reselect][reselect] - Selector library for Redux
* [styled-components][styled-components] - Visual primitives for the component age

## Developing
Install dependecies(it will install dependecies from all workspaces):
```
yarn
```
Run webpack-dev-server:
```
cd web
yarn start
```

## Structure
#### core
Core logic - actions, reducers, sagas, selectors, types and helpers.
#### web
Web project - UI components and containers, depends on core

## Transpiling/Babel
To transpil JS code used [babel][babel]

`babel-loader` config can be found in the webpack rule:
https://github.com/web-pal/mono-app-example/blob/master/web/webpack.config.base.js#L26

Each files with .js and .jsx extensions will be handled by babel-loader, exclude node-modules.

core transpiling will be handled too, webpack(or babel) support worskpaces.

Used presets:  
* [@babel/preset-env][@babel/preset-env] - A Babel preset that compiles ES2015+ down to ES5 by
automatically determining the Babel plugins and polyfills you need based on your targeted
browser or runtime environments.
* [@babel/stage-0][@babel/stage-0] - Includes several babel plugins, details in the link
* [@babel/react][@babel/react] - Babel preset for all React plugins
* [@babel/flow][@babel/flow] - Removes flow types before transpiling

## Code linting
To lint JS code used [eslint][eslint] with [babel-eslint][babel-eslint] parser, whitch allows
to lint ALL valid Babel code.

[eslint-config-airbnb][eslint-config-airbnb] bring rules for [Airbnb style guide][airbnb-style-guide]


[.eslintrc][.base-eslintrc.js]

[Config file][eslint-config] for the eslint.  
We have a [global config][.base-eslintrc.js] and [extended config][web-eslintrc] for the `web`
```
"settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack.config.base.js"
      }
    }
  },
```
it allows eslint understand webpack import rules.

## Flow, static type checking
[Flow][flowtype] - Is a static type checker for your JavaScript code. It does a lot of work
to make you more productive. Making you code faster, smarter, more confidently, and to a bigger scale.
Flow checks your code for errors through **static type annotations**.
These types allow you to tell Flow how you want your code to work, and Flow will make sure
it does work that way.

Does a full Flow check and prints the results:
```
yarn flow
```

[.flowconfig][.flowconfigLocal]

[Config file][.flowconfig] for the flow.  
```
[ignore]
.*/node_modules/.*
```
We ignore node_modules for the static typechecking, but it may throw import errors, so if you use
some third-party library which contains flow definition, just exlude it from the ignore
regexp or use `flow-typed` for modules without flow definition.
Read **flow-typed** chapter above.

```
[options]
esproposal.export_star_as=enable
```
[export_start_as][esproposal.export_star_as] option allows to use `export * as` syntax.


```
[options]
module.name_mapper='^web\-components\/\(.*\)$' -> '<PROJECT_ROOT>/web/src/components/\1'
module.name_mapper='^web\-containers\/\(.*\)$' -> '<PROJECT_ROOT>/web/src/containers/\1'
```
[name_mapper][module.name_mapper] allows to resolve any custom import paths, we use it to
resolve [webpack aliases][webpack-aliases]

### flow-typed
`flow-typed` is a [repository](https://github.com/flowtype/flow-typed/tree/master/definitions) of
third-party [library interface definitions](http://flowtype.org/docs/third-party.html) for use with Flow.

When you start a project with Flow, **you likely want to use some third-party libraries that were
not written with Flow**. By default, Flow will just ignore these libraries **leaving them untyped**.
As a result, Flow can't give errors if you accidentally mis-use
the library (nor will it be able to auto-complete the library).

To address this, Flow supports library definitions which allow you to describe the interface of
a module or library separate from the implementation of that module/library.

The flow-typed repo is a collection of high-quality library definitions, tests to ensure that
definitions remain high quality, and tooling to make it as easy as possible to import them into your project.

All you have to do when you add one or more new dependencies to your project is run flow-typed install.
This will search the libdef repo and download all the libdefs that are relevant for your
project and install them for you. After that, simply check them in and be on your way!

To install package definition use `flow-typed` command:
```
yarn flow-typed install redux-saga@0.16.0
```

## State architecture
The state architecure based on [redux documentation](http://redux.js.org/), so for deeply understanding
just read the documentation.

#### To keep clean project's architecture, use following principles:
* [Data normalizing][data-normalizing] is the most important thing that you have to use.
* [Simple reducer](http://redux.js.org/docs/recipes/reducers/UpdatingNormalizedData.html)
* [Memorized selectors](https://github.com/reactjs/reselect)

## Containers and Components
* [Simple article about it](https://medium.com/@learnreact/container-components-c0e67432e005)
* [Dan Abramov about it](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

## Actions
[Actions][redux-actions] are payloads of information that send data from your application to your store.
They are the only source of information for the store. You send them to the store
using `store.dispatch()`.

#### To keep clean project's architecture, use following principles:
* Dispatch actions from components only using `dispatch` funtion, avoid [bindActionCreators][bindActionCreators].
Type definitions of actions provided by `bindActionCreators` invisible for the components and you have
to define types in `Props`. Using dispatch allows to see type definitions of actions and separates actions
from `props` in the components.
[Example can be found here.][dispatch-example]

* Use general purpose actions - for instance, you have a reducer ui which used like key-value storage,
do not create a new action for each key changing, define one action which will service ui key-value storage.
[Example can be found here.][setUiState-example]
```
const setUiState = (
  key: string,
  value: string | number,
): UiAction => ({
  type: actionTypes.SET_UI_STATE,
  payload: {
    key,
    value,
  },
});
```

* If you handle an action in a saga, mark type and name of the action by `Request` prefix.
```
getApiListRequest = (
  type: actionTypes.GET_API_LIST_REQUEST,
) => ({
  type: actionTypes.GET_API_LIST_REQUEST,
});
```

## Selectors/Reselect
To get values from the store use [Reselect library][reselect].

Reselect is a popular library that provides a convenient way of getting values from the store in
a React-Redux application. What makes it so good is its memoization ability.
You can read all this in the documentation. In two words, when you use the `createSelector()` function,
it memoizes an output of every input selector and recalculates the resulting value only if any
of the input selectors changes its output. An important thing to note here is that reselect uses
reference equality (===) to determine a value change.

[Clear ariticle about reselect][reselect-usage]

#### To keep clean project's architecture, use following principles:
* Use general purpose selectors - for instance, you have a reducer ui which used like key-value storage,
since you don't need calculating in the selector for the key-value storage you don't need memoization
and can provige general selector to get value by key.
```
export const getUiState = (key: string) =>
  ({ ui }: { ui: UiState }) => ui[key];
  ```

## Reducers
#### To keep clean project's architecture, use following principles:
* Keep reducers pure - without calculating and definition logic
* Avoid duplicating data in the store, store only [normalized data][data-normalizing]

## Sagas
Use [redux-saga][redux-saga] for side effects(api requests) and long polling business processes.
It's very important to separate this logic from Ui.

`redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like
data fetching and impure things like accessing the browser cache) easier to manage, more efficient
to execute, simple to test, and better at handling failures.
The mental model is that a saga is like a separate thread in your application that's solely
responsible for side effects. `redux-saga` is a redux middleware, which means this thread
can be started, paused and cancelled from the main application with normal redux actions,
it has access to the full redux application state and it can dispatch redux actions as well.

It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test.
*(if you're not familiar with them [here are some introductory links](https://redux-saga.js.org/docs/ExternalResources.html))*
By doing so, these asynchronous flows look like your standard synchronous JavaScript
code. (kind of like `async`/`await`, but generators have a few more awesome features we need)

You might've used `redux-thunk` before to handle your data fetching. Contrary to redux thunk,
you don't end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.

## Git flow
We use [Vincent Driessen's branching model.](http://nvie.com/posts/a-successful-git-branching-model/)

Read details here:
- http://nvie.com/posts/a-successful-git-branching-model/
- http://danielkummer.github.io/git-flow-cheatsheet/

To make the git flow experience smoother you can use **custom git commands**(regular shell scripts) -
[git-flow](https://github.com/petervanderdoes/gitflow-avh)

- **[Installation instruction](https://github.com/petervanderdoes/gitflow-avh/wiki/Installing-on-Mac-OS-X)**
- **[git-flow commands](https://github.com/petervanderdoes/gitflow-avh/wiki#reference)**

[Setup](https://github.com/petervanderdoes/gitflow-avh#initialization) a git repository
for **git-flow** usage(store **git-flow** config in .git/config):
```sh
git flow init -d
```

## Commit message
We use [conventional commits specification](https://conventionalcommits.org/) for commit messages.

#### Commitizen
To ensure that all commit messages are formatted correctly, you can use
[Commitizen](http://commitizen.github.io/cz-cli/) cli tool.
It provides interactive interface that creates your commit messages for you.

```sh
sudo npm install -g commitizen cz-customizable
```

From now on, instead of `git commit` you type `git cz` and let the tool do the work for you.

The following commit types are used on the project:
- **feat** - A new feature
- **fix**- A bug fix
- **improvement** - Improve a current implementation without adding a new feature or fixing a bug
- **docs** - Documentation only changes
- **style** - Changes that do not affect the meaning of the code(white-space, formatting, missing semi-colons, etc)
- **refactor** - A code change that neither fixes a bug nor adds a feature
- **perf** - A code change that improves performance
- **test** - Adding missing tests
- **chore** - Changes to the build process or auxiliary tools and libraries such as documentation generation
- **revert** - Revert to a commit
- **WIP** - Work in progress

You should strive for a clear informative commit message.
Read **[How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)**.

**Helpful hint**: You can always edit your last commit message, before pushing, by using:
```sh
git commit --amend
```

## Contributing
After cloning the repo, initialize the local repository with gitflow(if you use it):
```sh
git flow init -d
```

When starting work on a new issue, branch off from the develop branch.
```sh
git checkout -b feature/<feature> develop
# git-flow:
git flow feature start <feature>
```
If your feature/bug/whatever have an **github issue** then use issue id as feature name.
For instance:
```sh
git checkout -b feature/1 develop
# git-flow:
git flow feature start 1
```
Which mean you start working on #1 issue(/issues/1 regarding the repo).

Then, do work and commit your changes.
```sh
git push origin feature/<fature>
# git-flow:
git flow feature publish <feature>
```
When done, open a pull request to your feature branch.

If you have a permit to close the feature yourself:
```sh
git checkout develop
# Switched to branch 'develop'
git merge --no-ff feature/<feature>
# Use --no-ff to avoid losing information about the historical existence of a feature branch
git branch -d feature<fature>
# Deleted branch
git push origin develop
```

Same with **git-flow**:
```sh
git flow feature finish
```

## Preparing a good PR

- A pull request should have a specific goal and have a descriptive title.
Do not put multiple unrelated changes in a single pull request
- Do not include any changes that are irrelevant to the goal of the pull request.
This includes refactoring or reformatting unrelated code and changing or adding auxiliary files
(.gitignore, etc.) in a way that is not related to your main changes.
- Make logical, not historical commits. Before you submit your work for review, you should rebase
your branch (**git rebase -i**) and regroup your changes into logical commits.
Logical commits achieve different parts of the pull request goal.
Each commit should have a descriptive commit message.
Logical commits within a single pull request rarely overlap in the lines of code they touch.
- If you want to amend your pull request, rewrite the branch and force-push it instead of
adding new (historical) commits or creating a new pull request.

## IDE integration
To respect local indent rules use [.editorconfig][.editorconfig]

### Syntax highlight
#### Vim
The following plug-ins are great for the syntax highlight:
* [vim-javascript][vim-javascript]
* [vim-jsx][vim-jsx]

```
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
```
it will use eslint bin and config files from the project.

#### Atom
help wanted...
#### Vscode
help wanted...

### Linting
#### Vim
To handle eslint use [Asynchronous Lint Engine][ale]
```
Plug 'w0rp/ale'

" Configure ale (linting)
let g:ale_sign_column_always = 1
let g:ale_linters = {
      \'javascript': ['eslint']
      \}
```
#### Atom
help wanted...
#### Vscode
help wanted...

### Code analyzer - autocomplete, suggestions, hover definitions
To analyze the code use [flow][flowtype] as [LSP][LSP] server.
The Language Server protocol is used between a tool (the client) and a language smartness provider
(the server) to integrate features like auto complete, go to definition, find all references and alike into the tool

#### Vim
You need to install [LSP client for the vim][LanguageClient-neovim].  
At this moment LSP mode in flow in development, but we can use [LSP wrapper for the flow][flow-language-server].  
To get completions from LSP client use [nvim-completion-manager][nvim-completion-manager]
```
Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh',
    \ }

let g:LanguageClient_serverCommands = {
\ 'javascript': ['flow-language-server', '--stdio', '--try-flow-bin'],
\ 'javascript.jsx': ['flow-language-server', '--stdio', '--try-flow-bin'],
\ }
imap <expr> <CR>  (pumvisible() ?  "\<c-y>\<Plug>(expand_or_nl)" : "\<CR>")
imap <expr> <Plug>(expand_or_nl) (cm#completed_is_snippet() ? "\<C-M>":"\<CR>")
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
```
It gives you autocomplete, go to definition and hover suggestion functionality.
![All in one screenshot](https://github.com/web-pal/mono-app-example/blob/master/files/2018-04-23%2018.37.36.gif)

[webpack]: https://webpack.js.org/
[yarn-workspaces]: https://yarnpkg.com/lang/en/docs/workspaces/
[babel]: https://babeljs.io/
[flowtype]: https://flow.org/
[flow-typed]: https://github.com/flowtype/flow-typed
[eslint]: https://eslint.org/
[eslint-config]: https://eslint.org/docs/user-guide/configuring
[eslint-config-airbnb]: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
[babel-eslint]: https://github.com/babel/babel-eslint
[airbnb-style-guide]: https://github.com/airbnb/javascript/tree/master/react

[react]: https://reactjs.org/
[redux]: http://redux.js.org
[redux-actions]: https://redux.js.org/basics/actions
[redux-saga]: https://github.com/redux-saga/redux-saga
[redux-resource]: https://github.com/jmeas/redux-resource
[reselect]: https://github.com/reactjs/reselect
[reselect-usage]: https://dashbouquet.com/blog/frontend-development/usage-of-reselect-in-a-react-redux-application
[styled-components]: https://www.styled-components.com

[@babel/preset-env]: https://github.com/babel/babel/tree/master/packages/babel-preset-env
[@babel/stage-0]: https://babeljs.io/docs/plugins/preset-stage-0/
[@babel/react]: https://github.com/babel/babel/tree/master/packages/babel-preset-react
[@babel/flow]: https://babeljs.io/docs/plugins/preset-flow/

[.editorconfig]: http://editorconfig.org/
[.base-eslintrc.js]: https://github.com/web-pal/mono-app-example/blob/master/.base-eslintrc.js
[web-eslintrc]: https://github.com/web-pal/mono-app-example/blob/master/web/.eslintrc
[.flowconfig]: https://flow.org/en/docs/config/
[.flowconfigLocal]: https://github.com/web-pal/mono-app-example/blob/master/.flowconfig
[esproposal.export_star_as]: https://flow.org/en/docs/config/options/#toc-esproposal-export-star-as-enable-ignore-warn
[module.name_mapper]: https://flow.org/en/docs/config/options/#toc-module-name-mapper-regex-string
[webpack-aliases]: https://github.com/web-pal/mono-app-example/blob/master/web/webpack.config.base.js#L15
[bindActionCreators]: https://redux.js.org/api-reference/bindactioncreators
[data-normalizing]: http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html

[dispatch-example]: https://github.com/web-pal/mono-app-example/blob/master/web/src/containers/ExampleContainer/ExampleContainer.jsx#L35
[setUiState-example]: https://github.com/web-pal/mono-app-example/blob/master/core/src/actions/ui.js#L11

[vim-javascript]: https://github.com/pangloss/vim-javascript
[vim-jsx]: https://github.com/mxw/vim-jsx
[ale]: https://github.com/w0rp/ale
[LanguageClient-neovim]: https://github.com/autozimu/LanguageClient-neovim
[nvim-completion-manager]: https://github.com/roxma/nvim-completion-manager

[LSP]: https://langserver.org
[flow-language-server]: https://github.com/flowtype/flow-language-server
