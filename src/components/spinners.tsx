import { ClipLoader } from 'react-spinners'

const override={
    display:'block',
    margin:'100px auto'
}
interface spinnerProps{
    loading:boolean
}
const spinners = ({loading}:spinnerProps) => {
  return (
    <ClipLoader
     color='#013D27'
     loading={loading}
     cssOverride={override}
     size={150}
    />
  )
}

export default spinners