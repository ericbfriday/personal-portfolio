# Weekend 6 HW
## Start a Portfolio

### Objectives
- Angular practice with multiple views, controllers, and a service
- Front end styling
- Hosting without a database on Heroku

### Setup

- Fork this repo and clone it to your computer
- `npm install`
- Create a new `personal access token` on GitHub. This is under the user setting.
	- [Generate a GitHub Token](https://github.com/settings/tokens). Select only `public_repo` and `read:user`.
- Create a `.env` file and add a `USER_NAME` and `GIT_TOKEN` to it. The `.env` is already added to the `.gitignore` so that you will not push it to github. More information about dotenv can be found [here](https://www.npmjs.com/package/dotenv).
- `npm start`

### Instructions

Create a landing page for yourself as a developer. This is a front end project, it has a simple server set up to serve back your static files. The focus will be on Angular and front end styling.

#### Front End
- Have at least two views. One page about you and one page about your code.
  - One view about you that uses some info from the Github Profile API call
  - One view about your code that uses info from the Github Repo API call.
- Use the `GithubService` angular service to interact with the simple server that is provided. 
- Style your site.

#### Back End
- You have already been given a simple server that calls out to the GitHub API. You shouldn't need to change the code but are welcome to make changes.
	- For reference, here is the [API Docs](https://developer.github.com/v3/) for GitHub.
- As practice, comment each line of code in the server. Make sure you know what each line does.

**Existing Routes**

The following routes have been provided and should work after setting up your `.env` file.

- `http://localhost:5000/github/repos` - returns your repositories
- `http://localhost:5000/github/user` - returns your GitHub user information

## Hard Mode

### Deploy
- Deploy the app on Heroku. It doesn't have a database so you can follow the same steps as we did in lecture.
- Here is the repo from the deployment lecture: [https://github.com/devjanaprime/herokuDeploy_noDb
](https://github.com/devjanaprime/herokuDeploy_noDb)
- Use environment variables on Heroku for your GitHub username and API key, **the .env file should not be checked in (leave it in the .gitignore)**. To set these up click into the app on Heroku, Settings, Reveal Config Vars, and add the same key value pairs you have in your local `.env` file.

## Submit
- The github repo url (where the code lives)
- If deployed: The Heroku url (url of the deployed site)
