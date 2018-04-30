+++
Description = ""
Tags = []
Categories = []
title = "Tutorial: Plotting your Facebook friend network using NetworkX and python-louvain"
summary = "Tutorial (with code) on how to plot your Facebook friend network"
menu = "main"
draft = false
date = 2018-04-30T16:13:15+01:00
+++

Last week I published [an article](/post/facebook-graph-network/) showing you how I built a friend graph using you Facebook data.

This article is a detailed version showing you how to do it yourself. Here's what we'll end up with:

{{< figure src="/images/facebook-graph.jpg" link="/images/facebook-graph.jpg" target="_blank" caption="Facebook friend network (click to enlarge)" >}}

**Warning**: To make such a graph, you need to scape all your mutual friends. Scrapping is automated but can take a few hours.

Let's get started !

## Scrapping the data

Facebook does not let you access friends you have in common via any API, so we'll have to scrappe the data.

Clone the repo, and install requirements:

    git clone https://github.com/EliotAndres/facebook-friend-graph
    cd facebook-friend-graph
    pip install -r requirements.txt

The scrapping script will open a Chrome window and go to each of your friends profile. It'll then read the DOM to save your mutual friends.

It's using the Chrome drive, so you must also [install it](https://sites.google.com/a/chromium.org/chromedriver/). Once done, you can run:

    python facebookFOF.py

The script will prompt you for your username/password. You'll see a progress bar. It will periodically save the graph. So if it fails, you can just restart it and it'll start where it stopped.
It can take up to a few hours depending on your connection.

You'll end up with a .pickle file containing you friend graph information. Now let's plot this data !

## Building the graph
You'll find all the details in the notebook below. [It's available here.](https://github.com/EliotAndres/facebook-friend-graph/blob/master/Facebook%20friend%20graph.ipynb)
<script src="https://gist.github.com/EliotAndres/10d87567a2f81209f4c9be62c421a5df.js"></script>

## Conclusion
The graph should be made of differentiated clusters. You can hover over the clusters to see your friends names.
 You can also play with the parameters and the colors to make it suit your needs. **If you encounter any problem, open an issue on Github.**

## Acknowledgements

Original notebook author: [Lucas Allen](https://twitter.com/lucasallenio), [original code](https://github.com/lgallen/twitter-graph)

Original scrapping code (Python 2) [here](https://github.com/giladravid/FacebookFOF)

