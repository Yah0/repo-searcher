# repo-searcher

The app connects with GitHub API and based on provided search (organization name) fetches all organization repos wheter the provided token has acces to it or not.

After fetching you are able to filter fetched repos based on wheter they are private or public and you can filter them by programming languages that are present among all repos.

The app is designed to be run on Google Chrome Browser.

## Prerequisites

You will need the following things properly installed on your computer.

- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `cd repo-searcher`
- `npm install`

## Running

- `npm run start`
- `ember s`

### Running Tests

- `npm run test`
- `npm run test:ember -- --server`
- `ember test --server`

