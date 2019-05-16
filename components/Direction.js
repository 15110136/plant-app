import React from "react"
import MapViewDirections from 'react-native-maps-directions'
import { key } from "../constants/keys";

const Direction = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={key.direction}
    strokeWidth={3}
    strokeColor="green"
  />
)

export default Direction