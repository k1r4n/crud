# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t crud .`

This will create a new docker image with the name **crud**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/data -it crud <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/data -it crud yarn install`

This will install the dev dependencies as well as the project dependencies.


## Running the files

`docker run --rm -v $(pwd):/data -it -p 7000:7000 crud yarn start`

This will execute the project

## Non-Docker Installation

`npm install` or `yarn install`

This will install the dev dependencies as well as the project dependencies.

## Non-Docker Execution

`npm run start` or `yarn start`

## Username

`admin`

## Password

`password`