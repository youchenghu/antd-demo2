module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      { libraryName: "Antd", libraryDirectory: "es", style: 'css' }
      // { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
    ]
  ]
}
