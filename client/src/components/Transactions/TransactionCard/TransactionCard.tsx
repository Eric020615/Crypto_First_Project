import { shortenAddress } from '../../../utils/helper';
import useFetch from '../../../hooks/useFetch';

interface TransactionCard {
    addressTo: string;
    addressFrom: string;
    timestamp: string;
    message: string;
    keyword: string;
    amount: string;
    url: string;
}

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url} : TransactionCard) => {
    const gifUrl = useFetch({ keyword });
    
    return(
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[450px]
            2xl:max-w-[500px]
            sm:min-w-[270px]
            sm:max-w-[300px]
            flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://sepolia.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            From: { shortenAddress(addressFrom) }
                        </p>
                    </a>
                    <a href={`https://sepolia.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            To: { shortenAddress(addressTo) }
                        </p>
                    </a>
                    <p className='text-white text-base'>
                        Amount: {amount} ETH
                    </p>
                    {message && (
                        <>
                            <br/>
                            <p className='text-white text-base'>Message: {message}</p>
                        </>
                    )}
                    <img src={gifUrl || url} alt='gif' className='w-full h-64 2x:h-96 rounded-md shadow-lg object-cover mt-5'>
                    </img>
                    <div className='bg-black p-3 px-5 w-max rounded-3xl mt-5 shadow-2xl'>
                        <p className='text-[#37c7da] font-bold'>
                            {timestamp}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TransactionCard;