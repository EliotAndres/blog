+++
date = "2017-06-07T23:02:15+02:00"
description = ""
title = "Converting a Caffe model to Tensorflow"
summary = "In this tutorial, I'll show you how to convert the Places 365 model to Tensorflow"
draft = false


+++

## Converting a Caffe model to Tensorflow

The [Caffe Model Zoo](https://github.com/BVLC/caffe/wiki/Model-Zoo) is an extraordinary place where reasearcher share their models. Caffe is an awesome framework, but you might want to use Tensorflow instead. In this blog post, I'll show you how to convert the [Places 365 model](https://github.com/metalbubble/places365) to Tensorflow.

## Using Caffe-Tensorflow to convert your model
Your best bet is to use the awesome [caffe-tensorflow](https://github.com/ethereon/caffe-tensorflow). This project takes a `prototxt` file as an input and converts it to a python file so you can use the model with Tensorflow. I had to use [this pull request](https://github.com/ethereon/caffe-tensorflow/pull/76) to get a standalone model. I forked the repo with a [few](https://github.com/ethereon/caffe-tensorflow/pull/105/files#diff-e9719ee0bc9dcdda8d08a09378a691b1R17) [other](https://github.com/linkfluence/caffe-tensorflow/commit/4068ea31a1ff7dc91cd429e091e61b039448ce1b) tweaks as well.

### 1 - Install caffe-tensorflow
    git clone https://github.com/linkfluence/caffe-tensorflow
    source activate Python27 # You need Python 2.7
### 2 - (Optional) Switch to Tensorflow CPU
You might bump into memory issues if you don't have enough memory. In this case just uninstall `tensorflow-gpu` and install `tensorflow`

### 3 - Convert your model
    python convert.py --caffemodel ./places/vgg16_hybrid1365.caffemodel ./places/deploy_vgg16_hybrid1365.prototxt --data-output-path ./output.mat --code-output-path ./output2.py --standalone-output-path ./standalonehybrid.pb`

### 4 - (Optional) Re-install Tensorflow GPU

## Using the pb file
If the the previous command succeeded, you'll end up with a `./standalonehybrid.pb` file. This file contains the weights and the architecture of the network. Here's how to use it:

    import tensorflow as tf
    import cv2
    import numpy as np

    def load_graph(frozen_graph_filename):
        # We load the protobuf file from the disk and parse it to retrieve the
        # unserialized graph_def
        with tf.gfile.GFile(frozen_graph_filename, "rb") as f:
            graph_def = tf.GraphDef()
            graph_def.ParseFromString(f.read())

        # Then, we can use again a convenient built-in function to import a graph_def into the
        # current default Graph
        with tf.Graph().as_default() as graph:
            tf.import_graph_def(
                graph_def,
                input_map=None,
                return_elements=None,
                name="prefix",
                op_dict=None,
                producer_op_list=None
            )
        return graph

    graph = load_graph('./standalonehybrid.pb')

    x = graph.get_tensor_by_name('prefix/data:0')
    y = graph.get_tensor_by_name('prefix/prob:0')


    im = cv2.imread('./test_image.jpg')

    WIDTH, HEIGHT = 224, 224
    im = cv2.resize(im,  (WIDTH, HEIGHT))

    # Places was using batches of 10 images
    batch = np.array([im for i in range(10)])

    with tf.Session(graph=graph) as sess:
        y_out = sess.run(y, feed_dict={ x: batch })

*(the handy function comes from [this blog post](https://blog.metaflow.fr/tensorflow-how-to-freeze-a-model-and-serve-it-with-a-python-api-d4f3596b3adc))*

Note: You'll see that we're building a batch of 10 images... with only one image. This is because the network is set like this and I want to keep this article simple. It should be possible to change the batch size. We'll see this in an upcoming blog post

## Conclusion
We've seen how easy it is to use the models from the Caffe model zoo with Tensorflow. You are now able to classify cars, predict places, detect facial landmarks and so many magical things !

## Bonus: What if the model is based on a custom version of Caffe
It can happen that researchers need custom layers: they usually fork caffe. In this case, [this gist](https://gist.github.com/FranciscoCanas/844aab52fcff6b1c652a) describes the steps to extract the weights and [this piece of code](https://github.com/machrisaa/tensorflow-vgg/blob/master/vgg16.py#L20) should give you some hints on how to load them into your Tensorflow graph.

For complex layers, there are some small differences between Caffe and Tensorflow: you will have to look at the source code. For instance, LSTM gates are not concatenated in the same order in Tensorflow and in Caffe.

What worked best for me was to:

- Export Caffe's weights into an Numpy matrix
- Run a dummy example into the first N layers in Caffe, store the output
- Load the weights into your Tensorflow Graph, run the same example into the same first N layers but using Tensorflow this time
- Compare the output. If it's not matching, check what's wrong
- Increment N and repeat

I was able to get a 10<sup>-3</sup> mean difference in the final output when transfering a convnet and a 10<sup>-2</sup> mean difference after a bi-LSTM. Not too bad !


