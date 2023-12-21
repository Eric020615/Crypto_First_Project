import React, { useContext } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import dummyData from '../../utils/dummyData';
import { shortenAddress } from '../../utils/helper';
import TransactionCard from './TransactionCard/TransactionCard';

const Transactions = () =>{
    const { currentAccount, transaction } = useContext(TransactionContext);
    return(
        <div className='flex flex-col w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
            <div className='flex flex-col md:p-12 py-12 px-4'>
                {currentAccount ? (
                    <h3 className='text-white text-3xl text-center my-2'>Latest Transaction</h3>
                ) : (
                    <h3 className='text-white text-3xl text-center my-2'>Connect your account to see the latest transactions</h3>
                )}
            </div>
            <div className='flex flex-wrap justify-center items-center mt-10'>
                { transaction && transaction.reverse().map((data, i) => (
                    <TransactionCard key={i} addressFrom = {data.receiver} 
                    addressTo = {data.sender} timestamp={data.timestamp} url={data.keyword}
                    keyword={data.keyword} message={data.message} amount={data.amount.toString()}
                    
                    ></TransactionCard>
                )) }
            </div>
        </div>
    )
}

export default Transactions;