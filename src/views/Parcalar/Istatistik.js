import React from 'react'
import { Statistic } from 'semantic-ui-react'

const Istatistik = () => (
  <Statistic.Group widths='two' className="istatistik" >
    <Statistic size="tiny">
      <Statistic.Value text>
        <img src="https://img.icons8.com/color/64/000000/flour-in-paper-packaging.png"/>
      </Statistic.Value>
      <Statistic.Label><span className="text-light">Tamamen Organİk</span></Statistic.Label>
    </Statistic>

    <Statistic size="mini">
      <Statistic.Value>
        <img src="https://img.icons8.com/bubbles/100/000000/girl-with-glasses-shopping-cart.png"/>
      </Statistic.Value>
      <Statistic.Label><span className="text-light">Kolay Alışveriş</span></Statistic.Label>
    </Statistic>

    <Statistic size="tiny">
      <Statistic.Value>
        <img src="https://img.icons8.com/nolan/64/packaging.png"/>
      </Statistic.Value>
      <Statistic.Label><span className="text-light">Sağlam Paketleme</span></Statistic.Label>
    </Statistic>


    <Statistic size="small">
      <Statistic.Value>
        <img src="https://img.icons8.com/nolan/96/shipped.png"/>
      </Statistic.Value>
      <Statistic.Label><span className="text-light">Anında Kargoda</span></Statistic.Label>
    </Statistic>

  </Statistic.Group>
)

export default Istatistik
