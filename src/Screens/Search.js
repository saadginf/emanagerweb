import React, { useState, useEffect } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  FaDownload,
  FaEdit,
  FaTrash,
  FaEye,
  FaPrint,
  FaShoePrints,
} from "react-icons/fa";
import paginationFactory from "react-bootstrap-table2-paginator";
import Axios from "axios";
import EventTable from "../Datatables/EventTable";
import { getAllArticles } from "../api/themes";
import "./Search.css";
import { getEventByTh, deleteEvent } from "../api/event";
const Search = () => {
  const linkFormatter = (cell, row, rowIndex) => {
    return (
      <>
        <a href={"/search/" + cell}>
          {" "}
          <FaEye size="25" color="orange" />
        </a>
        {!row.fileLink && (
          <a href={"/edit/" + cell}>
            {" "}
            <FaEdit size="25" color="green" />
          </a>
        )}
        {row.fileLink && (
          <FaDownload
            size="20"
            color="green"
            onClick={() => {
              Axios.get("http://localhost:8081/api/events/download/" + cell, {
                responseType: "blob",
                haders: {
                  Accept:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                },
              })
                .then((res) => {
                  const file = new Blob([res.data], {
                    type:
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  });
                  const fileUrl = URL.createObjectURL(file);
                  window.open(fileUrl);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        )}
        <FaTrash
          size="20"
          color="red"
          onClick={async () => {
            const r = window.confirm(
              "Etes vous sûr de vouloir supprimer l'événement?"
            );
            if (r) {
              const result = await deleteEvent(cell);
              if (result.ok) {
                alert("Event Deleted");
                window.location.reload();
              } else {
                alert("Error while Deleting");
              }
            }
          }}
        />
      </>
    );
  };
  const columns = [
    {
      dataField: "objet",
      text: "Objet",
      align: "center",
      title: true,
      headerAlign: "center",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "reference",
      text: "Référence",
      align: "center",
      title: true,
      headerAlign: "center",
      filter: textFilter(),

      sort: true,
    },
    {
      dataField: "eventEdition",
      text: "Edition",
      align: "center",
      title: true,
      headerAlign: "center",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "lieux.label",
      text: "Lieux",
      align: "center",
      title: true,
      headerAlign: "center",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "startDate",
      text: "Date",
      align: "center",
      title: true,
      headerAlign: "center",
      filter: textFilter(),
      sort: true,
    },

    {
      dataField: "id",
      text: "Détails",
      formatter: linkFormatter,
      align: "center",
      title: true,
      headerAlign: "center",
    },
  ];
  const [ids, setids] = useState([]);
  const handleOnSelect = (row, isSelect) => {
    console.log(row.id, isSelect);
    if (isSelect) {
      setids([...ids, row.id]);
    } else {
      setids(ids.filter((k) => k != row.id));
    }
  };
  console.log(ids.join());
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: ids,
    onSelect: handleOnSelect,
  };
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
    setids([]);
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
        {ids.length ? (
          <FaPrint
            color="green"
            size={50}
            style={{
              margin: "20px",
              cursor: "pointer",
              border: "1px solid green",
              padding: "10px",
            }}
            onClick={() => {
              Axios.get(
                "http://localhost:8888/api/events/summary/" + ids.join(),
                {
                  responseType: "blob",
                  haders: {
                    Accept: "application/pdf",
                  },
                }
              )
                .then((res) => {
                  const file = new Blob([res.data], {
                    type: "application/pdf",
                  });
                  const fileUrl = URL.createObjectURL(file);
                  window.open(fileUrl);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        ) : null}
        <BootstrapTable
          keyField={"id"}
          pagination={paginationFactory()}
          columns={columns}
          data={events}
          filter={filterFactory()}
          selectRow={selectRow}
          bordered={true}
          headerClasses="header-class"
          noDataIndication="Aucun Evenement Trouvé"
        />
      </div>
    </div>
  );
};

export default Search;
