+++
Tags = []
Categories = []
description = "How to migrate your code to TensorFlow 2.0"
title = "Migrating to TensorFlow 2.0"
summary = "How to migrate your code to TensorFlow 2.0"
menu = "main"
draft = false
date = 2019-01-13T14:53:28-05:00
+++

TensorFlow 2.0 preview version has just been [announced](https://groups.google.com/a/tensorflow.org/forum/#!topic/developers/aKdmUOiyzGM). 
In this blog post, I’ll summarize what to expect for migrating your code to this new version.

## Official resources

- [2.0 first official announcement](https://groups.google.com/a/tensorflow.org/forum/?#!topic/announce/qXfsxr2sF-0)
- [Preview version announcement](https://groups.google.com/a/tensorflow.org/forum/#!topic/developers/aKdmUOiyzGM)
- [2.0 docs](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf)
- [2.0 design documents explaining the new APIs](https://github.com/tensorflow/community/tree/master/rfcs)
- [2.0 guides and tutorials](https://github.com/tensorflow/docs/tree/master/site/en/r2) (might be moved, [permalink)](https://github.com/tensorflow/docs/tree/ab40de5b068f135a6f1840ba2dd7465386f4edc8/site/en/r2)

## Migrating your code automatically
Here's the good news: TensorFlow 2.0 provides an **automatic migration tool**. After [installing the new version](https://www.tensorflow.org/versions/r2.0/api_docs/python/tf), you can run:

    tf_upgrade_v2 --intree ./project_directory --outtree ./project_directory_updated
    

So what is this tool doing ? It's mostly moving your code to `tf.compat.v1` and changing the name of the arguments if necessary. 
The script should update your code to make it work, but will not make it follow TensorFlow 2.0 best practices. 

Moreover, it does not work with `tf.contrib`. Indeed, this module has been removed from TensorFlow 2.0, 
with most of the APIs moved to TensorFlow core or external repositories. [See the details here](https://github.com/tensorflow/community/blob/master/rfcs/20180907-contrib-sunset.md)

## Migrating your code manually
While your code will work using `tf.compat.v1`, to follow TensorFlow 2.0 new philosophy you will have to update your code manually. 
Here are the biggest changes:

- as stated above, `tf.contrib` will disappear
- using eager execution is recommended ([see example notebook](https://github.com/tensorflow/docs/blob/master/site/en/r2/guide/eager.ipynb))
- the `tf.Session` API will disappear in favor of `tf.function` ([see example notebook](https://github.com/tensorflow/docs/blob/master/site/en/r2/guide/autograph.ipynb))
- `tf.layers` will disappear, model definition should be done using `tf.keras`

A **very good explanation** is available in the official TensorFlow 2.0 guides [here](https://github.com/tensorflow/community/blob/b1d83bf2ee3fc72650140b89656e29932db36226/rfcs/20180918-functions-not-sessions-20.md).

## Conclusion
Note that this is only a preview version: expect some bugs and inconsistencies. Nevertheless, 
it should give you a good vision on this substantial TensorFlow update. In upcoming blogposts, I'll detail each of the new 
changes in TensorFlow.

 
*I'm still unsure about the future of TensorFlow Estimators and TPUs. 
If you have any info about this, reach out to me [on Twitter](https://twitter.com/EliotAndres).* 


    
    
