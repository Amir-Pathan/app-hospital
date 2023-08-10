import { Box,Typography } from "@mui/material"

type CustomerProps={
  patientName:string,
  patientAge:String,
  patientGender:string,
  patientNo:string
}

function Customer(props:CustomerProps){

  return(
    <Box sx={{display:'inline-flex',justifyContent:'space-evenly',width:'100%'}}>
      <Typography variant="h6" textAlign={'center'}>{props.patientName}</Typography>
      <Typography variant="h6" textAlign={'center'}>{props.patientGender}</Typography>
      <Typography variant="h6" textAlign={'center'}>{props.patientAge}</Typography>
      <Typography variant="h6" textAlign={'center'}>{props.patientNo}</Typography>
    </Box>
  )

}


export default Customer