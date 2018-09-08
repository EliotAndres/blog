+++
Description = ""
Tags = []
Categories = []
description = ""
title = "Machine learning explained with gifs: style transfer"
summary = "Understanding style transfer with animated gifs"
menu = "main"
draft = false
date = 2018-05-29T16:45:13+02:00
+++

## About style transfer
Pioneered in 2015, style transfer is a concept that uses transfers the style of a painting to an existing photography, using neural networks.
The original paper is [A Neural Algorithm of Artistic Style](https://arxiv.org/abs/1508.06576) by Leon A. Gatys, Alexander S. Ecker, and Matthias Bethge.

Here are a few examples taken from it:

{{< figure src="/images/style-transfer-examples.jpg" caption="Style transfer example from the original paper" >}}


## How it works
This gif is meant to give you a rough idea on how style transfer works in the orignal paper:
{{< figure src="/images/style-transfer.gif" link="/images/style-transfer.gif" caption="Style transfer explained with a gif (click to enlarge)" >}}

Although I tried to make the gif self-explanatory, here are a few more details:

- "Filtered image" means the output of a truncated VGG16 network. This means that we run the image through VGG16
but we stop at some layer. Depending on the goal, we stop at different layers.
- Gram matrix: you'll find an explanation below The general idea is that if coefficient (n1, n2) is high, it means that filters n1 and n2 activate for the same pixels.
- In practice there is a bit more than 5 steps to optimize the random pixels

The paper is really easy to read, I really recommend [having a look](https://arxiv.org/abs/1508.06576)

## Bonus: how to calculate a Gram Matrix
(This explanation comes from [Alexander Jung's summary of the paper](https://github.com/aleju/papers/blob/master/neural-nets/A_Neural_Algorithm_for_Artistic_Style.md))

- Take the activations of a layer. That layer will contain some convolution filters (e.g. 128), each one having its own activations.
- Convert each filter's activations to a (1-dimensional) vector.
- Pick all pairs of filters. Calculate the scalar product of both filter's vectors.
- Add the scalar product result as an entry to a matrix of size #filters x #filters (e.g. 128x128).
- Repeat that for every pair to get the Gram Matrix.
- The Gram Matrix roughly represents the texture of the image.

## More ressources
- [Original paper](https://arxiv.org/abs/1508.06576)
- [Code in Keras](https://github.com/keras-team/keras/blob/master/examples/neural_style_transfer.py)

## Style transfer today
Since the original paper, style transfer improved a lot, both in speed and quality. Here's an example of what you can do with the latest paper:
<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Style transfer just reached a new wow moment ! Over the week-end I played with &quot;Deep Painterly Harmonization&quot;, Fujun Luan et al. Can you tell the difference with a real painting ? Code: <a href="https://t.co/luFdB5F3M3">https://t.co/luFdB5F3M3</a> Paper (very well written): <a href="https://t.co/gSGoqZ2WEM">https://t.co/gSGoqZ2WEM</a> <a href="https://t.co/maRJRXpffK">pic.twitter.com/maRJRXpffK</a></p>&mdash; Eliot Andres (@EliotAndres) <a href="https://twitter.com/EliotAndres/status/985817482358415361?ref_src=twsrc%5Etfw">16 avril 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>



