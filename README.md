# Gulp Front-End Starter Kit

Frontend development on steroids

###Why use a task runner?

In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

###Why use Gulp?
![alt tag](https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png)


####Easy to use

By preferring code over configuration, gulp keeps things simple and makes complex tasks manageable.

####Efficient

Using the power of node streams, gulp gives you fast builds that don't write intermediary files to disk.
High Quality

By enforcing strict plugin guidelines, we ensure that plugins stay simple and work as expected.

####Easy to Learn

Using node best practices and maintaining a minimal API surface, your build works exactly as you would imagine.
### What can this do?



* Compiling Sass
* CSS and JS minification
* Strip unused CSS with uncss
* Image optimization
* Multi device testing using browsersync
* Install package via Bower





## Getting Started
Gulp and Gulp plugins are installed and managed via npm, the Node.js package manager.
Gulp 3.8.x requires stable Node.js versions >= 0.8.0. Odd version numbers of Node.js are considered unstable development versions.

##Installing the Gulp
In order to get started, you'll want to install gulp's command line interface (CLI) globally. You may need to use sudo (for OSX, *nix, BSD etc) or run your command shell as Administrator (for Windows) to do this.

```
$npm install --global gulp
```

This will put the gulp command in your system path, allowing it to be run from any directory.


##Installing the SASS
Linux
If you're using a distribution of Linux, you'll need to install Ruby first. You can install Ruby through the apt package manager, rbenv, or rvm.
Windows
Before you start using Sass you will need to install Ruby. The fastest way to get Ruby on your Windows computer is to use Ruby Installer. It's a single-click installer that will get everything set up for you super fast.
The installer will also install a Ruby command line powershell application that will let you use the Ruby libraries.

Mac
If you prefer the command line over an application then getting Sass set up is a fairly quick process. Sass has a Ruby dependency but if you're using a Mac, congratulations, Ruby comes pre-installed.
Install Sass
Here's the quickest way we've found to start using Sass by using the command line:
Open your Terminal or Command Prompt. On the Mac the Terminal.app comes installed by default. It's located in your "Utilities" folder. On Windows, run `cmd`.

Install Sass. Ruby uses Gems to manage its various packages of code like Sass. In your open terminal window type:
```
$sudo gem install sass

```

Double-check. You should now have Sass installed, but it never hurts to double-check. In your terminal application you can type:
```
$sass -v
```

It should return Sass 3.3.7 (Maptastic Maple). Congratulations! You've successfully installed Sass.
Go and play. If you're brand new to Sass we've set up some resources to help you learn pretty darn quick.

##Install Dev Dependencies
```
$ npm install && bower install

```
###Watch Sass/JS/Image
```
$ gulp serve

```

###Serve Build
```
$ gulp serve:dist


```
###Build Release
```
$ gulp build
```
