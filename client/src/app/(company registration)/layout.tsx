import react, { ReactNode } from 'react'

const RegistrationLayout: React.FC<{children: ReactNode}> = ({children})=>{
    return(
        <div>
            
            {children}
        </div>
    )
}

export default RegistrationLayout