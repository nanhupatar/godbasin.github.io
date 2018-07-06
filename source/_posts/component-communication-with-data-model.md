---
title: 数据抽离与数据管理
date: 2018-06-17 20:03:19
categories: 思想棉花糖
tags: 分享
---
托目前主流框架的福，我们能从事件驱动脱离，来到了数据驱动的世界，可以参考以前的[《前端思维转变--从事件驱动到数据驱动》](https://godbasin.github.io/2017/09/29/data-driven-or-event-driven/)。在常常与数据打交道后，我们对组件的封装、配置化的思想一步步地深入和拓展之后，对于数据和状态的管理，也慢慢地出现了一些思考。
<!--more-->

# 应用数据抽离
---
在把数据与逻辑分离到极致的时候，你再看一个应用，会看到一具静态的逻辑躯壳，以及数据如灵魂般地注入到应用里，使其获得生命。

数据的抽离，其实与配置化的思想有想通的地方，即把可变部分分离，然后通过注入的方式，来实现具体的功能和展示。

## 状态数据
在一个应用的设计里，我们可能会拥有多个模块，每个模块又各自维护着自己的某些状态，同时部分状态相互影响着，最终呈现出应用的整体状态。

这些状态，都可以通过数据的方式来表示，我们简单称之为状态数据。

怎么定义状态数据？最浅显的办法就是这些数据，可以直接影响模块的状态，如对话框的出现、隐藏，标签的激活、失活，长流程的当前步骤等，都可以作为状态数据。用在 Vue 里面，可能常见如 `v-show`、`v-if`、以及其他状态判断逻辑。

我们的应用，大多数都是呈现树状结构，一层层地往下分解，直到无法分割的某个简单功能。同时，我们的组件也会呈现出来这样树状的方式，状态是跟随着组件维护，某个功能状态属于组件自己，最外层的状态则属于整个应用，当然这个应用也是组件的一种表示方式。

因此，我们的状态数据，也呈现一种树状的方式，与我们的组件相对应。就像 CSS 与 DOM 节点。

## 动态数据
我们还有很多的数据，如内容、个人信息等，都是需要我们从数据库拉取回来的。这种需要动态获取然后展示或是影响配置的一些数据，我们称之为动态数据。

动态数据不同于状态数据，并不会跟随着应用的生命周期而改变，也不会随着应用的关闭而消失。它们独立存在于外界，通过注入的方式进入应用，并影响具体的展示和功能逻辑。

和状态数据不一样，动态数据并不一定呈现为树状的形式。它可以是并行的，可以是联动关系，但是随着注入的地方不一样，最终在应用中形成的结构也会不一致。我们可以简单理解为每个动态数据都是平等的。

## 将数据与应用抽离
要怎么理解将数据与应用抽离呢？形象点形容，就像是我们一个公司，所有的桌子椅子装修和电脑都是静态的，它们相当于一个个的组件，同时每个办公室也可以是一个大点的组件或是模块。

那么在我们这个公司里：
- 状态数据：椅子的位置、消耗的电量、办公室的照明和空调状态等
- 动态数据：员工等各种人员流动

当然，公司里没有人员流动的时候，似乎就是个空壳。每天上班的时候，一个个的程序员就涌入公司，给公司注入灵魂，公司得以运作。

要说将数据和应用抽离，作用到这里大概是这个样子？

``` cmd
--------------------------------------------------------
                         公司
---------------------------  ---------------------------
|                         |  |  人           人        |
|                         |  |       人          人    |
|         办公楼          |  |           人            |
|                         |  |    人     人     人  人 |
|                         |  |      人      人   人    |
---------------------------  ---------------------------
```

在公司正常运作的时候，则是这样的：

``` cmd
--------------------------------------------------------
                         公司
--------------------------------------------------------
|   人     人             人   人       人     人 人    |
|           人            人   人     人          人    |
|        人    人    办公楼   人   人          人       |
|     人    人                人  人     人     人  人  |
|     人     人         人      人     人      人   人  |
--------------------------------------------------------
```

当然，人不只是站在办公楼里面这么简单，更多的，人会与各种物件进行交互和交流，人与人之间也会相互影响。但是这样简单的管理，很容易造成公司的混乱，所以我们会把人员有规律有组织地分别注入到每个办公室、隔间里面。

这就是我们要做的，不只是如何划分数据、将数据与应用抽离，我们还需要将其有规律地管理。所以，这大概是我们接下来的要讲的内容。

# 应用数据管理
---
我们知道哪些数据需要抽离、如何将数据抽离出来，同时，我们还需要知道，这些数据在抽离出来之后，该怎么去进行管理。

## 数据的流动
数据在注入到我们的应用中后，并不只是简单地存在。它可能会影响应用的状态、同时也会影响其他同样注入的数据。

数据与数据之间的交互，其实在某方面相等于我们组件之间的通信，包括但不限于以下的一些方式：
- 事件通知
- 共享对象
- 单方向流动

### 事件通知
事件的监听和触发机制，在许多的场景下都能适用，如浏览器点击、输入框的输入操作，则是典型的事件机制。而在很多时候，我们也可以通过事件通知的方式，来进行数据间的交互，如 Websocket 机制。

事件通知机制很方便，可以随意地定义触发的时机，也可以任意地点使用监听或是触发。

但事件机制的弊端也是很明显，就是每一个事件的触发对应一个监听，关系是一一对应。在整个应用中看，则是散落在各处，随意乱窜的数据流动。需要定位的时候，只能通过全局搜索的方式来跟踪数据的去向。

![image](http://o905ne85q.bkt.clouddn.com/1524236289%281%29.jpg)

当然，也有些人会定义一个中转站，所有的事件数据流都会经过那，这样的维护方式会有所改善。

![imgae](http://o905ne85q.bkt.clouddn.com/1524236465%281%29.jpg)

类似这种，额，可能会好一些？

### 共享对象
共享对象是很简答的一种方式，当我们需要多个地方使用相同的数据，我们就把它们放置在一个地方，大家都去那理获取和更新。

![image](http://o905ne85q.bkt.clouddn.com/1524236687%281%29.jpg)
(额请叫我灵魂画家)

通过注入对象的引用，来在不同组件中获取相同的数据源。当然这样的使用方式，需要考虑锁的问题（当然单线程的 JS 里面这样的情况比较少）。

同时，很多时候我们在定义一个对象，有时候想要某些地方共享，有时候又想要获取一个全新独立的对象。这种情况下，我们需要考虑怎样去维护一套这种数据与实例。

### 单方向流动
给数据的流动一个方向，则可以方便地跟踪数据的来源和去处。通过流的方式管理状态，常见的状态管理工具 Vuex、Redux 等，都是这样的方式去管理。

![image](http://o905ne85q.bkt.clouddn.com/1524237398.jpg)

当然，赋予数据流方向，但是数据的存放呢，可以通过共享对象的方式，也可以维护一个数据中心，所有的数据变更方式、触发逻辑、影响范围，都在数据中心里面管理和维护。

### 树状作用域
很多时候，我们的应用通过一层层地封装和隔离，最终会呈现为树状。

我们可以根据组件的树状作用域，结合共享对象的管理，来注入树状的数据结构。典型如 Angular 里，则是通过提供通用的依赖注入方式，配合树状的模块管理，可通过局部注入实例来获取共享或是隔离的数据。

![image](http://o905ne85q.bkt.clouddn.com/1524238569%281%29.jpg)

## 适度的管理
与组件的封装和配置化相似，数据的抽象、抽离，也是需要适度的。

当我们的应用很小，只有简单的功能的时候，我们甚至不需要对这些状态、数据什么的进行特殊的管理，甚至一个简单的变量就可以搞定了。随着应用组件数量变多，我们开始有了组件的作用域，当组件需要通信，我们可以通过简单的事件机制、或是共享对象的方式来进行交互。

当我们的项目越做越大，要在上百的状态、上万的数据里要按照想要的方式去展示我们的应用，这时候一个状态管理工具则可以轻松解决乱糟糟的数据流问题。

# 结束语
---
对数据的抽离和管理，也越来越成为我们在项目架构中需要考虑的部分。应用状态数据的管理，其实里面会有很多的设计模式。或许这块过于抽象，这篇文章也未能表达出最好的想法。但是对于设计模式，我们可以先了解下，在实战的时候，你会不自觉地想起来，啊原来这就是哪个设计模式的使用场景呀~