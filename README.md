# UX Form and validation prototyping

This repo contaings examples of using form elements with validation using ParsleyJS. It uses [mustache](https://github.com/janl/mustache.js) templates for pages and partial form elements. 
This includes the styles taken from [Gov UK Template](https://github.com/alphagov/govuk_template) and sass from [Gov UK frontend toolkit](https://github.com/alphagov/govuk_frontend_toolkit)

## Table of contents
1. [Requirements](#requirements)
2. [Setup](#setup)
3. [Run](#run)

<a name="requirements">
## Requirements
This repo requires you to have NodeJS, Ruby, Sass, and Compass >=1.0.1 installed.

### NodeJs & NPM
- Install [NodeJs](https://github.com/creationix/nvm)
- Once installed run `$ nvm install v0.10.26`

### Ruby
- Install ruby using [RVM](https://rvm.io/rvm/install)
- Test ruby has installed by `$ ruby -v` you should see something like `$ ruby 2.2.1p85 (2015-02-26 revision 49769) [x86_64-darwin14]`

### Compass & Sass
- When you've confirmed you have Ruby installed, run gem update --system && gem install compass to install Compass and Sass

<a name="setup">
## Setup

- `$ cd ux-form-validation-prototype`
- `$ npm install`

<a name="run">
## Run

- Run `$ grunt`
- A window will automatically open on `http://localhost:8000` on the first page of the prototype
- the built flat site will be in the 'build' folder	

