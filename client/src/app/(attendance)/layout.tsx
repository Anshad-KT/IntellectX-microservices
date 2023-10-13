import react, { ReactNode } from 'react'

const AttendanceLayout: React.FC<{children: ReactNode}> = ({children})=>{
    return(
        <div>
            
            {children}
        </div>
    )
}

export default AttendanceLayout