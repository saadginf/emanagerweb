import React, { useState, useEffect } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import EventTable from "../Datatables/EventTable";
import { getAllArticles } from "../api/themes";
import "./Search.css";
import { getEventByTh } from "../api/event";
const Search = () => {
  const [themes, setthemes] = useState([]);
  const [events, setevents] = useState([]);
  const getThemes = async () => {
    const articles = await getAllArticles();

    if (!articles.ok) {
      console.log("Error Guetting Themes check Your Internet Connection");
      return;
    }

    setthemes(articles.data);
  };

  const [size, setSize] = useState("");
  const handleChange = async (value) => {
    let result = await getEventByTh(value);
    if (!result.ok) {
      console.log("Error Guetting Events check Your Internet Connection");
      return;
    }
    setevents(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getThemes();
  }, []);

  return (
    <div>
      <div className="Select-search-container">
        <SelectSearch
          value={size}
          onChange={handleChange}
          placeholder="Selectionner un Thème"
          search
          filterOptions={fuzzySearch}
          options={
            themes.length
              ? themes.map((r) => {
                  return {
                    value: r.value,
                    name: r.label,
                  };
                })
              : []
          }
        />
      </div>
      <div className="table-container">
        <EventTable data={events} />
      </div>
    </div>
  );
};

export default Search;
