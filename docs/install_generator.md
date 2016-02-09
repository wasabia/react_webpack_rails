# Instlal Generator
=======
Install generator is build from 6 independent generators responsible for different parts of installation process. All steps except core generator can be skipped by passing one of possible [options]().

```bash
$ rails generate react_webpack_rails:install
```

Running install generator with default options will create fallowing files:

```
├── app
│   ├── react
│   │   ├── components
│   │   │   ├── hello-world.jsx (example)
│   │   │   └── hello-world-test.jsx (example)
│   │   ├── index.js (core)
│   │   └── node_server.js (server_side)
│   ├── views
│   │   ├── layouts
│   │   │   └── _react_hot_assets.html.erb (hot_relaod)
│   │   └── react_examples
│   │       └── component.html.erb (example)
│   ├── assets
│   │   └── javascripts
│   │       └──react_bundle.js (core)
│   └── controllers
│       └── react_examples_controller.rb (example)
├── webpack
│   ├── dev.config.js (core)
│   ├── hot-dev.config.js (hot_reload)
│   ├── production.config.js (core)
│   └── tests.config.js (karma_setup)
├── forever
│   ├── development.json (server_side)
│   └── production.json (server_side)
├── .babelrc (core)
├── karma.conf.js (karma_setup)
├── package.json (core)
└── webpack.config.js (core)
```

And modify:
- `config/routes.rb` by adding route for example component,
- `app/views/layouts/application.html.erb` by adding hot_reload partial.

### Options
* *--no_example bool* - skip example generator
* *--no_hot_reload bool* - skip hot_reload generator
* *--no_server_side bool* - skip server_side  generator
* *--no_karma_setup bool* - skip karma_setup generator
* *--react_router bool* - run react_rotuer generator

*Detailed description of generators coming soon...*