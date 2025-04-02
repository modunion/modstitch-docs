# Setting Up a Modstitch Project

> [!NOTE]
> Templates for the [Minecraft Development](https://mcdev.io/) are currently being worked on! Come back here at a later date for more information.

## Prerequisites

- A good understanding of development for NeoForge and Fabric, Modstitch is **NOT** for beginner developers.
- A brief understanding of [Stonecutter's Commenting Syntax](https://stonecutter.kikugie.dev/stonecutter/guide/comments) which is used to provide a single source set for all loaders and game versions that your project will target.

## Important Things To Note

When developing, **always use the `resetActiveProject` task with stonecutter before committing to your source control system.** It's always best practice to also run `chiseledBuild` whenever you're about to commit to make sure the changes you've made work across all your targets.

## 1. Clone The Template Project.

You can find the [template project on GitHub.](https://github.com/modunion/modstitch-stonecutter-template) 
```shell
git clone https://github.com/modunion/modstitch-stonecutter-template
```

**It's highly important that you do not import the project before you finish filling out the various metadata and modifying the game and loader targets!**

## 2. Fill Out The Metadata In `build.gradle.kts`

```kts
// the metadata files found in the templates folder.
metadata {
    modId = "examplemod" // [!code focus:5]
    modName = "Example Mod"
    modVersion = "1.0.0"
    modGroup = "com.example"
    modAuthor = "John Doe, Patrina Doe, Jill Doe"

    fun <K, V> MapProperty<K, V>.populate(block: MapProperty<K, V>.() -> Unit) {
```

```kts
replacementProperties.populate {
    // You can put any other replacement properties/metadata here that
    // modstitch doesn't initially support. Some examples below.
    put("mod_issue_tracker", "https://github.com/modunion/modstitch/issues") // [!code focus]
    put("pack_format", when (property("deps.minecraft")) {
        "1.20.1" -> 15
```

Do not forget to change the `rootProject.name = "Example Mod"` line in the `settings.gradle.kts` file!

## 3. Setup Targets In `settings.gradle.kts`

> [!CAUTION]
> You cannot use mixins anywhere in your project if you plan to use the `vanilla` target type - 
> make sure to delete the `mixins` block from your `build.gradle.kts`, remove `examplemod.mixins.json` and remove the example mixin if you plan to do so.
> <br /><br /> **Vanilla targeting is only recommended for `1.20.1`+**

```kts
stonecutter {
    kotlinController = true
    centralScript = "build.gradle.kts"

    create(rootProject) {
        fun mc(mcVersion: String, name: String = mcVersion, loaders: Iterable<String>) =
            loaders.forEach { vers("$name-$it", mcVersion) }

        // Configure your targets here! // [!code focus:3]
        mc("1.21.4", loaders = listOf("fabric", "neoforge")) 
        mc("1.20.1", loaders = listOf("forge"))

        // This is the default target.
        // https://stonecutter.kikugie.dev/stonecutter/guide/setup#settings-settings-gradle-kts
        vcsVersion = "1.21.4-fabric"
    }
}
```

Make sure to add the Java version and "Pack Format" version for your targets back in `build.gradle.kts`!

Once you've set up your targets in the various `.gradle.kts` files, you'll need to create the `gradle.properties` for each target in their respective folder.

Take `1.21.4-fabric` as an example, the target's `gradle.properties` can be found in `versions/1.21.4-fabric/gradle.properties`

A list of required properties for each target type can be found below:

| Target Type | Required Properties                                                                                                                                                                                                                           |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fabric`    | <ul><li>`modstitch.platform=loom`</li><li>`deps.minecraft` - the Minecraft version, eg; `1.21.4`</li></ul>                                                                                                                                    |
| `neoforge`  | <ul><li>`modstitch.platform=moddevgradle`</li><li>`deps.minecraft` - the Minecraft version, eg; `1.21.4`</li><li>`deps.neoforge` - The neoforge version, [you can find it here.](https://projects.neoforged.net/neoforged/neoforge)</li></ul> |
| `forge`     | <ul><li>`modstitch.platform=moddevgradle-legacy`</li><li>`deps.minecraft` - the Minecraft version, eg; `1.21.4`</li><li>`deps.forge` - The forge version to use.</li></ul>                                                                    |
| `vanilla`   | <ul><li>`modstitch.platform=moddevgradle`</li><li>`deps.minecraft` - the Minecraft version, eg; `1.21.4`</li><li>`deps.neoform` - The neoform version - [you can find it here.](https://projects.neoforged.net/neoforged/neoform)</li></ul>   |

## 4. Sync!

You can now import the project into an IDE or run gradle sync! If everything goes well you should have a fully set up project! If you plan to add a new target in the future you should just follow the previous step again. Removing targets is simple, just remove it from `settings.gradle.kts` and then delete the respective folder in `verisons`.

Have fun making a multi-version and multi-loader mod!