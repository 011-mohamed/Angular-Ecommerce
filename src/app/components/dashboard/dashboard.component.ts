import { VentePerMois } from './../../common/vente-per-mois';
import { Statistic } from './../../common/statistic';
import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { DashboardService } from 'src/app/services/dashboard.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  categoryCount :  any ;
  productCount : any ; 
  customersCount : any ;
  BillsCount : any ; 
  options: AgChartOptions;
  statistic : Statistic [] ;
  ventePerMois : VentePerMois [] =[]   ;
  dt : any
  

  janvier : string = 'Janvier';
  fevrier : string = 'Février';
  mars : string = 'Mars' ; 
  avril : string = 'Avril' ; 
  mai : string = 'Mai'; 
  juin : string = 'Juin';
  Juillet : string = 'Juillet';Aout : string = 'Aout';Septembre : string = 'Septembre';Octobre : string = 'Octobre';
  Novembre : string = 'Novembre';Decembre : string = 'Décembre';

  v1 : number = 0   ; v2 : number = 0; v3 : number = 0 ; v4 : number = 0 ;v5 : number = 0 ; v6 : number = 0 ;
  v7 : number =0 ; v8 : number = 0 ; v9:number = 0 ; v10 : number = 0 ; v11 : number = 0 ; v12 : number = 0 ;

  month : string ;
  totalVente : number ;
  data: any[];
  test : VentePerMois [] =[];
  
  
  constructor(private dashBoardService : DashboardService) {
    this.options = {
      autoSize: true,
      data: this.createDataForChart(),
      title: {
        text: 'Total des ventes par mois',
        fontSize: 18,
      },
      subtitle: {
        text: 'Source: [NOM DE SOCIETE]',
      },
      series: [
        {
          type: 'column',
          xKey: 'mois',
          yKey: 'vente',
          fill: '#0084e7',
          strokeWidth: 0,
          shadow: {
            xOffset: 3,
          },
        },
      ],
      axes: [
        {
          type: 'category',
          position: 'bottom',
          title: {
            text: 'Année 2022 ',
          },
        },
        {
          type: 'number',
          position: 'left',
          title: {
            text: 'Total De Vente',
          },
          label: {
            formatter: (params) => {
              return params.value / 1 + 'DT';
            },
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };
   }

  ngOnInit(): void {

    this.dashBoardService.getBillsCount().subscribe(
      data =>{
        this.BillsCount = data.count 
       // console.log(this.BillsCount);
      }
    )
    this.dashBoardService.getCategoryCount().subscribe(
      data =>{
        this.categoryCount = data.count 
        //console.log(this.categoryCount);
      }
    )

    this.dashBoardService.getProductsCount().subscribe(
      data =>{
        this.productCount = data.count
        //console.log(this.productCount);
      }
    )

    this.dashBoardService.getCustomersCount().subscribe(
      data =>{
        this.customersCount = data.count
        //console.log(this.customersCount);
      }
    )

    this.dashBoardService.getSumOfSalesPerMonth().subscribe(
      data =>{
        this.statistic = data
        console.log('statistics per month for year 2022 :')
        console.log(this.statistic);
        for(let tempMonth of this.statistic){
          //console.log(tempMonth.created_at__month);
          //console.log(tempMonth.total_price);
        }
        this.createDataForChart()
        
      }
    )


    
   
  }
  createDataForChart() : VentePerMois [] {
    if(this.statistic){
      for(let tempMonth of this.statistic){
        console.log('statistic works like usual ')
        this.addToVentePerMois(tempMonth);
      }         
    }
    let result  = this.ventePerMois.map(({ mois }) => mois  )
    let resultV  = this.ventePerMois.map(({ vente }) => vente  )
    
    //console.log('the final data :')
    //console.log(result )
    //console.log(resultV )

    if(this.ventePerMois.length > 0){
      for (let ele of this.ventePerMois){
        //console.log('--------------------99999999------------')
        //console.log(`{ mois: ${ele.mois} , vente: ${ele.vente} }`);
        switch (ele.mois) {
          case this.janvier:
            this.v1 = ele.vente;
          break ;
          case this.fevrier:
            this.v2 = ele.vente ;
          break ;
          case this.mars:
            this.v3 = ele.vente;
          break ;
          case this.avril:
            this.v4 = ele.vente ;
           
          break ;
          case this.mai:
            this.v5 = ele.vente ;
          break ;
          case this.juin:
            this.v6 = ele.vente ;
          break ; 
          case this.Juillet:
            this.v7 = ele.vente ;
          break ; 
          case this.Aout:
            this.v8 = ele.vente ;
          break ; 
          case this.Septembre:
            this.v9 = ele.vente ;
          break ; 
          case this.Octobre:
            this.v10 = ele.vente ;
          break ; 
          case this.Novembre:
            this.v11 = ele.vente ;
          break ; 
          case this.Decembre:
            this.v12 = ele.vente ;
          break ; 
          

        }
      this.data  = [
        { mois: this.janvier, vente: this.v1},
        { mois: this.fevrier, vente: this.v2 },
        { mois: this.mars, vente: this.v3 },
        { mois: this.avril, vente: this.v4 },
        { mois: this.mai, vente: this.v5 },
        { mois: this.juin, vente: this.v6 },
        { mois: this.Juillet, vente: this.v7 },
        { mois: this.Aout, vente: this.v8 },
        { mois: this.Octobre, vente: this.v9 },
        { mois: this.Septembre, vente: this.v10 },
        { mois: this.Novembre, vente: this.v11 },
        { mois: this.Decembre, vente: this.v12 },
      ]
      }
      for(let ele of this.data){
       
          this.test.push(ele);
      }
    }
    console.log('after boucle For  :');
    console.log(this.data)
    console.log('-----------------------------');
    console.log(this.test);
    return this.test
    
  }
  

  addToVentePerMois(tempMonth: Statistic) {

    switch (tempMonth.created_at__month) {
      case 1:
        this.month = 'Janvier';
        this.totalVente = tempMonth.total_price;
        const vmItem1 = new VentePerMois(this.month, this.totalVente);
        
        this.ventePerMois.push(vmItem1);
      break ;
        
      case 2:
        this.month = 'Février';
        this.totalVente = tempMonth.total_price;
        const vmItem2 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem2);
      break ;
        
      case 3:
        this.month = 'Mars';
        this.totalVente = tempMonth.total_price;
        const vmItem3 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem3);
      break ;
        
      case 4:
        this.month = 'Avril';
        this.totalVente = tempMonth.total_price;
        const vmItem4 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem4);
      break ;
        
      case 5:
        this.month = 'Mai';
        this.totalVente = tempMonth.total_price;
        const vmItem5 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem5);
      break ;
      
      case 6:
        this.month = 'Juin';
        this.totalVente = tempMonth.total_price;
        const vmItem6 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem6);
      break ;
        
      case 7:
        this.month = 'Juillet';
        this.totalVente = tempMonth.total_price;
        const vmItem7 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem7);
      break;
        
      case 8:
        this.month = 'Aout';
        this.totalVente = tempMonth.total_price;
        const vmItem8 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem8);
      break ;
       
      case 9:
        this.month = 'Septembre';
        this.totalVente = tempMonth.total_price;
        const vmItem9 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem9);
      break ; 
        
      case 10:
        this.month = 'Octobre';
        this.totalVente = tempMonth.total_price;
        const vmItem10 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem10);
      break; 
        
      case 11:
        this.month = 'Novembre';
        this.totalVente = tempMonth.total_price;
        const vmItem11 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem11);
      break ; 
      case 12:
        this.month = 'Décembre';
        this.totalVente = tempMonth.total_price;
        const vmItem12 = new VentePerMois(this.month, this.totalVente);
        this.ventePerMois.push(vmItem12);
      break;
    }
  }


  
}

