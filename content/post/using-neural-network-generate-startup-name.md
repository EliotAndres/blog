+++
Description = ""
Tags = []
Categories = []
title = "Using a neural network to generate your next startup name"
summary = "I'll show you how to use a LSTM to generate startup names"
menu = "main"
draft = false
date = 2018-05-07T20:50:22+01:00
+++

Inspired by a [Dan Hon article](https://medium.com/@hondanhon/i-trained-a-neural-net-to-generate-british-placenames-9460e907e4e9) on how to generate British placenames, I decided to train my own network to generate startup names.

The [original code](https://github.com/karpathy/char-rnn) was made by Andej Karpathy, but there is a more modern and concise version in Keras, [available here](https://github.com/keras-team/keras/blob/master/examples/lstm_text_generation.py).

# The results
Here are a few of my favorites:

- Cuyation
- SaleBott
- Airr Energy
- Costapi
- Excel Worldeh
- Hight Biotherapeutics
- Joyai
- YouLab
- Rygo Inc.
- Lifester
- Mobilivy
- bitran
- OpenFactor

You can find a [longer list here](https://github.com/EliotAndres/char-rnn-tensorflow-js/blob/master/generated.txt).

**Note**: you can't prevent the neural net from generating startup names that already exist. So if you were planing on using any of those, do your own research first.
# How it works
I trained the neural network on 170k startup names. To generate a startup name, you start with 10 random characters as a seed, feed it to the network (a [LSTM](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)) and ask it to predict the next character.

You then append the predicted character to the seed, remove the first character (so its length is still 10) and repeat.

If we start with this seed: `Kdsdgasdgd`, for our last example it looks like this:

- model.predict('Kdsdgasdgd') -> returns O
- model.predict('dsdgasdgdO') -> returns p
- model.predict('sdgasdgdOp') -> returns e
- model.predict('dgasdgdOpe') -> returns n
- [...]
- model.predict('OpenFactor') -> returns '\n' (new line, meaning it's the end of the word)

In summary, we repeatedly call a recurrent neural network. Deepception [(see video)](https://www.youtube.com/watch?v=UXd0EDy7aTY)

# The code
If you want to dig deeper, the full code and dataset is available in a [notebook here](https://github.com/EliotAndres/char-rnn-tensorflow-js/blob/master/python/char-rnn-tensorflow-js.ipynb).





# Conclusion
A few months ago, I made a startup pitch generator using Markov chains. You can find the [demo here](http://ndres.me/markov-incubator/). The 2 projects pair well together :-)

