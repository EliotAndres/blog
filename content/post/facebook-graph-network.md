+++
Description = ""
menu = "main"
title="Using Facebook data to plot my friend network"
summary = "In this blog post, I'll explain how to plot a Facebook friend network"

date = "2018-04-23T11:02:15+02:00"
draft = false

+++



Inspired by a friend's  post, I decided to plot my Facebook network. To do so, I scrapped "mutual friends" and made the following graph:

{{< figure src="/images/facebook-graph.jpg" link="/images/facebook-graph.jpg" target="_blank" caption="Facebook friend network (click to enlarge)" >}}


In this blog post, I'll explain how the graph is made and how clusters are created. In a following blog post, I'll explain how to make it yourself.

# A few comments on the graph
In this graph, each friend is represented by a node. Each edge represents a friendship.
You'll see that clusters are roughly made of where I went to school or in holidays.
One cluster is the group of people I'm traveling with as part of my [Remote Year](http://remoteyear.com/).
The node in the middle represents me.

# How it was made
### 1 - Scrapping mutual friends
Facebook does not let you access friends you have in common via any API, so I had to make a script to gather the relationships. I ended up with a list of edges (friend1 <-> friend2)

### 2 - Plotting the graph
The position of the nodes is computed using the [Fruchterman-Reingold Algorithm](https://en.wikipedia.org/wiki/Force-directed_graph_drawing).
It is a is a force-directed algorithm. The general idea is to represent each friendship by a spring. The consequences are:

- When you are part of a large group of people, the numerous springs will bring you closer to the group.
- If you are friend with 2 large groups, you'll appear in the middle of the 2 groups because of the opposing forces.
- If you are friend with only a few people, you'll appear on the outter border of the graph

### 3 - Clustering
You'll also notice that each group has a different color. Each color represents a community. To create those communities, I used the [Louvain Method for community detection](https://en.wikipedia.org/wiki/Louvain_Modularity). The method attempts to maximize [modularity](https://en.wikipedia.org/wiki/Modularity_(networks)). The general idea of modularity is to measure the number of connections between people of different communities.

Therefore if the graph has a high modularity, it means that there are few edges connecting 2 nodes of different communities but numerous edges connecting 2 nodes of the same community.

In the Louvain Method of community detection, small communities are found by optimizing modularity locally on all nodes. Then each small community is grouped into one larger community.

You'll find an animation of the community merging below:

{{< youtube id="dGa-TXpoPz8" autoplay="false" >}}

Video credits to [Keith Jolley](https://github.com/keithpjolley)

# Make it yourself
I'm currently writing a tutorial on how to make it yourself. When it'll be ready, I'll update this blog post.
**Update**: [here's the blog post](/post/friend-graph-tutorial/)




