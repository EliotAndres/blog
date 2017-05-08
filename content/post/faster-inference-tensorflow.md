+++
date = "2017-05-08T14:52:12+02:00"
description = ""
title = "Faster inference in Tensorflow using XLA."
draft = false

+++

# About inference
Using neural networks is primarily made of 2 phases: training your model and using it. The later part can also be called inference, forward pass or evaluation.

For most researchers, most of the time is used by training : they have to retrain using different architectures or different parameters. However, if you are using deep learning in production, inference is the most critical step.

For companies like Facebook, inference means applying deep learning to hundreds of millions of images each day [link]. If you evaluate the cost in GPU-hours*, doubling the inference speed means halving your costs. For companies making self-driving cars, inference means expecting the result of the evaluation as fast as possible. In this case, halving the response time could save lives.

**The tensorflow authors recommend using CPU’s for inference*

# What is XLA
During the tensorflow summit 2017, the Tensorflow team introduced [XLA](https://www.tensorflow.org/performance/xla/) (Accelerated Linear Algebra). It is an experimental framework aiming at optimizing Tensorflow graphs.
 It should be able to improve memory usage, model footprint, portability and more importantly, execution speed. Using XLA can lead to improvement of up to 80% !

If you want to learn more about XLA, you should watch the summit's presentation [here](https://www.youtube.com/watch?v=kAOanJczHA0).

# Using XLA
In this tutorial, I’ll show you how to use XLA. Important: At the time of writing, you have to compile with a special flag in order to Tensorflow in order benefit from XLA. Building Tensorflow is fairly straightforward and takes about one hour on a regular machine. [link]

Once built, enabling XLA for your graph is very simple:
    
    config = tf.ConfigProto()
    
    config.graph_options.optimizer_options.global_jit_level = tf.OptimizerOptions.ON_1

    sess = tf.Session(config=config)
*(Once again, if Tensorflow was not built with XLA, this flag will be useless)*


# What are the performance gains ?

    With:    1.56 
    Without: 2.44 

# Conclusion
For production workloads, inference speed matters the most. Google is even designing custom chips, TPUs, to improve evaluation performance (for them what matters is [Wh/operation (check unit and link)]. A simple flag can improve performance by 30%, leading me to believe that there might be free lunches after all…



