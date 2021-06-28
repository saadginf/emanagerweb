import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/event";
import { FaDownload } from "react-icons/fa";

import Axios from "axios";
import "./SearchById.css";
const SearchById = () => {
  const [event, setevent] = useState();
  let { id } = useParams();
  const getEventDetails = async (value) => {
    let result = await getEvent(value);
    if (!result.ok) {
      console.log("Error Guetting Events check Your Internet Connection");
      return;
    }
    setevent(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getEventDetails(id);
  }, []);
  return (
    <Row>
      <Col md={4}>
        {event ? (
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>Thème</td>
                <td>{event.themEvent ? event.themEvent.label : "---"}</td>
              </tr>
              <tr>
                <td>Lieux</td>
                <td>{event.lieux ? event.lieux.label : "---"}</td>
              </tr>
              <tr>
                <td>Réfs</td>
                <td>{event.reference}</td>
              </tr>
              <tr>
                <td>Obj</td>
                <td>{event.objet}</td>
              </tr>
              <tr>
                <td>Edition</td>
                <td>{event.eventEdition}</td>
              </tr>
              <tr>
                <td>Reps</td>
                <td>
                  {event.representants
                    ? event.representants.map((k) => (
                        <p key={k.value}>{k.label}</p>
                      ))
                    : ""}
                </td>
              </tr>
              <tr>
                <td>Du</td>

                <td>{event.startDate}</td>
              </tr>
              <tr>
                <td>Au</td>

                <td>{event.endDate}</td>
              </tr>
              <tr>
                <td>Fiche</td>

                <td>
                  {event ? (
                    <FaDownload
                      size="20"
                      color="green"
                      onClick={() => {
                        if (event.fileLink) {
                          Axios.get(
                            "http://localhost:8081/api/events/download/" +
                              event.id,
                            {
                              responseType: "blob",
                              haders: {
                                Accept:
                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                              },
                            }
                          )
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
                        } else {
                          alert("NO FILE");
                        }
                      }}
                    />
                  ) : (
                    "----"
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p>No Event</p>
        )}
      </Col>
      <Col md={8}>
        <div className="sugg-act">
          <h5>Activités</h5>

          {event ? event.activites.split("\n").map((p) => <p>{p}</p>) : "---"}
        </div>
        <div className="sugg-act">
          <h5>Suggestions</h5>

          {event ? event.suggestions.split("\n").map((p) => <p>{p}</p>) : "---"}
        </div>
      </Col>
    </Row>
  );
};

export default SearchById;
