import Typography from 'typography'
import githubTheme from 'typography-theme-github'

githubTheme.overrideThemeStyles = ({ adjustFontSizeTo, scale, rhythm }, options) => ({
  '.ant-layout-header li.ant-menu-item, .ant-layout-header li.ant-menu-submenu': {
    marginBottom: 0
  }
})

const typography = new Typography(githubTheme)

export default typography