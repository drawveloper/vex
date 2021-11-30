# vex - the VTEX Extension platform

`vex` is an open-source software development framework for defining a commerce platform in code and provisioning it on managed multi-cloud infrastructure. `vex` enables you to:

- Manage and configure all your sales channels, from web storefronts, mobile apps, live commerce and conversational commerce to in-store solutions;
- Instantly connect to a deep network of suppliers and sellers, accessing millions of products and services with a few lines of code;
- Curate your offers, managing products, prices and promotions in multiple channels, at scale;
- Configure and provision fulfillment nodes, transportation partners and your entire logistics operation through code;
- Create apps that are highly reliable, scalable and cost-effective in the cloud without worrying about the underlying infrastructure.

The `vex` toolset allows teams to **compose and deploy** a **complete, end-to-end** `Enterprise Commerce Platform` to the VTEX edge cloud within minutes instead of months. End-to-end means `vex` orchestrates not only the frontend, digital experiences layer, but also all backend services and infrastructure required to operate a modern, unified commerce platform scalably and reliably.

# What is vex for?

`vex` allows VTEX users to:

1. *Compose* **apps** from the VTEX ecosystem into your private cloud commerce **platform** and get a _first version to production_ quickly;
2. *Evolve* your platform by managing your apps, publishing **releases** and creating **flags** to test new **configurations** for specific **audiences** through a **single control panel**.
3. *Build* new apps that run on the serverless VTEX **global edge** infrastructure at **low cost** and create new capabilites for any `vex` platform, share or sell them in the `commerce exchange`;

*Compose, Evolve, Build*

With `vex`, you start fast by choosing a `platform template`, which is a collection of pre-configured apps specifically designed for an industry and region, e.g. `fashion-europe`, `b2c-brazil`, `marketplace-latam`, and customizing it to **compose** the platform that fits your business needs. 

The `vex admin` is the **single control panel** where you can **monitor** your platform performance and **control** how apps behave by managing their **configuration**. Then, you can deploy changes safely with `Progressive Releases` and create new `Flags`. Every deploy is a separate **release**, so you can always see the _exact list of changes_ that occurred and **rollback quickly**, if needed. 

`Flags` let you experiment with choosing some specific configuration for specific **audiences**. Observe the outcomes to decide whether to make those changes available for your entire audience. Or, you can simply group some changes under a flag and schedule it for a specific time (like `black-friday-2021`). After you're done, simply archive the flag. 

For developers, `Apps` let you **build what matters** leveraging our global serverless edge infrastructure. That means apps scale to demand automatically and are served close to your users, guaranteeing faster responses. You can focus on writing `deno` functions that react to platform events (like new order), or to platform public routes (exposing APIs in your domain). 

## What is a "platform"? 

A **Platform** is a combination of configured **apps** which can be deployed to the VTEX infrastructure. It is represented as a list of TypeScript files in a git repository. Each `.ts` file represents an **installed app** in this platform, and contain this app's configuration. 

These files are the default configuration for the current release. When running, apps in the platform can be configured on a web **admin**. Changes to configuration may be *committed* into a new platform **release**, which can become a **deploy preview** under a new URL, or can be deployed directly to production (being merged to main). **Flags** are declared _as part of_ a release, like the configuration of any other app. First, you release a new flag, then you activate it and add an audience.

Every platform receives a subdomain at `https://<platform>.vtex.land`. This points to the `main` branch of the repo at `https://github.com/vtex-platforms/<platform>`. A platform may be locally built and run in your computer. When deployed to VTEX, it leverages our global edge infrastructure that scales quickly to any amount of demand. 

## What is a "release" and a "flag"?

A **Release** is a snapshot of a platform desired configuration. When deployed, it receives traffic progressively while checking for errors or worsening outcomes from installed apps. If degradation is detected, traffic is reverted to a previous release. 

Flags are used to dynamically change apps configurations without requiring a platform deploy. They allow you test new configuration to a subset of your **audience** before releasing to the broad public. You may even gate some functionality for some specific region or browser type. A release may contain definitions for new **flags**, which may then be managed in the admin for that release.

## What is an "app"?

An **App** is any type of _deployable_ and _configurable_ code which delivers some value to a **Platform**, and which produces some type of **Outcome.** For example, a web storefront might be an app which would have a `FastStore repository` as its configuration, and `Revenue` and `Conversion Rate` as its outcomes.

## What is "configuration"?

**Configuration** is a _strongly typed_ set of data that alters the behaviour of a given **app**. Apps define their **configuration spec**. At runtime, apps receive the appropriate configuration for the current request, considering the audiences triggered and the flags currently active in this platform. This allow users to try out multiple combinations of behaviour, quickly, with production traffic, by managing flags and their audiences.

## What do apps do?

Apps run on our global serverless function infrastructure and might react to (or emit) platform-controlled `events`, respond to requests on internet-facing `routes`, or run at scheduled times. By declaring a spec for **configuration**, apps allow platform users to change their behaviour dynamically. 

Users buy and install apps which create the right level of abstraction for them to solve a business challenge, packaging expertise in software. For them, `vex` allows easily composing multiple apps and evolving their configuration according to the observed **Outcomes**.

## What is an "integration"?

**Integrations** are a specific type of app, which use `vex` serverless functions to exchange tokens with external API's and subsequently remotely control their configuration and behavior or otherwise generate side-effects and observe their consequences. 

Integrations may offer limited control to  Flags or Releases, depending on the capacities of the external API. An external API might integrate `vex` itself as a remote configuration manager in order to fully leverage of flags and releases. At the very least, integrations can always produce side-effects by calling APIs and responding to external hooks by defining public endpoints.


## Examples

Some examples of repositories implementing apps and platforms:

- [vtex-apps/std](https://github.com/vtex-apps/std) - the standard library for vex, implementing all core services.
- [vtex-apps/webops](https://github.com/vtex-apps/webops) - the VTEX end-to-end frontend platform.
- [vtex-platforms/fashioneurope](https://github.com/vtex-platforms/fashioneurope) - an example platform with a storefront.

# Using vex as a developer

For developers, `vex` allows **apps** to declare the **configuration** they accept both at **build-time** and at **run-time**, as well as the **infrastructure** they require to run. Apps may also declare the **resources** they own and manage, as well as the **policies** they require to access other apps' resources.

An **app** is declared as a collection of **configurations for other apps** or for **core services**, represented as a list of TypeScript files at the root of the repository. A **platform** is simply a higher-order app: the top level collection of configurations that you deploy. This allows complex platform setups to be expressed as type-safe code and verified by a continuous integration and deployment pipeline, just like the building blocks that compose them. 

`vex` is a tool to deal with such `configuration repositories`. It allows you to `create` a new app or platform choosing from an array of starters, and to `install` new dependencies (which creates a default configuration file for that app). Finally, one may `build` the current configuration and then `serve` the admin, 

In production, `vex` functions dynamically receive up-to-date configuration changes throughout a global edge platform so that configuration changes take effect in seconds, not hours.

Let's see which core services you can leverage to create your first app.

## Core services

### Platform Service
`platform.ts`

Allows you to declare a platform composed by the set of apps declared in the same directory.

```
import { Platform } from "https://vtex.land/std/platform.ts"

export default new Platform({
    account: 'fashioneurope'
})
``` 

### App Service
`app.ts`

Allows you to declare this directory as an app, which may be installed to platforms and receive configuration at build time and run time.
```
import { App } from "https://vtex.land/std/app.ts"

export default new App({
    account: 'fashioneurope'
})
```

- `vex-deploy` — deploys Deno scripts to a global edge network. This is the low-level building block in order to have side-effects, like running some code reacting to a platform event or an HTTP route in the public domain.
- `vex-auth` — allows definition and extension of resources, policies, and all other access, authentication and authorization methods for a service (Analog to AWS IAM).
- `vex-flag` — allows definition of Experiments, which may then be used across other configuration files to dynamically alter the behavior of running services by using the web Experiment admin.
- `vex-admin` — allows extension of the Admin web and CLI by implementing specific components for one or more configuration fields, or to completely override the admin UI as a first-class Next application. 
- `vex-monitor` — allows definition of Outcomes with metrics and alarms for the running service.
