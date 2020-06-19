import _ from 'lodash'
import istek from '../../../istek'
import React, { Component} from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
export default class Arama extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoading: false,
      results: [],
      value: '',
      source:[]
    }
  }
  componentDidMount() {
    istek.get('/tumsiparisler')
      .then(ynt=>{
          ynt.data.siparis.map(siparis=>{
            var source={
              title: siparis?.ad,
              description:siparis?.tarih?.substring(0,10),
              key:siparis._id,
              ad:siparis.ad,
              adres:siparis.adres,
              detay:siparis.detay,
              durum:siparis.durum,
              Urunler:siparis.Urunler,
              kapida:siparis.kapida,
              odeme:siparis.odeme,
              paket:siparis.paket,
              tarih:siparis.tarih,
              telefon:siparis.telefon,
              ucret:siparis.ucret,
              _id:siparis._id
            }
            this.setState({
              source:[...this.state.source,source]
            })
          })
      })
  }

  handleResultSelect = (e, { result }) => {

    console.log('seçildi')
    this.setState({ value: result.title })
    this.props.sonuc(result)

  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.state)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.state.source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state
    return (
      <Grid className="arama">
        <Grid.Column width={16}>

          <Search
            input={{ icon: 'search', iconPosition: 'left' ,placeholder:'Ne aramıştınız?'}}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            noResultsMessage="Böyle bir sipariş yok"
            noResultsDescription="Başka bir ürün aramayı deneyin"

          />


        </Grid.Column>

      </Grid>
    )
  }
}
