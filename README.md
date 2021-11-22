# vex - the VTEX Extension platform (of platforms)

`vex` is an open-source `Commerce Platform As Code` tool built on top of `deno` and `git`. The `vex` toolset allows teams to **compose and deploy** a fully-functional `Commerce Platform` to VTEX within minutes instead of months. Start fast with a `Commerce Platform Template`, iterate by composing and configuring multiple `VTEX Apps`, deploy safely with `Progressive Releases`, discover the working strategies by experimenting with `Flags` and double-down by building what matters with our global serverless edge infrastructure.

# What is vex for?

`vex` allows VTEX account owners to:

1. *Compose* **apps** from the VTEX ecosystem into a commerce **platform**;
2. *Deploy* it to the VTEX **global edge** infrastructure;
3. *Evolve* it by managing apps' **configuration**, creating **flags** and publishing **releases** through a **single control panel**.

## What is a "platform"? 

A **Platform** is a combination of configured **apps** and declared **flags** which can be deployed to the VTEX infrastructure. Every platform receives a subdomain at `https://<platform>.vtex.land`. This points to the `main` branch of the repo at `https://github.com/vtex-platforms/<platform>`. A platform may be locally built and run in your computer. When deployed to VTEX, it leverages our global edge infrastructure that scales quickly to any amount of demand. 

Apps installed to a platform are represented as a list of TypeScript files at the root of the repository. These files are the default configuration for the current release. When running, apps in the platform can be configured on a web **admin**. Changes to configuration may be *committed* into a new platform **release**, which can become a **deploy preview** under a new URL, or can be deployed directly to production (being merged to master).

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

**Integrations** are a specific type of app, which use `vex` serverless functions to exchange tokens with external API's and subsequently remotely control their configuration and behavior or otherwise generate side-effects and observe their consequences. Integrations may offer limited control to  Flags or Releases, depending on the capacities of the external API. An external API might integrate `vex` itself as a remote configuration manager in order to fully leverage of flags and releases.

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


## WIP ... types


```
type BuildConfig {

}

type BuildResult {

}

onBuild((build: BuildConfig) : BuildResult {

})

type RunConfig {

}

onEvent((build: BuildConfig, run: EventRunConfig) {
    
})

onRoute((build: BuildConfig, run: RouteRunConfig) {
    
})
```
