+++
Tags = []
Categories = []
description = "Guide on how to use the new @tf.function decorator"
title = "TensorFlow 2.0: @tf.function explained with examples"
summary = "Guide on how to use the new @tf.function decorator"
menu = "main"
draft = false
date = 2019-01-14T09:30:49-05:00
+++

In TensorFlow 2.0, the use of the graph has been deprecated in favor of the decorator `@tf.function`. 
In Python, a decorator can be added on just before a function declaration to change its behavior:


    def relu(x):
      return x if x > 0 else 0
      
    relu(-1)
    

With the decorator

    @tf.function
    def relu_decorated(x):
        return x if x > 0 else 0
    
    relu_decorated(-1)

  
So what is the `tf.function` doing ? It's turning our Python code into TensorFlow code using a module named 
autograph. We can actually have a look at what's happening behind the scene by running:


