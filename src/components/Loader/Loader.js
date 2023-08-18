import {RotatingLines
} from  'react-loader-spinner'

export const Loader = ({isLoading}) => {
    if(isLoading){
         return (
        <div>
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            />  
        </div>
       
    );
    } 
   return null;
};
