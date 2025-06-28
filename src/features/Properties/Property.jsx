import React from "react";
import { useParams } from "react-router-dom";

export default function Property() {
  const { id } = useParams();

  return <div>Property id = ${id}</div>;
}
