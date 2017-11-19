+++
date = "2017-05-08T14:52:12+02:00"
description = ""
title = "Faster inference in Tensorflow using XLA."
summary = "In this blog post, we'll investigate how to make Tensorflow faster with XLA"
draft = false

+++

# About inference
Using neural networks is primarily made of 2 phases: training your model and using it. The later part can also be called inference, forward pass or evaluation.

For most researchers, most of the time is used by training : they have to retrain using different architectures or different parameters. However, if you are using deep learning in production, inference is the most critical step.

# What is XLA
During the tensorflow summit 2017, the Tensorflow team introduced [XLA](https://www.tensorflow.org/performance/xla/) (Accelerated Linear Algebra). It is an experimental framework aiming at optimizing Tensorflow graphs.
 It should be able to improve memory usage, model footprint, portability and more importantly, execution speed. Using XLA can lead to improvement of up to 80% !

If you want to learn more about XLA, you should watch the summit's presentation
 [here](https://www.youtube.com/watch?v=kAOanJczHA0) or read about it [here](https://www.tensorflow.org/performance/xla/).
 
Basically, XLA is about optimizing your graph. One example might be that instead
of doing:

    a = b * c + g
    d = b * c * e

It would be better to do:

    tmp = b * c
    a = tmp + g
    d = tmp * e
   
This is one optimisation example but XLA comes with many others 

# Using XLA
In this tutorial, I’ll show you how to use XLA.
 
**Important**: At the time of writing, you have to compile Tensorflow with a special flag in order benefit from XLA. [Building Tensorflow](https://www.tensorflow.org/install/install_sources) is fairly straightforward and takes about one hour on a regular machine.

Once built, enabling XLA for your graph is very simple:
   
    config = tf.ConfigProto()
   
    config.graph_options.optimizer_options.global_jit_level = tf.OptimizerOptions.ON_1

    sess = tf.Session(config=config)

# What are the performance gains ?

I ran a small benchmark to test-out XLA's performance on a small RNN. I got a 
~30% gain in speed on GPU! The code is available [here](https://gist.github.com/EliotAndres/5497b763932f03dc46d3089e3b64c341). 

# Conclusion
I should underline that your mileage may vary, XLA is not a magic perfomance flag.
But the Tensorflow team is constantly working on it so it is worth trying.

