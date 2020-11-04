const plugins = [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ],
    ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
    }, 'vant']
];

module.exports = {
  presets: [["@vue/app",{"useBuiltIns": "entry"}],["@babel/preset-env", { "modules": false }]],
  plugins: plugins
};
