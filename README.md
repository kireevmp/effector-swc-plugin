# SWC Plugin for ☄️ Effector

A plugin to enhance your [☄️ Effector](https://effector.dev) experience, just like `effector/babel-plugin`, but _Speedy_.

Can be used for SSR, debugging and testing in SWC-powered projects, like [NextJS](https://nextjs.org) or [Vite's react-swc plugin](https://github.com/vitejs/vite-plugin-react-swc). Strives to be compatible with the [built-in `effector/babel-plugin`](https://effector.dev/en/api/effector/babel-plugin/).

> [!IMPORTANT]
> SWC Plugins are currenlty unstable, and `@swc/core` does not follow semver in plugin compatibility. For more info, see [versioning](#Versioning).

## ⚙️ Get Started

First, install a [compatible](#Versioning) tag of this package, and pin it:

```bash
$ npm install effector-swc-plugin@compatible-tag --save-exact
# or
$ yarn add effector-swc-plugin@compatible-tag --exact
# or
$ pnpm add effector-swc-plugin@compatible-tag --save-exact
```

Second, add this plugin into your SWC configuration (like `.swcrc`):

```json
{
  "$schema": "https://json.schemastore.org/swcrc",
  "jsc": {
    "experimental": {
      "plugins": [["effector-swc-plugin", {}]]
    }
  }
}
// You must specify a configuration for a plugin, even if it's empty
```

Third, run your build tools and enjoy.

## 🛠️ Configuration

- `addNames`: `boolean` (default: `true`)

  Add `name` information when calling factories (like `createStore` or `createDomain`).
  Provides excellent debug or QoL information during development/testing, but its best to disable it when using minification.

- `addLoc`: `boolean` (default: `false`)

  Add `loc` (unit location) information to factories' calls. Useful for debugging and when using devtools, like [`effector-logger`](https://github.com/effector/logger).

- `debugSids`: `boolean` (default: `false`)

  Add a file path and unit name to the end of generated SID. Useful for debugging SSR.

- `forceScope`: `boolean | { hooks: boolean, reflect: boolean }` (default: `false`)

  When enabled, injects `forceScope: true` into all [`hooks`](https://effector.dev/en/api/effector-react/#hooks) or `@effector/reflect` calls, depending on your configuration.

  When `forceScope` is enabled, it enforces that your app _always_ uses `Scope` during render. If the `Scope` is missing, the app will throw an error. This setting completely replaces the requirement for `/scope` or `/ssr` imports.

  More about Scope enforcement in [documentation](https://effector.dev/en/api/effector-react/module/scope/#scope-enforcement).

  - `forceScope.hooks`: `boolean` _(since `v0.2.0`)_

    `hooks: true` enforces that all hooks from `effector-react` and `effector-solid`, like `useUnit` and `useList`, use `Scope`.

  - `forceScope.reflect`: `boolean` _(since `v0.2.0`)_

    For `@effector/reflect` users. If enabled, this option enforces all components created with `reflect` library also use `Scope`.

    > Note: Only useful for `@effector/reflect@>=9.0.0`. Versions lower than `9.0.0` do not support `forceScope`.

  - `forceScope: boolean` - a shorthand to enable/disable all options

- `factories`: `string[]` (default: `[]`)

  An array of module names or files to treat as factories. Only required for SSR.

  A number of community packages (`patronum`, `@farfetched/code`, etc.) are included by default, and do not require you to set them explicitly.

  If provided with a relative path (a path starting with `./`), plugin will treat this as a local factory residing at a specified path _relative_ to your `.swcrc`. These factories can be imported using _relative_ imports in your code.

  If provided with other path, like a package name or a TypeScript alias, plugin will treat this as an exact import specifier which your code uses. You can not import this factory using a relative path.

  Relative import example:

  ```js
  // file: /.swcrc
  ...
  "factories": ["./src/factory"]
  ...

  // file: /src/factory.ts
  import { createStore } from "effector";

  export const createBooleanStore = () => createStore(true);

  // file: /src/widget/user.ts
  import { createBooleanStore } from "../factory"

  const $boolean = createBooleanStore() /* Treated as a factory! */
  ```

- `transformLegacyDomainMethods`: `boolean` (default: `true`)

  When disabled, stops transforming [Unit creators in Domains](https://effector.dev/en/api/effector/domain/#unit-creators), like `domain.event()` or `domain.createEffect()`.

  Transforming such calls relies heavily on guessing, and is known to affect/break code unrelated to Effector.
  An alternative approach to these methods is to use `domain` argument in regular methods:

  ```ts
  const domain = createDomain();

  // ↓ pass domain as an argument
  const foo = createEvent({ domain });
  ```

  > Disabling this option will **stop** adding `sid`s and other debug information into these unit creators. Before turning it off, ensure that your code does not use domain methods.

  Further reading: [You Don't Need Domains](https://withease.pages.dev/magazine/no_domains.html).

### Known differences with `effector/babel-plugin`

- No support for `importName`

  By default, the plugin supports `effector` (+ `/compat`), `effector-root` (+ `/compat`) and `effector-logger`.
  This should cover you in most of use cases. If you feel a need for this feature, please open an issue!

- No support for `noDefaults`

  This is currently only used by library developers, and may be implemented in the future.
  If you feel you need this feature, please open an issue!

- `reactSsr` replaced by `forceScope`

  `reactSsr` option is deprecated, as well as `/scope` imports. `effector-react` supports SSR by default since `effector@23`.

  If you want to enforce that [`Scope`](https://effector.dev/en/api/effector/Scope) is never lost in your components, `forceScope` option in the plugin will do the trick.

## Versioning

Because SWC plugins are unstable and experimental, breaking changes can happen in minor/patch releases of `@swc/core` or underlying `swc_core` Rust library.

This package will do its best and specify the correct `@swc/core` in its `peerDependencies`, so when you use the wrong version, it should say so.

To work around breaking changes, this package publishes different ['labels'](https://semver.org/#spec-item-9) for different corresponding `@swc/core` ranges. To choose an appropriate label, pick your `@swc/core` / `NextJS` version from [the list](https://www.npmjs.com/package/effector-swc-plugin?activeTab=versions).

**Always pin your `@swc/core` and this plugin version for stable behavior.**

Choosing the Right Plugin Version:

- Use `@0.x.x` (no label) for the latest `@swc/core`.
- Use `@0.x.x-swc1.x.x` for specific `@swc/core` versions.

**Example:**

| Available Plugin Version       | Compatible `@swc/core` Versions |
| ------------------------------ | ------------------------------- |
| `@0.x.x-swc1.3.49`             | `1.3.49` to `1.3.57`            |
| `@0.x.x-swc1.3.58`             | `1.3.58` to `1.3.61`            |
| `@0.x.x-swc1.3.62` or `@0.x.x` | `1.3.62`                        |

### For NextJS users

See SWC Documentation "[Selecting the version](https://swc.rs/docs/plugin/selecting-swc-core)" for detailed info on plugin compatibility. Each NextJS version has a corresponding `@swc/core` version, which you need to know.

As soon as you know the `@swc/core` version, follow the rules above to install the plugin.
