import React, { Component } from 'react'
import Link from 'gatsby-link'
import { Affix, Layout, Menu, Icon } from 'antd'
const { SubMenu } = Menu;
const { Sider } = Layout;

const MenuItems = ({navItems, pathContext}) => {

  /**
   * Loop through the menuItems to generate the menu items
   * @type {Array}
   */
  const items = navItems && navItems.edges && navItems.edges.map( (menuItem) => {

    /**
     * If the type is a page, create a menuItem
     */
    if ( menuItem && menuItem.node && menuItem.node.items ) {
      let subItems = menuItem.node.items.map( (subMenuItem) => {
        console.log('subMenuItem');
        console.log(subMenuItem.link);
        return (
          <Menu.Item key={subMenuItem.link + '/'}>
            <Link key={subMenuItem.link} to={subMenuItem.link}>{subMenuItem.title}</Link>
          </Menu.Item>
        );
      });

      /**
       * Return the SubMenu
       */
      return (
        <SubMenu
          key={menuItem.node.section}
          title={
            <span>
              <Icon type="file" />
              <span>{menuItem.node.title}</span>
            </span>
          }
        >{subItems}</SubMenu>
      );
    }
  } );

  /**
   * Split the path so we can determine the openKey for the menu
   */
  let splitPath = pathContext && pathContext.path ? pathContext.path.split('/') : '';

  /**
   * Determine the open key for the menu.
   *
   * Ex: if the path is "/some-directory/some-page", then we want the "some-directory" submenu item to be flagged
   * as an open key. 
   * 
   * So, this gets "some-directory" out of the path, and passes it to the menu's "defaultOpenKeys" prop
   * 
   * @type {null}
   */
  let openKeys = '/' + splitPath[1] + '/' + splitPath[2];

  console.log(pathContext.path);

  /**
   * Return the Menu
   */
  return <Menu
    mode="inline"
    theme="light"
    style={{height: '100%'}}
    defaultSelectedKeys={[pathContext.path]}
    defaultOpenKeys={[openKeys]}
  >{items}</Menu>;
};

class SidebarNav extends React.Component {
  render() {
    const navItems = this.props.navItems;
    const pathContext = this.props.pathContext;
    return (
      <Sider
        style={{
          background: 'white',
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
          minHeight: 'calc(100vh - 64px)', // Viewport height minus header
        }}
        width={'300'}
      >
        <Affix>
          <MenuItems pathContext={pathContext} navItems={navItems} />
        </Affix>
      </Sider>
    )
  }
}

export default SidebarNav