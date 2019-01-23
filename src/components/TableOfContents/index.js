import React from 'react'
import PropTypes from 'prop-types'
import tocbot from 'tocbot'
import './style.css'

class TableOfContents extends React.Component {
  componentDidMount() {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: `.toc-list-container`,
      // Where to grab the headings to build the table of contents.
      contentSelector: `.content`,
      // Which headings to grab inside of the contentSelector element.
      headingSelector: `h2, h3`,
      headingsOffset: parseInt(this.props.headingsOffset),
    })
  }

  render() {
    return (
      <nav className={`${this.props.className}` } data-cy="toc">
        {(this.props.showHeading ? <h3>On this page</h3> : null)}
        <div className={`toc-list-container ${this.props.listClasses}`} />
      </nav>
    )
  }
}

TableOfContents.defaultProps = {
  headingsOffset: `1`,
  showHeading: true,
}

TableOfContents.propTypes = {
  headingsOffset: PropTypes.string,
  className: PropTypes.string,
  listClasses: PropTypes.string,
  showHeading: PropTypes.bool,
}

export default TableOfContents
