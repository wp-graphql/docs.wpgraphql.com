import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import { InstantSearch } from 'react-instantsearch/dom'
import { connectHits, connectSearchBox } from 'react-instantsearch/connectors'
import { Icon, Input, AutoComplete } from 'antd';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

function renderOption(hit) {
  console.log( hit );
  return (
    <Option key={hit.objectID} text={hit.title}>
      <Link
        to={`${hit.path}`}
      >
        {hit.title}
      </Link>
    </Option>
  );
}

function Complete({currentRefinement, refine, hits}) {

  const handleSearch = (value) => {
    return refine(value);
  };

  const handleChange = (value) => {
    navigateTo(value);
  };

  return (
    <div className="certain-category-search-wrapper" style={{ width: '100%' }}>
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={hits.map(renderOption)}
        placeholder="Search WPGraphQL"
        optionLabelProp="title"
        onSearch={handleSearch}
        onChange={handleChange}
      >
        <Input suffix={<Icon type="search" className="certain-category-icon" />} />
      </AutoComplete>
    </div>
  );
}

const SearchInput = ({currentRefinement, refine, hits}) => <Complete hits={hits} refine={refine} currentRefinement={currentRefinement} />;

const ConnectedSearch = connectSearchBox(connectHits(SearchInput));

const Search = () => (
  <InstantSearch
    appId="0OQW7P3CWR"
    apiKey="7c453e20d23c2c68916cd301063ff8f7"
    indexName="wpgraphqldocs"
  >
    <ConnectedSearch/>
  </InstantSearch>
);

export default Search;
