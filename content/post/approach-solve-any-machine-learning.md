+++
Description = ""
Tags = []
Categories = []
title = "My approach to solving (almost) any machine learning problem"
summary = "A technique to solve machine learning problems"
menu = "main"
draft = false
date = 2018-10-19T16:14:33+09:00
+++

In this article, I’ll detail the technique I use to solve almost any AI / machine learning project.
I can already hear you screaming behind your screen *« there is no magic approach to ML »*  and you’d be right!

 I would say that this technique applied to 90% of my projects. Without further ado, **here’s the approach**:

1. Find a machine learning competition with a problem close to the one you want to solve
2.  Find the winning team’s solution
3. Adapt this solution to your problem

Before detailing each step, I’d like to point out that the winning team solution is not used as is.
 Mostly because your problem will not be perfectly identical to the competition’s problem.

## 1 - Finding the a matching machine learning competition
To do so, I recommend using Google or [Kaggle Past Solutions](https://ndres.me/kaggle-past-solutions/). (**disclaimer**: I created Kaggle Past Solutions, precisely for this reason. It’s open-source and free)

How to find a matching competition ? Let’s use an example. I was recently working
on a project to predict the inventory in a warehouse. Since we want to predict future orders,
the keywords here are « time series » and « forecast ».
Looking up those keywords in Kaggle Past Solutions yields, among other results,
the [Corporación Favorita Grocery Sales Forecasting competition](https://www.kaggle.com/c/favorita-grocery-sales-forecasting)
("Can you accurately predict sales for a large grocery chain? »).

This competition seems similar enough. Indeed, an order from a warehouse must be
correlated to the sales, so with the same input we might be able to get good results.
 Now let’s move on to choosing a solution.

## 2 - Finding the winning team’s solution
This step should be rephrased into "finding a good winning solution". It mostly depends on:

- if the source code is available
- if a detailed explanation is available
- the complexity of the solution. Many Kaggle solutions use
[stacking](http://blog.kaggle.com/2016/12/27/a-kagglers-guide-to-model-stacking-in-practice/)
and [ensembling](https://en.wikipedia.org/wiki/Ensemble_learning), sometimes making
them very complex. Thankfully, solutions sometimes offer a « best single model ».

In our example, the [first place solution](https://www.kaggle.com/c/favorita-grocery-sales-forecasting/discussion/47582)
is of very good quality. It quotes sources, contains a good explanation and the linked code is concise and of good quality.

## 3 - Adapt this solution to your problem

The solution will be used as a baseline. You will know what technology to use
(convolutions, gradient boosting, LSTMs) and what part of the data to exploit.
While you will not get a working solution right away, you’ll at least now that
 you’re using the right tools and the right data.

Moreover, you can draw inspiration and learn from:

- the way the code is architectured
- the [feature engineering](https://en.wikipedia.org/wiki/Feature_engineering)
- the libraries used

In our example, the solution is using an ensemble of LSTMs and gradient boosting.
 Reading the code, I also learned about [pandas.read_csv](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.read_csv.html)'s
 `converters` argument.

## What's next
At this point you should have a very good baseline, built upon [the shoulders of kaggle masters](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants).
From this point, it's all about improving your model. And if you get good results, don't forget to thank the authors of the solution.

