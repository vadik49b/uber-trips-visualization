import React, { Component } from 'react'
import './App.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import car from './car.png'
import io from 'socket.io-client'
import mapboxgl from 'mapbox-gl'
import Rx from 'rx'

mapboxgl.accessToken = 'pk.eyJ1IjoidmFkaWs0OWIiLCJhIjoiTjFCRmNuNCJ9.KUJpmJuwHou0F_vaQcv20g'

class App extends Component {
  componentDidMount () {
    this.map = new mapboxgl.Map({
      center: [-73.9914, 40.7521],
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 11
    })
    this.socket = io('http://localhost:3001')
    Rx.Observable.fromEvent(this.socket, 'pickup')
      .bufferWithCount(20)
      .subscribe(pickupsBuf => {
        for (const p of pickupsBuf) {
          this.addPickup(p)
        }
      })
  }

  componentWillUnmount () {
    this.socket.disconnect()
  }

  addPickup ([date, lat, lon]) {
    const div = document.createElement('div')
    div.className = 'Car'
    div.style.cssText = `background-image: url(${car})`
    new mapboxgl.Marker(div, { offset: [-15, -15] })
      .setLngLat([Number(lon), Number(lat)]).addTo(this.map)
  }

  render () {
    return <div id='map' className='App-map' />
  }
}

export default App
