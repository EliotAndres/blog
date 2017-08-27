+++
date = "2017-05-07T16:25:35+02:00"
draft = false
title = "Turn any Jupyter notebook into a REST API"
summary = "In this tutorial, I'll show you how to create a small api for your Jupyter Notebook"
+++

Jupyter Notebooks are pretty awesome. They allow you to prototype and experiment with ease. But did you know that you can also use them as a backend ?

In this tutorial, I'll show you how to make a simple api that converts radians to degrees. We should end up with something like this:


    $ curl "http://serverIp:8888/convert?angle=180"
    #{"convertedAngle": 3.141592653589793}

# Installation
Assuming that jupyter notebook is already installed, first install the kernel_gateway:

    pip install jupyter_kernel_gateway
    jupyter kernelgateway --generate-config

If you want your api to be accessible from other computers, edit the `~/.jupyter/jupyter_kernel_gateway_config.py` file. Replace

    # c.KernelGatewayApp.ip = '127.0.0.1'

with

    c.KernelGatewayApp.ip = '*'

# Creating the API
Create a notebook with 2 cells. The first one:

    import math
    import json

This cell will only be run once, when the notebook is loaded. You can perform any initialization you want here.

And the second one:

    # GET /convert
    req = json.loads(REQUEST)
    args = req['args']

    if 'angle' not in args:
      print(json.dumps({'convertedAngle': None}))
    else:
      # Note the [0] when retrieving the argument.
      # This is because you could potentially pass multiple angles.
      angle = int(args['angle'][0])
      converted = math.radians(angle)
      print(json.dumps({'convertedAngle': converted}))

The first line is to indicate to the kernel gateway that we want to listen to the `/convert` route. This cell will be run on each call.

Finally, run your notebook:

    $ jupyter kernelgateway --KernelGatewayApp.api='kernel_gateway.notebook_http' --KernelGatewayApp.seed_uri='/home/username/Notebook.ipynb'
    #[KernelGatewayApp] Kernel started: 72515fd8-6314-4d65-9f48-8214756850d7
    #[KernelGatewayApp] Registering resource: /convert, methods: (['GET'])
    #[KernelGatewayApp] Registering resource: /_api/spec/swagger.json, methods: (GET)
    #[KernelGatewayApp] Jupyter Kernel Gateway at http://*:8888

And there you go, you have your api ! This can of course be used to serve predictions from a deep learning model.
