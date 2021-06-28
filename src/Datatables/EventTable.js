import React, { useState } from "react";
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

import { deleteEvent } from "../api/event";
const EventTable = ({ data, th }) => {
  const linkFormatter = (cell, row, rowIndex) => {
    return (
      <>
        <a href={"/search/" + cell}>
          {" "}
          <FaEye size="25" color="orange" />
        </a>
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
        <FaTrash
          size="20"
          color="red"
          onClick={async () => {
            const result = await deleteEvent(cell);
            if (result.ok) {
              alert("Event Deleted");
            } else {
              alert("Error while Deleting");
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
    onSelect: handleOnSelect,
  };
  return (
    <>
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
                const file = new Blob([res.data], { type: "application/pdf" });
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
        data={data}
        filter={filterFactory()}
        selectRow={selectRow}
        bordered={true}
        headerClasses="header-class"
        noDataIndication="Aucun Evenement Trouvé"
      />
    </>
  );
};

export default EventTable;
