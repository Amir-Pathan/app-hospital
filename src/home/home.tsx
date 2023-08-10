import {useRef} from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton, TextField, Typography } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import GridViewIcon from '@mui/icons-material/GridView';
import AccessibleIcon from '@mui/icons-material/Accessible';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SupportIcon from '@mui/icons-material/Support';
import SettingsIcon from '@mui/icons-material/Settings';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Input from '@mui/material';
import Billing from '../billingpage';
import BasicModal from '../lib/modal';
import { useState } from 'react';
import services from '../services/serveices';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Dashboard from '../dashboard';
import Patients from '../patients';

const style={
  btn:{
    backgroundColor:'#000080',
    color:'white',
    borderRadius:'50px'
  }
}


const firstListItem=[
  {
    title:'Dashboard',
    icon:<GridViewIcon/>
  },
  {
    title:'Patient',
    icon:<AccessibleIcon/>
  },
  {
    title:'AppointMent',
    icon:<CalendarMonthIcon/>
  },
  {
    title:'Billing',
    icon:<CreditScoreIcon/>
  },
]

const secoundItemList=[
  {
    title:'Support',
    icon:<SupportIcon/>
  },
  {
    title:'Setting',
    icon:<SettingsIcon/>
  },
]


function Home(){


  const initialObj ={
    patientName:'',
    patientAge:'',
    patientNo:'',
    patientGender:'Male',
    bill:[],
    patientImg:''
  }


  const [patient,setPatient] = useState(initialObj)

  const ref = useRef<any>(null)

  const [openModal,setOpenModal] = useState(false)

  const [addType,setAddType] = useState('')

  const [currentComp,setCurrentComp] = useState('Dashboard')

  const [comp,setComp] = useState(<Dashboard/>)

  const closeModal=()=>{

    setAddType('')

    setOpenModal(false)

  }


  const patientHandleChange=(key:string,value:any)=>{

    setPatient(prev=>({
      ...prev,
      [key]:value
  }))

  }

  const handleRef=()=>{
    console.log('ref');
    ref.current.click()
}


  const addPatient=()=>{

    if(patient.patientName.length<1||patient.patientAge.length<1||patient.patientNo.length!==10||patient.patientImg.length<1){

      alert('Please Enter Valid Details ')

      return

    }

     let collectName= addType==="Add patient"?'patients':'appointments'

     services.addData(collectName,patient).then((res)=>{


      setPatient(initialObj)

      setOpenModal(false)

      setAddType('')

      alert('Add successfully')

     }).catch((err)=>{

      alert('something gone wrong try again')

     })


  }

  const setComponent=(c:string)=>{

     switch(c){

      case 'Billing':
        setComp(<Billing/>)
        break;
      case 'Patient':
        setComp(<Patients type='patients'/>)
        break;
      case 'AppointMent':
         setComp(<Patients type='appointments'/>)
      break;
      default :
         setComp(<Dashboard/>)
     }

     setCurrentComp(c)

  }

  const handleImg=(e:any)=>{

       services.uploadImage(e.target.files[0]).then((res)=>{

        patientHandleChange('patientImg',res)

       }).catch((err)=>{

        console.log(err);

       })

    }

  return(

    <>
      <Drawer 
      anchor='left'
      open={true}
      variant='permanent'
      PaperProps={{
        sx:{backgroundColor:'#000080',borderTopRightRadius:'-15px',color:'white'}
      }}
      >
         <Box
          sx={{ width: 250,height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}
          role="presentation"
         >
          <List>
              <Typography variant='h5' textAlign='center' style={{marginTop:'15px',marginBottom:'5px'}}>JJ Hospital</Typography>
              {
                firstListItem.map((i,index)=>{

                  const btnColor = currentComp===i.title?'pink':'none'

                  return <ListItem key={index}>
                    <Button fullWidth startIcon={i.icon} sx={{color:'white',paddingLeft:'20px',backgroundColor:btnColor}}
                    onClick={()=>setComponent(i.title)}
                    >  {i.title}</Button>
                  </ListItem>

                })
              }
          </List>
          <List>
            {
              secoundItemList.map((i,index)=>{
                return <ListItem key={index}>
                    <Button fullWidth startIcon={i.icon} sx={{color:'white',paddingLeft:'20px'}}>  {i.title}</Button>
                  </ListItem>
              })
            }
          </List>
         </Box>
      </Drawer>
      <Box  sx={{marginLeft:'255px',marginTop:'15px'}}>
        <Box sx={{display:'flex',flexDirection:'row',gap:'10px'}}>
          <TextField fullWidth size='small'
          style={{borderRadius:'50px',width:'60%'}}
          label="Search Patient"
          />
          <Button style={style.btn} 
          onClick={()=>{
            setAddType('Make An A Appointment')
            setOpenModal(true)
          }}
          >Make An Appointment</Button>
          <Button style={style.btn}
          onClick={()=>{
            setAddType('Add patient')
            setOpenModal(true)
          }}
          >Add Patient</Button>
          <IconButton style={style.btn}>
            <CircleNotificationsIcon />
          </IconButton>
        </Box>
        <Box>
          {
            comp
          }
        </Box>
      </Box>
      <BasicModal 
      open={openModal}
      modalClose={closeModal}
      >
        <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
        <Typography variant='h6' textAlign={'center'}>{addType}</Typography>
        <input type="file" accept='image/*'
        ref={ref}
        style={{display:'none'}}
        onChange={handleImg}
        />
        <img src={patient.patientImg} style={{width:'80px'}} alt="" />
        <Button 
        onClick={handleRef}
        style={style.btn}
        >Upload Image</Button>
        <TextField 
        size='small'
        variant='outlined'
        fullWidth
        label='Patient Name'
        value={patient.patientName}
        onChange={(e)=>{
          patientHandleChange('patientName',e.target.value)
        }}
        />
        <TextField 
        size='small'
        variant='outlined'
        fullWidth
        label='Patient age'
        type='number'
        value={patient.patientAge}
        onChange={(e)=>{
          patientHandleChange('patientAge',e.target.value)
        }}
        />
        <TextField 
        size='small'
        variant='outlined'
        fullWidth
        label='Patient Number'
        type='number'
        value={patient.patientNo}
        onChange={(e)=>{
          patientHandleChange('patientNo',e.target.value)
        }}
        />
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={patient.patientGender}
        onChange={(e)=>{
          patientHandleChange('patientGender',e.target.value)
        }}
      >
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
    <Box sx={{display:'flex',flexDirection:'row',gap:'5px'}}>
      <Button fullWidth style={style.btn} 
      onClick={closeModal}
      >Cancel</Button>
      <Button fullWidth style={style.btn} 
      onClick={addPatient}
      >Save</Button>
    </Box>
        </Box>
      </BasicModal>
      
    </>

  )

}

export default Home