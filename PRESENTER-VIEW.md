# ShowOff Presenter View

As I had some free time I started to think about a way to have a sort of presenter view for ShowOff.

This is what I came up with:

![ShowOff Presenter View](http://tmp.fnordig.de/th-showoff-presenter-view.png)

It's early alpha and more a hack-ish way than a real solution (yet).

## How?

To control the presentation from another browser window I implemented a quick websocket server using [Socket.io](https://github.com/LearnBoost/Socket.IO). I'm quite familiar with Javascript and the awesome [Socket.io-node](https://github.com/LearnBoost/Socket.IO-node) server part, so I just used that instead of getting a version in ruby up and running.

So to start a presentation in presenter view mode you have to first start the presentation the normal way:

    showoff serve

and then fire off the websocket server using [node](https://github.com/joyent/node):

    node presenter.js

It just acts as a proxy between the fullscreen presentation and the Presenter View passing along all incoming messages.

Next point your webbrowser to <http://localhost:9090> for the default presentation and open <http://localhost:9090/presenter> in another window.

If both pages are loaded, press 'w' in both windows and a message "Both sides are connected, let's go" should appear. If so, the browser windows are connected and advancing slides in the Presenter View will advance the other presentation, too.

## This is more a proof of concept than a real solution! Keep that in mind and help improve it.
