import UserProtectedRouter from '@/utils/protectedRoute'
import react, { ReactNode } from 'react'

const CommunicationLayout: React.FC<{children: ReactNode}> = ({children})=>{
    return(
        <div>
            <UserProtectedRouter>
            {children}
            </UserProtectedRouter>
            
        </div>
    )
}

export default CommunicationLayout