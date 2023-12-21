import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import ServiceCard from './ServiceCard';

const Services = () =>{
    return(
        <div className='flex w-full justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 md:gap-0 gap-5'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                    <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
                        Services that we 
                        <br/> 
                        continue to improve
                    </h1>
                </div>
                <div className='flex-1 flex flex-col justify-start items-center'>
                    <ServiceCard 
                        color="bg-[#2952e3]" 
                        title="Security Guaranteed"
                        icon={<BsShieldFillCheck fontSize={21} className="text-white"></BsShieldFillCheck>}
                        subtitle="Security is guaranteed. We always maintain privacy and the quality of our products.">
                    </ServiceCard>
                    <ServiceCard 
                        color="bg-[#8945f8]" 
                        title="Best Exchange Rates"
                        icon={<BiSearchAlt fontSize={21} className="text-white"></BiSearchAlt>}
                        subtitle="Security is guaranteed. We always maintain privacy and the quality of our products.">
                    </ServiceCard>
                    <ServiceCard 
                        color="bg-[#F84550]" 
                        title="Fastest Transactions"
                        icon={<RiHeart2Fill fontSize={21} className="text-white"></RiHeart2Fill>}
                        subtitle="Security is guaranteed. We always maintain privacy and the quality of our products.">
                    </ServiceCard>
                </div>
            </div>
        </div>
    )
}

export default Services;