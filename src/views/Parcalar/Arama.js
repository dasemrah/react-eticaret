import _ from 'lodash'
import istek from '../../istek';
import React, { Component} from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import data from '../../data'

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
    istek.get('/urunler')
      .then(ynt=>{
        ynt.data.foundUrun.map(kategori=>{
          kategori.urunler.map(urun=>{

              var source={
                title: urun.ad,
                description:urun.net,
                price: String(urun.fiyat+' ₺'),
                key:urun._id,
                net:urun.net,
                kategori:urun.kategori,
                ad:urun.ad,
                aktif:urun.aktif,
                img:urun.img,
                fiyat:urun.fiyat,
                indirimde:urun.indirimde,
                gorsel:urun.gorsel,
                aciklama:urun.aciklama,
                _id:urun._id
              }
              this.setState({
                source:[...this.state.source,source]
              })
          })
        })
      })
  }

  handleResultSelect = (e, { result }) => {

    console.log('seçildi')
    this.setState({ value: result.title })
    this.props.aramaSonucu(result)

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
              noResultsMessage="Böyle bir ürün yok"
              noResultsDescription="Başka bir ürün aramayı deneyin"

            />


        </Grid.Column>

      </Grid>
    )
  }
}
