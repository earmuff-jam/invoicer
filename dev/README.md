## Developer setup and ease of guide.

Invoicer app is written in JS and is used to build invoices on the fly.

### Installation

To run locally, simply run `npm ci` in project root. A `dev version` should boot up. Ensure you have `.env` file filled with
required variables. View file `env.sample` to view a sample of the `.env` file.

`Note`
This should be enough to run the application locally, however some of the functions might not be readily available to the
developer. This setup generally is for quick testing, unit testing etc. To enable other features, continue below.

#### Netlify functions setup

To run `netlify functions` which incorporate some of the core procedures we should also install `netlify cli` in the host OS. To install `netlify cli` simply run `npm install -g netlify-cli` and run `netlify dev`. If you have already installed the CLI tool, then simply run the later command.

#### Firebase setup

The purpose of the firestore setup is to have some analytics to trace the user steps. This does not save the user information. However, it stores a general idea of where the user traveled during his / her visit which still is anonymous.\*\*\*\*

### Deployment and Git Tag

`Note`: Please ensure that we have the proper commit messages built. We need the commit
messages to be in the format of

```
[feature] Brief one liner | More detailed description

[improvement] Brief one liner | More detailed description

[bugfix] Brief one liner | More detailed description

```

We only support `feature`, `improvement`, or `bugfix` under the release notes section.
This rule should also be implemented over the github PR process as well.

Please follow the correct symantic tags for github. We tag the release, and we let github
do the versioning of the application. This keeps our effort uniform.

```
git tag <tagname> -a <!-- create new tag from here with description. -->
git push origin tags

```
