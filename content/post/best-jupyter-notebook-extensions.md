+++
Description = ""
date = "2018-03-06T11:48:17+01:00"
menu = "main"
title = "Top 5 Best Jupyter Notebook Extensions"
draft = false
summary = "The best extensions to be more productive with notebooks"

+++

Notebook extensions are plug-ins that you can easily add to your Jupyter notebooks.
The best way to install them is to use [Jupyter NbExtensions Configurator](https://github.com/Jupyter-contrib/jupyter_nbextensions_configurator).
 It will add a tab to let you enable/disable extensions:

{{< figure src="/images/jupyter-nbextensions.png" caption="Screenshot of NbExtensions Configurator" >}}

## Installation
Installation with conda:

    conda install -c conda-forge jupyter_contrib_nbextensions
	conda install -c conda-forge jupyter_nbextensions_configurator

Or with pip:

	pip install jupyter_nbextensions_configurator jupyter_contrib_nbextensions
	jupyter contrib nbextension install --user
	jupyter nbextensions_configurator enable --user

Find more info about installation [here](https://github.com/Jupyter-contrib/jupyter_nbextensions_configurator#installation)

## 1 - Collapsible headings
Very useful when dealing with large notebooks, collapsible headings allow you to collapse some parts of the notebooks.
{{< figure src="/images/collapsible-headings.gif" caption="Using collapsible headings" >}}

## 2 - Notify
For long running task, the notify extension sends a notification when the notebook becomes idle.
{{< figure src="/images/jupyter-notification.gif" caption="Using notify" >}}

*To use it, enable the extension and then enable it in the button bar.
The number you select is the minimum time the notebook has to run for you to get a notification (Note that you have to keep the notebook open in the browser for the notification to work)*

## 3 - Code folding
{{< figure src="/images/jupyter-code-folding.gif" caption="Using code folding" >}}

## 4 - tqdm_notebook
This one is not really an notebook extension. TQDM is a progress bar library. But it sometimes fails to work properly on Jupyter Notebooks. Thanks to [Randy Olson](https://twitter.com/randal_olson) for the tip:
<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">TIL: tqdm (the <a href="https://twitter.com/hashtag/Python?src=hash&amp;ref_src=twsrc%5Etfw">#Python</a> progress bar library) has a specialized &quot;tqdm_notebook&quot; function for use in Jupyter Notebooks.<br><br>No more messed up progress bars in my notebooks - hooray!<a href="https://t.co/r0jAQXQ6TM">https://t.co/r0jAQXQ6TM</a> <a href="https://t.co/FyYBRm2qE1">pic.twitter.com/FyYBRm2qE1</a></p>&mdash; Randy Olson (@randal_olson) <a href="https://twitter.com/randal_olson/status/969657169342734336?ref_src=twsrc%5Etfw">2 mars 2018</a></blockquote>

## 5 - %debug
Not a notebook extension but an [IPython magic](http://ipython.readthedocs.io/en/stable/interactive/magics.html) command. For a great explanation, I suggest reading the [full twitter thread](https://twitter.com/radekosmulski/status/945739571735748609) from [Radek Osmulski](https://twitter.com/radekosmulski) 
<blockquote class="twitter-tweet" data-lang="fr"><p lang="en" dir="ltr">Favorite recent jupyter notebook discovery - the %debug magic:<br><br>1. Get an exception.<br>2. Insert a new cell, type %debug and run it.<br><br>An interactive debugger will open bringing you to where the exception occurred and allowing you to look around! <a href="https://t.co/9DSnSbpu15">pic.twitter.com/9DSnSbpu15</a></p>&mdash; Radek (@radekosmulski) <a href="https://twitter.com/radekosmulski/status/945739571735748609?ref_src=twsrc%5Etfw">26 décembre 2017</a></blockquote>

## 6 - Smaller extensions and other tips
- **%lsmagic**: Run this in a cell to list all available IPython magics
- **Zen mode extension**: removes the menus for less distractions
- **Execute time extension**: shows how long a cell took to run
- **autoreload**: Autoreloads external files without having to restart the notebook. To enable it:

        %load_ext autoreload
        %autoreload 2

You know a must-have notebook extension ? Hit me on twitter or make a pull request on this blog post !
---

### Edit on Wed, Mar 7, 2018:
Some people [on Reddit](https://www.reddit.com/r/MachineLearning/comments/82fcw0/d_top_5_best_jupyter_notebook_extensions/) suggested a few more:

- **[Variable inspector](http://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/varInspector/README.html)**: displays all variables in a floating window
- **CodeMirror Keymap**: lets you choose between key bindings, such as vim
- **Scratchpad**: executes code against the current kernel without modifying the notebook document
- **Splitcells**: splits cells vertically



<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
