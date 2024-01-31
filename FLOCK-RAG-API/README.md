# FLock Model API

## Introduction

This is the example git repository for the FLock Model API. It contains the following files:

```
📦FLOCK-RAG-API
 ┣ 📂dist
 ┃ ┗ 📜main.js
 ┣ 📂src
 ┃ ┣ 📜main.js
 ┃ ┗ 📜main.ts
 ┣ 📜.env
 ┣ 📜.env.sample
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package.json
 ┣ 📜tsconfig.json
 ┗ 📜yarn.lock
```

- .env: Environment variables for the project
  - `api_key`: API key for the FLock Model API
  - `model_name`: Name of the model to use
  - `endpoint`: Endpoint for the FLock Model API
- `src/main.ts`: Example Typescript code for using the FLock Model API
- `src/main.js`: Example Javascript code for using the FLock Model API

## Usage

First cloen the repository and install the dependencies:

```
git clone xxx
cd FLock-Model-API
```

Install the dependencies:

```bash
# Using yarn
yarn install

# Using npm
npm install
```

Then, copy/create a `.env` file with the following contents:

```
FLOCK_API_KEY=xxx
MODEL_NAME=xxx
ENDPOINT=xxx
```

Finally, run the example code:

```bash
# using Javacript
yarn start:js

# using Typescript
yarn build && yarn start:ts

```

For more information such as call response, please refer to the [documentation](https://docs.flock.io/ai-co-creation-platform/model-api-guide).
