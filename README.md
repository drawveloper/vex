`vex` is the next-generation VTEX extension platform and toolset.

# What is vex for?

`vex` allows VTEX account owners to:

1. Compose multiple **services** from the VTEX ecosystem into one Digital
   Commerce Application;
2. Control the **configuration** for these services through a centralized web or
   CLI Admin; and
3. Evolve the configuration for these services with confidence by creating
   **Experiments** and **Releases**.

## What is a "service"?

A **Service** is any type of _deployable_ and _configurable_ code which delivers
some value to an **Account** by producing some type of **Outcome.** For example,
a web storefront might be a service which would have Revenue and Conversion Rate
as its outcomes.

Internal services run directly on `vex` serverless functions and might react to
(or emit) platform-controlled `events` or respond to internet-facing `routes`.
The point of the `vex` platform is being able to centrally configure multiple
services, and evolve their configuration according to the observed **Outcomes**.

## What is an "integration"?

**Integrations** are a specific type of service, which use `vex` serverless
functions to exchange tokens with external API's and remotely control their
configuration and behaviour. Integrations may offer limited ability to perform
Experiments or Releases, depending on the capacities of the external API.

## What is "configuration"?

**Configuration** is a _strongly typed_ set of data that alters the behaviour of
a given **service**. Services define their **configuration schema**. At runtime,
services receive the appropriate configuration for the current request.
Therefore, services are largely unaware of any running **Experiments**, which
**Release** they are part of, or even what account they are serving right now,
simply behaving according to the received configuration at each request.

## What is an "account"?

## What is an "experiment"?

## What is a "release"?
