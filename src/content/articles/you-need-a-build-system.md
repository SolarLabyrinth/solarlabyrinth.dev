---
title: "Godot Devs: You Need A Build System!"
description: "Wouldn’t it be nice if your jam game was automatically uploaded to Itch every time you committed to main? GitHub can do this, and this guide will make setting it up easy."
pubDate: "Apr 6 2025"
heroImage: "/images/you-need-a-build-system.png"
---

# Godot Devs: You Need A Build System!

If you've ever joined a game jam, it's quite likely that you've had to upload your game to [itch.io](https://itch.io/) at least once. And if you're like me, it's far more than just once.

Many times have I exported my web build, forgotten to name files correctly, or uploaded an old zip file. And just when I fix those issues, I test my game, find a bug, and have to repeat the whole process over again.

Wouldn't it be nice if the game was automatically exported and uploaded to itch every time I committed to main? GitHub can do this for us, and this guide will make setting it up easy.

> If you already know how GitHub Actions work or just want to copy/paste the final result, feel free to skip ahead:
>
> 1. [How Do Manual Exports Work Anyway?](#how-do-manual-exports-work-anyway)
> 2. [GitHub Workflow Basics](#github-workflow-basics)
> 3. [Setting Up Godot in GitHub Actions](#setting-up-godot-in-github-actions)
> 4. [Setting Up Butler in GitHub Actions](#setting-up-butler-in-github-actions)
> 5. [The Final Result](#the-final-result)
> 6. [Conclusion](#conclusion)

## How Do Manual Exports Work Anyway?

When I'm thinking about automating a bunch of manual steps, I like to list them all out so I don't forget any.

Let's start from the bare minimum, and imagine that we have a brand new computer - no software on it at all. And we need to configure it to create, export, and upload a game using Godot. What are all the actions we need to take to do this?

1. First, we need to download Godot itself. We can get it from a few places such as Godot's [website](https://godotengine.org/) or [github releases](https://github.com/godotengine/godot-builds/releases) page.

1. Next, we need to actually create a game with the engine. It can be something quite simple for this example. You can use an existing project of yours if you like. I'm going to use my game [PacSnek](https://github.com/SolarLabyrinth/PacSnek) for this. Feel free to fork it and follow along if you don't have a project readily available.

1. Now we need to export our game as a web build. We can do this in the "Project > Export..." menu. This will prompt us to add or select a previously added preset. We'll chose Web so we can upload it as a web build for our Jam.

1. Since we're on a brand new computer, Godot doesn't have any export templates installed yet. Godot will prompt us to download them before we can proceed. These export templates change with every Godot release, and have to be installed every time you change versions.

1. Once that's done, we can choose an Export Path. I like to use a `./build` directory in my repository for this. We need to create it if it doesn't already exist. Itch also requires that web builds be named "index.html". So I'll select "build/index.html" for this value.

1. Now we can finally export the project with the aptly named "Export Project..." button. This will create a bunch of files for us in our `./build` directory.

1. To upload this to itch we need to zip all of these files up into a .zip file. Making sure that index.html is at the root of that zip file. Select them all. Compress them into a .zip file and we can continue.

1. Now we need to go to our [Itch.io Creator Dashboard](https://itch.io/dashboard) and create a new project for us to upload to. Set a title, url, and values for any of the other fields you would like to change. The most important values we care about for this guild is in the "Uploads" section. Upload your zip file there and make sure to check the play in browser button. You may need to modify some Embed options like the width and height, or add a full screen button.

1. Hit save, navigate to the project's page, and we should be done.

That's a lot of steps. Lets automate each and every one with a GitHub Actions.

## GitHub Workflow Basics

To get GitHub to do things for us, we need to create what's called a "workflow" file. These are `.yml` files located in a `.github/workflows` directory in our project. We'll create one for this guide and call it `build.yml`. It could be named anything, but this seems descriptive to me.

Copy and paste this into that `build.yml` file:

```yml
# .github/workflows/build.yml

name: Build

on:
  push:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Say Hi
        run: echo "Hello World!"
```

Go ahead and save that file, commit, and push it up to GitHub. Now check out the "Actions" tab in your repository's page.

You should see a workflow running. Clicking on it will bring you to the overview page for that run. It will list all the jobs on the left. Selecting the build job here will show you all actions that github is performing during this workflow.

You should see a "Say Hi" step in that list. Expanding it should show that it printed "Hello World!" to the console.

Let's explain what each of these entries in the .yml files does before moving on.

```yml
name: Build
```

This is the name of our workflow. We can call it anything we like. That name is what will appear in GitHub's UI.

```yml
on:
  push:
```

These lines describe what events can trigger our workflow. There's [a lot of events to choose](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows) from, but this option will run it on every push to our repository.

Maybe we only want to run it on pushes to our main branch, but not any other branch. For this we can say:

```yml
on:
  push:
    branches:
      - main
```

Finally we have the jobs section:

```yml
jobs:
  build: # <- We can name this job anything
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository # <- Step names can be any value you like too
        uses: actions/checkout@v4

      - name: Say Hi
        run: echo "Hello World!"
```

This lets us define a list of jobs we want to run in this workflow. Ours has 1 job called "build". We could name this anything we like, but that seems descriptive for what we want to do.

This build job states that it runs on "ubuntu-latest". This will cause GitHub to provision a brand new linux machine every time this workflow runs to run the steps we specify.

GitHub also supports Windows & MacOS runners here, but Linux is usually simpler and faster for automation such as this.

The steps section tells github what commands to run:

```yml
steps:
  - name: Checkout Repository
    uses: actions/checkout@v4
```

This is where GitHub gets interesting. Whenever you see a step that has a "uses" key, that means you're wanting to use a "Custom Action". These are collections of scripts or code that other people create and make available for you to use.

The value "actions/checkout@v4" is shorthand for a GitHub repository link: [https://github.com/actions/checkout](https://github.com/actions/checkout). The version number refers to one of it's releases.

This action is used to clone your repository to the newly created Linux runner. It's created by GitHub itself, but there are tons of custom actions you can choose from in the [GitHub marketplace](https://github.com/marketplace?type=actions). You can [even make your own](https://docs.github.com/en/actions/sharing-automations/creating-actions), either in your projects repository, or in a separate repo you create just for that action.

Our second step is much more simple:

```yml
- name: Say Hi
  run: echo "Hello World!"
```

Whenever you see the "run" key, that means you're wanting to run this bash command in your Linux machine's terminal. In this case, we're just telling it to print the string: "Hello World!"

We can use any command we like here. We can install packages with `apt`, download files with `wget`, `ssh` to remote machines to do something, or even export and upload our Godot Games to Itch.io.

Lets finally get started with doing that.

## Setting Up Godot in GitHub Actions

An easy way to download godot is from their GitHub releases page: https://github.com/godotengine/godot-builds/releases

At the time of writing, 4.4.1 is the latest stable release of godot, but you can choose whatever version you are using. These commands should be valid for any version of Godot 4 you substitute in. Godot 3 is a bit different and may require more investigation.

Since our GitHub machine is using Linux, we'll want to download the linux.x86_64 version of Godot. And since we want to export web builds, we'll chose the non-mono version.

We can use the `wget` command to download files on Linux. Our workflow step would look like this:

```yml
- name: Download Godot
  run: wget https://github.com/godotengine/godot-builds/releases/download/4.4.1-stable/Godot_v4.4.1-stable_linux.x86_64.zip
```

Godot provides their releases as .zip files, so after we download it, we need another step to unzip it. Linux has a helpful `unzip` command that does this:

```yml
- name: Unzip Godot
  run: unzip Godot_v4.4.1-stable_linux.x86_64.zip
```

This leaves us with a really ugly file name though: `Godot_v4.4.1-stable_linux.x86_64`. We can rename it to something prettier like `godot` with this command:

```yml
- name: Rename Godot
  run: mv Godot_v4.4.1-stable_linux.x86_64 godot
```

While we're here. Lets also install the Export Templates. We can get these from the same releases page as the Godot Executable. Make sure to chose the non-mono version, since that's the one we're using.

```yml
- name: Download Export Templates
  run: wget https://github.com/godotengine/godot-builds/releases/download/4.4.1-stable/Godot_v4.4.1-stable_export_templates.tpz
```

These are provided as a `.tpz` file, which is just another kind of compressed archive. `unzip` can handle this just fine also.

```yml
- name: Unzip Export Templates
  run: unzip Godot_v4.4.1-stable_export_templates.tpz
```

This will drop the export templates in the root of your project's repository, but that's not where Godot looks for them by default when exporting your projects. We'll need to move them to the right place.

On linux, Godot expects the export templates to be located at `~/.local/share/godot/export_templates/4.4.1.stable`. So that's where we'll move them to. These commands will do this for us. First we create the export template directory if it doesn't exist, then we move the templates there.

```yml
- name: Create Export Template Directory
  run: mkdir -p ~/.local/share/godot/export_templates/4.4.1.stable

- name: Move Export Templates
  run: mv templates/* ~/.local/share/godot/export_templates/4.4.1.stable/
```

Now that we have Godot and our Export Templates installed, we can actually export our game:

```yml
- name: Export Game
  run: |
    mkdir -p ./build
    godot --headless --export-release "Web" ./build/index.html
```

This does a lot of things:

- The `|` symbol lets us run multiple lines of bash commands in a single workflow step.
- We start by making a `./build` directory for Godot to export into.
- Then we run godot with a few command line flags

  - `--headless` means that we don't want to open the Godot Editor's GUI. Our linux machine doesn't have a monitor, so we wouldn't be able to use it even if we wanted to.
  - `--export-release "Web"` Says we want to export our game using the "Web" template. This is the default name Godot uses when you add a preset in the export screen, but if you changed that name you'll need to change it here too. If you want to export in Debug mode, you would chose `--export-debug` instead.
  - `./build/index.html` This is the location godot will save your exported game. In our case we save it in the `./build` directory we just created and name it `index.html` for Itch.io to be happy.

> **Note:**
>
> You need to set the "Web" export template up in the Godot GUI before this command will work. If the `export_presets.cfg` file is being ignored in your `.gitignore` file, then you'll need to remove that and check it into your repo. Otherwise, GitHub Actions will not see your template.

Putting it all together: we should have something that looks like this:

```yml
# .github/workflows/build.yml

name: Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Download Godot
        run: wget https://github.com/godotengine/godot-builds/releases/download/4.4.1-stable/Godot_v4.4.1-stable_linux.x86_64.zip

      - name: Unzip Godot
        run: unzip Godot_v4.4.1-stable_linux.x86_64.zip

      - name: Rename Godot
        run: mv Godot_v4.4.1-stable_linux.x86_64 godot

      - name: Download Export Templates
        run: wget https://github.com/godotengine/godot-builds/releases/download/4.4.1-stable/Godot_v4.4.1-stable_export_templates.tpz

      - name: Unzip Export Templates
        run: unzip Godot_v4.4.1-stable_export_templates.tpz

      - name: Create Export Template Directory
        run: mkdir -p ~/.local/share/godot/export_templates/4.4.1.stable

      - name: Move Export Templates
        run: mv templates/* ~/.local/share/godot/export_templates/4.4.1.stable/

      - name: Export Game
        run: |
          mkdir -p ./build
          ./godot --headless --export-release "Web" ./build/index.html
```

This works, but it's a lot of steps to have to copy and paste. And you may have noticed that we're hard coding the godot version all over the place. If we ever wanted to upgrade it would be nice to just have one place to change it.

This is where custom actions really shine. I've created a custom action that does all of the Godot setup for you in a single step. You can use it directly here, or copy the action.yml directly from it's [repository](https://github.com/SolarLabyrinth/Action-Setup-Godot).

```yml
- name: Setup Godot
  uses: solarlabyrinth/action-setup-godot@v2
  with:
    version: 4.4.1-stable
```

The "with" key lets you pass variables into a custom action. Choose whichever version of godot you would like. This action is tested against all stable versions of Godot 4 and the latest unstable release. Additional variables are detailed in the [Readme](https://github.com/SolarLabyrinth/Action-Setup-Godot/blob/main/README.md).

This action also adds godot to the system path, so we don't need to add a `./` in front of godot when we use it in the "Export Game" step.

> **Note:**
>
> Always be cautious when using custom actions from unknown sources. Especially if you're passing credentials to them. This action is simple and easily audited, but you might want to consider copying the `action.yml` file directly into your repository to avoid future supply-chain attacks.

Our workflow file now looks like this:

```yml
# .github/workflows/build.yml

name: Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Godot
        uses: solarlabyrinth/action-setup-godot@v2
        with:
          version: 4.4.1-stable

      - name: Export Game
        run: |
          mkdir -p ./build
          godot --headless --export-release "Web" ./build/index.html
```

Much nicer, if I do say so myself.

## Setting Up Butler in GitHub Actions

[Butler](https://itch.io/docs/butler/) is a handy command line tool that Itch provides to upload games to their site. Setting it up is very simple. Their [docs](https://itch.io/docs/butler/installing.html#the-automation-friendly-way) cover it in detail.

This is a workflow step that will install butler for us.

```yml
- name: Download Butler
  run: |
    wget -O butler.zip https://broth.itch.ovh/butler/linux-amd64/LATEST/archive/default
    unzip butler.zip
    chmod +x butler
    ./butler -V
```

This downloads the latest butler .zip file, unzips it, marks it as executable, and then prints the butler version to the console.

Now, we need to provide our GitHub machine with credentials to publish games to our Itch account.

Go to Itch's [API key page](https://itch.io/user/settings/api-keys) and click "Generate new API key".

View the full key, and copy it to your clipboard.

Now we need to save this key in your GitHub Repository's Secrets list.

Go to your game's repository settings page and navigate to the "Secrets and variables > Actions" page.

Create a new repository secret.

- We can name our variable anything we like. I'll use: `BUTLER_API_KEY`
- Paste the api key you copied from Itch into the "Secret\*" section.
- Click "Add secret"

GitHub will now encrypt this api key and provide it to our workflow whenever it runs. Lets use it.

On Linux, Butler expects our api key to live in a file called `butler_creds` in the `~/.config/itch` directory. So lets make a workflow step that copies our API key into that location.

```yml
- name: Save Butler API Key
  run: |
    mkdir -p ~/.config/itch
    echo "${{ secrets.BUTLER_API_KEY }}" > ~/.config/itch/butler_creds
```

If you're wondering if I have a nice 1-step action for you to use for this also. The answer is yes, [absolutely](https://github.com/SolarLabyrinth/Action-Setup-Butler).

```yml
- name: Setup Butler
  uses: solarlabyrinth/action-setup-butler@v1
  with:
    key: ${{ secrets.BUTLER_API_KEY }}
```

Now that we have butler installed and authenticated with our Itch account, we can use it to push our game to our Itch page. If you haven't already created a page for your game, do this now.

```yml
- name: Upload to Itch
  run: butler push ./build ITCH_ACCOUNT/GAME_NAME:web
```

This calls butler with some arguments. You'll need to customize it for your account and game. If you're not using the custom action, you'll need to add a `./` in front of the butler command: `./butler push ./build ITCH_ACCOUNT/GAME_NAME:web`. Since we're not calling butler from the system path.

- `push` will tell butler to push our game to Itch.
- `./build` is the directory that contains your exported godot game. We used `./build` everywhere in this article, but if you used a different path, specify that here.
- `ITCH_ACCOUNT/GAME_NAME:web` specifies 3 things.
  - The name of your itch account
  - The name of your game on itch
  - The "channel" you are deploying to.
    - If your game has separate Windows, Linux,and Mac builds those would each be different "channels" for this purpose. The [Butler docs](https://itch.io/docs/butler/pushing.html#channel-names) speak more about how those work.
    - For a web build, we can name this channel whatever we want, just make sure not to change it later.
  - Since my Itch name is SolarLabyrinth, and my game's name is PacSnek. my command would say `solarlabyrinth/pacsnek:web`. Update the command to use your names.

And that's it!

## The Final Result

Our final file should look like this. Committing it to your game's repository will cause it to run automatically every time you commit to main. Make sure you've saved the Butler API key as a repository secret and replaced the `ITCH_ACCOUNT` and `GAME_NAME` placeholders with your own values.

The first time a web build is published through Butler, you will need to go to the Itch Project's Settings Page and set the "Kind of Project" to an "HTML" game. Then also mark the web.zip under Uploads as play in browser. Every build after the first will remember this value.

### Final Workflow File

```yml
# .github/workflows/build.yml

name: Build

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Godot
        uses: solarlabyrinth/action-setup-godot@v2
        with:
          version: 4.4.1-stable

      - name: Export Game
        run: |
          mkdir -p ./build
          godot --headless --export-release "Web" ./build/index.html

      - name: Setup Butler
        uses: solarlabyrinth/action-setup-butler@v1
        with:
          key: ${{ secrets.BUTLER_API_KEY }}

      - name: Upload to Itch
        run: butler push ./build ITCH_ACCOUNT/GAME_NAME:web
```

### Repository Secrets

| Name           | Value                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------- |
| BUTLER_API_KEY | Copy and pasted from your Itch.io [API key page](https://itch.io/user/settings/api-keys) |

## Conclusion

That's it! Congratulations. Go forth and enjoy not having to waste your precious Game Jam time on deployment shenanigans.

Automated deployment tools like GitHub Actions are really powerful and convenient for all kinds of tasks. You can run tests every time you change files, deploy dedicated server builds to your dev servers, or automate building client versions for several platforms all in one go.

The only limits when it comes to build automation is your creativity. Well... and time... and I guess API availability. And possibly free tier usage limits. And... well. Ok. You get the point.

Think about automating whatever frustrates you. Automating it once means you never have to mess with it again.
