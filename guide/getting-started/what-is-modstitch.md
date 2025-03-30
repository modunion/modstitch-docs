# What is Modstitch?

Modstitch is a gradle plugin to unify official tooling for both Fabric and (Neo)Forge using [Stonecutter](https://stonecutter.kikugie.dev/)

It's an abstraction over both [Fabric Loom](https://github.com/FabricMC/loom) and [ModDevGradle](https://github.com/neoforged/ModDevGradle) to provide an incredibly easy to modify build script.

## Why not just use Architectury Loom?

Modstitch was made as an alternative to Architectury Loom after an intense burn out of dealing with issue after issue when using the plugin.

To put it simply, here is a non-exhaustive list of issues that eventually led to the creation of Modstitch:

- Refmaps had to be manually generated if you were using Yarn or any non-mojmap mapping format, especially when using the latest features provided by MixinExtras.
- Access Wideners were not fully converted into Access Transformers for legacy forge, leading to widespread issues that were only present in production.
- Issues with Architectury API not remapping its mixins properly when using Yarn.
- Inconsistent handling of resources between Fabric and Forge, sometimes requiring duplicate asset definitions or complex conditional logic in the buildscript.
- Difficulties in setting up development environments with specific Forge versions or mod loaders due to inflexible tooling or outdated dependencies.
- Issues with shadow JARing or shading dependencies, particularly when targeting both platforms with conflicting library versions.

*Arch Loom is a seriously impressive idea, and the devs deserve praise. Sadly, it's just not a fun platform use anymore due to the current issues.*

## How does Modstitch work?

Modstitch is currently split into various modules.

- **`base`**: Handles the core functionality, abstracting/wrapping ModDevGradle and Fabric Loom dependency configurations and other functionalities according to the current mod loader.
- **`publishing`**: A wrapper for [modmuss50's Mod Publish Plugin](https://modmuss50.github.io/mod-publish-plugin/) that supports automatically filling out information based on the current mod loader and other information.
- **`shadow` (experimental)**: An experimental module that allows you to shadow non-mod dependencies into your compiled mod jar files.

The base module in Modstitch serves to simplify and streamline the process of configuring and managing dependencies for different mod loaders like ModDevGradle and Fabric Loom. It achieves this by applying necessary plugins, setting up repositories, and configuring Java settings automatically based on the mod loader being used.

The module also handles tasks related to processing resources and managing mod metadata, ensuring that all necessary configurations and dependencies are correctly set up. This abstraction reduces boilerplate code and potential errors, making the development process more efficient and user-friendly.

## Examples

You can either follow from the Getting Started page to create a blank project, or take a look at some real-world examples of Modstitch being used:

- [Controlify](https://github.com/isXander/Controlify)
- [Sounds](https://github.com/IMB11/Sounds)
- [ModstitchStonecutterTemplate](https://github.com/modstitch/modstitch-stonecutter-template)
