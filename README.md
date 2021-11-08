`vex` is the next-generation VTEX extension platform and toolset. The `vex` CLI
helps VTEX users compose, deploy and evolve their Digital Commerce Application.

Using `vex`, you can **clone** a _VTEX Digital Commerce Application repository_
locally, edit the configuration for any of its services, create new experiments
changing specific configurations for specific audiences, and deploy it to
production with built-in progressive rollout. Unsuccessful configuration changes
are automatically rolled back with minimal blast radius. Successful changes are
applied and new experiments become available for control in `vex launchpad`, the
dashboard for experiment management and monitoring.

Configuration changes can affect external services too with the implementation
of an Integration service. `vex` native serverless functions dynamically receive
up-to-date configuration changes throughout a global edge platform so that
configuration changes take effect in seconds, not hours, allowing you to iterate
and learn faster than ever on production traffic.

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
as its outcomes; a CI pipeline might be a service which would have number of
builds and total build time as its outcomes.

Internal services run directly on `vex` serverless functions and might react to
(or emit) platform-controlled `events` or respond to internet-facing `routes`.
The point of the `vex` platform is being able to centrally configure multiple
services, and evolve their configuration according to the observed **Outcomes**.

Services are composed in terms of recursively configuring _other services_, of
which some will eventually be _core services_.

### Core services

`vex` comes with some built-in _core services_ which are fundamental building
blocks for using the platform.

- `vex-deploy` — deploys Deno scripts to a global edge network. This is the
  low-level building block in order to have side-effects, like running some code
  reacting to a platform event or an HTTP route in the public domain.
- `vex-challenge` — allows definition and extension of resources, policies, and
  all other access, authentication and authorization methods for a service
  (Analog to AWS IAM).
- `vex-experiment` — allows definition of Experiments, which may then be used
  across other configuration files to dynamically alter the behavior of running
  services by using the web Experiment admin.
- `vex-admin` — allows extension of the Admin web and CLI by implementing
  specific components for one or more configuration fields, or to completely
  override the admin UI as a first-class Next application. Usage of
  `vex-admin-styleguide` is strongly encouraged to accelerate development and
  leverage the high quality `vtex-admin-ui` component library.
- `vex-monitor` — allows definition of Outcomes with metrics and alarms for the
  running service.
- `vex-compose` — allows to expose this service as an App, which might be
  composed into a Digital Commerce Application.

## What is an "integration"?

**Integrations** are a specific type of service, which use `vex` serverless
functions to exchange tokens with external API's and subsequently remotely
control their configuration and behavior or otherwise generate side-effects and
observe their consequences. Integrations may offer limited ability to perform
Experiments or Releases, depending on the capacities of the external API.

## What is "configuration"?

**Configuration** is a _strongly typed_ set of data that alters the behaviour of
a given **service**. Services define their **configuration schema**. At runtime,
services receive the appropriate configuration for the current request.
Therefore, services are largely unaware of any running **Experiments**, which
**Release** they are part of, or even what account they are serving right now,
simply behaving according to the received configuration at each request.

## What is a "Digital Commerce Application"?

## What is an "account"?

## What is an "experiment"?

## What is a "release"?
