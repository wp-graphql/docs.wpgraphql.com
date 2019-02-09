import React, { Component } from 'react'
import { navigate } from 'gatsby'
import { InstantSearch } from 'react-instantsearch/dom'
import { connectHits, connectSearchBox } from 'react-instantsearch/connectors'
import { Icon, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;

function renderOption(hit) {
  const { title, path } = hit;
  return (
    <Option key={path} text={title}>
      {title}
    </Option>
  );
}

class Complete extends Component {

  state = {
    results: []
  };

  handleSearch = (value) => {
    const { refine, hits } = this.props;
    refine(value);
    const results = hits.map(renderOption);
    this.setState({ results });

  };

  render() {
    const { results } = this.state;
    return (
      <div
        className="certain-category-search-wrapper"
        style={{
          width: '100%',
          padding: '1px 20px'
        }}
      >
        <AutoComplete
          className="certain-category-search"
          dropdownClassName="certain-category-search-dropdown"
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          style={{ width: '100%' }}
          dataSource={ results }
          placeholder="Search WPGraphQL"
          optionLabelProp="title"
          onSearch={ value => { this.handleSearch( value ) }}
          onChange={ value => { console.log( value ) }}
          onSelect={ value => { navigate( value )}}
        >
          <Input
            suffix={
              <Icon
                type="search"
                className="certain-category-icon"
              />
            }
          />
        </AutoComplete>
      </div>
    );
  }


}

const SearchInput = ({currentRefinement, refine, hits}) => <Complete hits={hits} refine={refine} currentRefinement={currentRefinement} />;

const ConnectedSearch = connectSearchBox(connectHits(SearchInput));

class Search extends Component{

  state = {
    shouldRender: false
  };

  componentDidMount() {
    this.setState({
      shouldRender: true,
    })
  }

  render() {
    const { shouldRender } = this.state;
    return ! shouldRender ? null : (
      <InstantSearch
        appId="0OQW7P3CWR"
        apiKey="5d6dae16e612276e35723bfdc952a47b"
        indexName="wpgraphql_gatsby"
      >
        <ConnectedSearch />
      </InstantSearch>
    );
  }
}


export default Search;
