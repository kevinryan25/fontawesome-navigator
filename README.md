# Font awesome 5 navigator using electron (in development)
<aside class='warning'>
    I am a beginner in development architecture and a non-native english speaker. You can help me by <a href='mailto:contact@kevinryan.tk'>sending an email</a> (suggestion, critics, rectification)
</aside> 

This application is a simple viewer using angular js which helps you to remember and to ease the font awesome icons usage.

## NPM Building
You can easily run your application with :
```bash
cd app/
npm run deploy
```

## Step by step Building
### Building
During the build phase, you must have some experience with grunt, most precisely the usage of `GruntFile.js`  
Execute the command below to build it (you should be in the `app` directory)
```bash
cd app/
grunt build
```
Then, you could see that a `app/dist` ( a copy of `src` directory which will be used when the application runs ).  
At this step you can view the application view a browser via `app/dist/index.html` (this is your webapp), you can copy this directory anywhere you want.

### Electron
You need to have a native web application which could be runned without any browser, you need to use electron.
```bash
electron app/
```

## Licence
<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
