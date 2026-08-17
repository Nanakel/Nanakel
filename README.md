# WWW Website Project

This folder contains the HTML/CSS/JS files for your site. Follow the commands below to create a public GitHub repository and upload everything.

Recommended steps (run from `c:\Users\LENOVO\Desktop\WWW`):

1) Initialize, commit, and push using `gh` (GitHub CLI):

```bash
git init
git add .
git commit -m "Initial commit: upload WWW project"
# Replace <YOUR_USERNAME> and <REPO_NAME>, and choose --public or --private
gh repo create <YOUR_USERNAME>/<REPO_NAME> --public --source=. --remote=origin --push
```

2) If you don't have `gh`, create a repo on https://github.com/new then run:

```bash
git init
git add .
git commit -m "Initial commit: upload WWW project"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

After pushing, your public link will be:

`https://github.com/<YOUR_USERNAME>/<REPO_NAME>`

Notes
- To create a single-file quick share instead, see `gh gist create` (Gist option).
- If you want, tell me your GitHub username and repository name and I will output the exact commands with those values filled in.

