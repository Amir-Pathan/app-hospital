import {Component} from 'react'
import { Box } from '@mui/material'
import services from '../services/serveices'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'

const style={
  btn:{
    backgroundColor:'#000080',
    color:'white',
    borderRadius:'50px'
  },
  inlineFlex:{
    display:'inline-flex',
    justifyContent:'space-between',
    width:'100%'
  }
}




class Billing extends Component{

  patient:{patientName:string,patientAge:string,patientImg:string,patientNo:string,patientGender:string,id:string,bill:Array<{
    serviceNo:string,
    serviceName:string,
    price:string,
    qty:string
  }>}[]=[]

  total = 0;
 
  state={
    patients:this.patient,
    showPatientBillIndex:0,
    totalBill:0
  }

  componentDidMount(): void {
    
    services.getData('patients').then((res)=>{

      console.log(res);

      this.getTotalBill()
      

      this.setState({
        ...this.state,
        patients:res,
        totalBill:this.total
      })
      

    })


  }

  getTotalBill(){

    if(this.state.patients.length>0){

      this.state.patients[this.state.showPatientBillIndex].bill.forEach((i)=>{

        this.total =Number(i.price)*Number(i.qty)

      })

      console.log(this.total);
      

      this.total = this.total+100-50



    }

  }

  render(){

    const date = new Date()


    return(<>
    <Box>
      <h2>Billing Overview</h2>
    </Box>
    <Box sx={{display:'inline-flex',gap:'5px'}}>
      <Box sx={{width:'300px',display:'flex',flexDirection:'column',gap:'10px'}}>
        {
          this.state.patients.length>0?
          this.state.patients.map((i,index)=>{

            return <Card sx={{display:'flex',flexDirection:'row',paddingLeft:'5px',paddingTop:'5px',cursor:'pointer'}} 
            onClick={()=>{

              this.getTotalBill()

              this.setState({
                ...this.state,
                showPatientBillIndex:index,
                totalBill:this.total
              })

            }}
            style={this.state.showPatientBillIndex===index?{
              backgroundColor:'white'
            }:{
              backgroundColor:'#e6f1fd'
            }}
            key={index}>
            <Box>
              <img src={i.patientImg} style={{ width:'80px',borderRadius:'5px'}} alt="" />
            </Box>
            <Box sx={{marginLeft:'5px'}}>
              <Typography sx={{fontWeight:'bold',fontSize:'17px'}}>{i.patientName}</Typography>
              <Box sx={style.inlineFlex}>
                <Typography sx={{fontWeight:'bold',fontSize:'17px'}}>{i.patientAge} ,</Typography>
                <Typography sx={{fontWeight:'bold',fontSize:'17px'}}>{i.patientGender}</Typography>
              </Box><br />
              {
                  this.state.showPatientBillIndex===index?
                  <Button sx={{borderRadius:'10px',color:'#000080',borderColor:'2px solid #000080'}} variant='outlined'>View Priscription</Button>:
                  <Typography sx={{fontWeight:'bold',fontSize:'12px'}}>Bill NO :{i.id}</Typography>
                }
            </Box>
          </Card>

          }):null
        }
      </Box>
      {
        this.state.patients.length>0?
      <Box sx={{width:'800px',height:'100%',backgroundColor:'white',borderRadius:'10px'}}>
        <Box sx={{paddingTop:'25px',paddingBottom:'5px',width:'780px',
        marginLeft:'10px',marginTop:'10px',marginRight:'10px',
        border:'2px solid #000080',borderRadius:'5px'}}>
          <Box sx={style.inlineFlex}>
            <Typography variant='h6'>Billing Details</Typography>
            <Button style={style.btn}>Print Bill</Button>
          </Box>
          <Box sx={{width:'100%',display:'inline-flex',justifyContent:"space-evenly",
        backgroundColor:'whitesmoke',paddingTop:'10px'}}>
              <Box sx={{width:'100px'}}>
                <Typography >Patient Name</Typography>
                <Typography textAlign={'center'} color={'grey'} variant='h6'>{this.state.patients[this.state.showPatientBillIndex].patientName}</Typography>
              </Box>
              <Box sx={{width:'100px'}}>
                <Typography >Age/Gender</Typography>
                <Typography textAlign={'center'} color={'grey'} variant='h6'>{this.state.patients[this.state.showPatientBillIndex].patientAge}/
                {this.state.patients[this.state.showPatientBillIndex].patientGender}
                </Typography>
              </Box>
              <Box sx={{width:'100px'}}>
                <Typography >Bill No</Typography>
                <Typography textAlign={'center'} color={'grey'} variant='h6'>{this.state.showPatientBillIndex}</Typography>
              </Box>
              <Box sx={{width:'100px'}}>
                <Typography >Date Time</Typography>
                <Typography textAlign={'center'} color={'grey'} variant='h6'>{
                   date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+date.getHours()+'-'+date.getMinutes()
                }</Typography>
              </Box>
          </Box>
          <Box sx={style.inlineFlex}>
            <Box sx={{display:'inline-flex',gap:'10px'}}>
              <Typography variant='h6' textAlign={'center'}>Sr.No</Typography>
              <Typography variant='h6' textAlign={'center'}>Service Name</Typography>
            </Box>
            <Box sx={{display:'inline-flex',gap:'10px'}}>
              <Typography variant='h6' textAlign={'center'}>Price</Typography>
              <Typography variant='h6' textAlign={'center'}>Quantity</Typography>
              <Typography variant='h6' textAlign={'center'}>Amount</Typography>
            </Box>
          </Box>
          <Divider/>
          <Box>
            {
              this.state.patients.length>0?
                this.state.patients[this.state.showPatientBillIndex].bill.map((i,index)=>{

                      return <Box sx={style.inlineFlex}
                      key={index}>
                        <Box sx={{display:'inline-flex',gap:'10px'}}>
                          <Typography variant='h6' textAlign={'center'}>{index+1}</Typography>
                          <Typography variant='h6' textAlign={'center'}>{i.serviceName}</Typography>
                        </Box>
                        <Box sx={{display:'inline-flex',gap:'10px'}}>
                          <Typography variant='h6' textAlign={'center'}>{i.price}</Typography>
                           <Typography variant='h6' textAlign={'center'}>{i.qty}</Typography>
                          <Typography variant='h6' textAlign={'center'}>{Number(i.price)*Number(i.qty)}</Typography>
                      </Box>
                      </Box>

                })
              :null
            }
          </Box>
          <Box sx={{marginTop:'100px',backgroundColor:'whitesmoke'}}>
            <Box style={style.inlineFlex}>
              <Typography>Mobile Number</Typography>
              <Typography>{this.state.patients[this.state.showPatientBillIndex].patientNo}</Typography>
            </Box>
            <Box style={style.inlineFlex}>
              <Typography>Tax</Typography>
              <Typography>100</Typography>
            </Box>
            <Box style={style.inlineFlex}>
              <Typography>Discount</Typography>
              <Typography>50</Typography>
            </Box>
            <Divider/>
            <Box style={style.inlineFlex}>
              <Typography>Total</Typography>
              <Typography>{this.state.totalBill}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>:null
  }
    </Box>
    </>)


  }

}

export default Billing