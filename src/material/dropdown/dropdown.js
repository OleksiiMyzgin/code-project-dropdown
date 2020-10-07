/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import React, { useState, useEffect, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlusCircle,
  faTimesCircle,
  faCaretDown,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import { getWebsites, filterValues } from "../../state/action-creators";
import { WebsiteItem } from "./website-item";

// styles
import "./dropdown.css";

/* ========== ~~~~~~~~~~ DROPDOWN ~~~~~~~~~~ ========== */
const DropDown = (props) => {
  const { initialData, getWebsites, filterValues, filteredData } = props;
  const [search, setSearch] = useState("");
  const [websites, setWebsites] = useState([]);
  const [results, setResults] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isAllSelected, setAllSelected] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearch = (val) => {
    const searchByRegex = new RegExp(val, "gi");
    const filtered = websites.filter((site) => site.name.match(searchByRegex));
    setResults(filtered);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSelectAll = () => {
    const selectedWebsites = results.map((site) => ({
      ...site,
      selected: true,
    }));

    modifyWebsiteData(selectedWebsites);

    setResults(selectedWebsites);
    setAllSelected(true);
  };

  const handleSelectNone = () => {
    const selectedWebsites = results.map((site) => ({
      ...site,
      selected: false,
    }));

    modifyWebsiteData(selectedWebsites);
    setResults(selectedWebsites);
    setAllSelected(false);
  };

  useEffect(() => {
    getWebsites();
  }, [getWebsites]);

  useEffect(() => {
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showOptions]);

  useEffect(() => {
    setWebsites(initialData);
    setResults(initialData);
  }, [initialData]);

  const handleSelectChange = (id) => {
    const updatedWebsites = results.map((site) =>
      site.id === id ? { ...site, selected: !site.selected } : site,
    );

    modifyWebsiteData(updatedWebsites);
    setResults(updatedWebsites);
  };

  const modifyWebsiteData = (modifyResults) => {
    const updateWebs = websites.map((site) => ({
      ...site,
      ...modifyResults.find((s) => s.id === site.id && s),
    }));
    setWebsites(updateWebs);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const isSelected = useMemo(() => {
    return !!results.filter((val) => val.selected).length;
  }, [results]);

  const handleFilter = () => {
    if (!isSelected) {
      return;
    }

    toggleOptions();
    filterValues(results);
  };

  const getSitesText = () => {
    let text;

    if (!filteredData.length) {
      text = <div className="header">All Sites</div>;
    } else {
      const numberOfSelected = filteredData.filter((val) => val.selected)
        .length;
      text = <div className="header active">{numberOfSelected} Sites</div>;
    }
    return text;
  };

  return (
    <div className="dropdown">
      <div className={`dropdown-header ${showOptions ? "active" : ""}`}>
        <div className="link-icon-wrapper">
          <FontAwesomeIcon icon={faLink} className="link-icon" />
        </div>
        <div className="sites-info-wrapper">
          <div>Sites</div>
          <div>{getSitesText()}</div>
        </div>
        <div className="cared-icon-wrapper" onClick={toggleOptions}>
          <FontAwesomeIcon icon={faCaretDown} className="cared-down" />
        </div>
      </div>

      {showOptions && (
        <>
          <div className="dropdown-options">
            <div className="search-wrapper">
              <FontAwesomeIcon icon={faSearch} className="icon search-icon" />
              <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search Site"
                className="search-input"
                ref={searchInputRef}
              />
            </div>

            {isAllSelected ? (
              <div className="selections" onClick={handleSelectNone}>
                <FontAwesomeIcon icon={faTimesCircle} className="icon" />
                Select none
              </div>
            ) : (
              <div className="selections" onClick={handleSelectAll}>
                <FontAwesomeIcon icon={faPlusCircle} className="icon" />
                Select all
              </div>
            )}

            <div className="results">
              {results.map((website) => (
                <WebsiteItem
                  website={website}
                  handleSelectChange={handleSelectChange}
                  search={search}
                />
              ))}
            </div>
          </div>
          <button
            className={`filter ${isSelected ? "active" : ""}`}
            onClick={handleFilter}
          >
            Filter
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    initialData: state.dropdownStatus.initialData,
    filteredData: state.dropdownStatus.filteredData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getWebsites, filterValues }, dispatch);
};

/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
