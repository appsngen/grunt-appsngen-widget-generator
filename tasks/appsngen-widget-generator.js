const path = require('path');
const fs = require('fs');
const _ = require('underscore');

const readFilePromisified = pathToFile => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathToFile, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            }

            resolve(data);
        });
    });
};

const writeInterpolatedFiles = (pathToFile, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(pathToFile, data, error => {
            if (error) {
                reject(error);
            }

            resolve();
        });
    });
};

const getSupportedDimensionXml = supportedDimensions => {
    let supportedDimensionsList = supportedDimensions.join('|');

    return `<SupportedDimensions>${supportedDimensionsList}</SupportedDimensions>`;
};

const getDatasourceXml = datasources => {
    return datasources.map(element => {
        return '<Source>' + element + '</Source>';
    }).join('');
};

const templates = [
    'index.html',
    'application.xml'
];

module.exports = grunt => {
    grunt.registerTask('appsngen-widget-generator', 'Grunt task for gererating Appsngen widget from Polymer component',
        function () {
            let options;
            const done = this.async();
            const gruntOptions = this.options();
            const dest = gruntOptions.dest || 'dist';

            readFilePromisified(path.join('.', 'bower.json'))
            .then(bowerInfo => {
                try {
                    return Promise.resolve(JSON.parse(bowerInfo));
                } catch (error) {
                    return Promise.reject(error);
                }
            })
            // prepare options for templates
            .then(data => {
                options = Object.assign({}, gruntOptions, data.appsngen);

                options.version = options.version || data.version;
                options.tagName = data.name;
                options.supportedDimensions = getSupportedDimensionXml(options.supportedDimensions);
                options.datasources = getDatasourceXml(options.datasources);

                return Promise.resolve();
            })
            .then(() => {
                let assetsPath = path.join(__dirname, 'templates');

                return Promise.all(templates.map(element => {
                    return readFilePromisified(path.join(assetsPath, element));
                }));
            })
            .then(filesContent => {
                let oldTemplateSettings = _.templateSettings;

                _.templateSettings = {
                    interpolate: /\{\{(.+?)\}\}/g
                };

                return Promise.all(templates.map((element, index) => {
                    let template = _.template(filesContent[index]);

                    return writeInterpolatedFiles(path.join(dest, element), template(options));
                }))
                .then(() => {
                    _.templateSettings = oldTemplateSettings;
                    return Promise.resolve();
                });
            })
            .then(() => {
                done();
            })
            .catch(error => {
                grunt.log.error(error.toString());
                done(false);
            });
        });
};
