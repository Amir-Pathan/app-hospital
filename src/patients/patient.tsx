import {useEffect, useState} from 'react'
import services from '../services/serveices'
import { Paper,Box } from '@mui/material'
import Customer from '../customerDetails'


type PatienstProps={
  type:string
}

function Patients(props:PatienstProps){

  const [patientsList,setPatientsList]= useState<{
    patientName:string, 
    patientAge:string,
    patientGender:string,
    patientNo:string
  }[]>([])

  useEffect(()=>{

    services.getData(props.type).then((res:any)=>{

      setPatientsList(res)

    })

  },[props.type])

  return(
    <>
    <h1>{props.type}</h1>
    <Box sx={{display:"inline-flex",flexDirection:'column',gap:'5px',width:'100%'}}>
    {
       patientsList.length>0?
       patientsList.map((i,index)=>{

        return <Paper key={index}>
          <Customer patientName={i.patientName}
          patientGender={i.patientGender}
          patientNo={i.patientNo}
          patientAge={i.patientAge}
          />
        </Paper>

       })
       :null
    }
    </Box>
    </>
  )

}

export default Patients