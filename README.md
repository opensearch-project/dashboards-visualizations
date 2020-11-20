# Open Distro for Elasticsearch Kibana Visualizations

The Open Distro for Elasticsearch Kibana Visualizations enables you to use additional types of visualizations inside Kibana Visualize and integrate them in Kibana Dashboard.


## Documentation

Please see our technical [documentation](https://opendistro.github.io/for-elasticsearch-docs/) to learn more about its features.


## Setup

1. Download Elasticsearch for the version that matches the [Kibana version specified in package.json](./package.json#L5).
1. Download the Kibana source code for the [version specified in package.json](./package.json#L5) you want to set up.

   See the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md#setting-up-your-development-environment) for more instructions on setting up your development environment.
   
1. Change your node version to the version specified in `.node-version` inside the Kibana root directory.
1. cd into the Kibana source code directory.
1. Check out this package from version control into the `plugins` directory.
```
rm plugins -r
git clone git@github.com:opendistro-for-elasticsearch/kibana-visualizations.git plugins --no-checkout
cd plugins
echo 'gantt-chart/*' >> .git/info/sparse-checkout
git config core.sparseCheckout true
git checkout main
```
6. Run `yarn kbn bootstrap` inside `kibana` directory.

Ultimately, your directory structure should look like this:

```md
.
├── kibana
│   └── plugins
│       └── gantt-chart
```


## Build

To build the plugin's distributable zip simply run `yarn build`.

Example output: `./build/opendistroGanttChartKibana-*.zip`


## Run

- `yarn start`

  Starts Kibana and includes this plugin. Kibana will be available on `localhost:5601`.

- `npx cypress run`

  Runs the plugin cypress tests.


## Contributing to Open Distro for Elasticsearch Kibana Visualizations

We welcome you to get involved in development, documentation, testing the kibana reports plugin. See our [CONTRIBUTING.md](./CONTRIBUTING.md) and join in.

Since this is a Kibana plugin, it can be useful to review the [Kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) alongside the documentation around [Kibana plugins](https://www.elastic.co/guide/en/kibana/master/kibana-plugins.html) and [plugin development](https://www.elastic.co/guide/en/kibana/current/plugin-development.html).

## Bugs, Enhancements or Questions

Please file an issue to report any bugs you may find, enhancements you may need or questions you may have [here](https://github.com/opendistro-for-elasticsearch/kibana-visualizations/issues).

## License

This code is licensed under the Apache 2.0 License. 

## Copyright

Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

