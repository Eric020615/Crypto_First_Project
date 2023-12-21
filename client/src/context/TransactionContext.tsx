// for transferring data throughtout the app
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constant';
import { TransactionInput } from '../utils/model';

interface WindowWithEthereum extends Window{
    ethereum?: {
        isMetaMask?: boolean,
        request: (args: {method: string; params?: any[]}) => Promise<any>
    }
}

interface TransactionContextInterface{
    connectWallet: () => {},
    currentAccount: string,
    formData: TransactionInput,
    setFormData: Dispatch<SetStateAction<TransactionInput>>,
    handleChange: any,
    sendTransaction: () => void,
    transaction: TransactionInterface[],
    isLoading: boolean
}

interface TransactionInterface{
    sender: string;
    receiver: string;
    amount: number;
    message: string;
    timestamp: string;
    keyword: string;
}

export const TransactionContext = React.createContext<Partial<TransactionContextInterface>>({});

const { ethereum } : WindowWithEthereum = window;

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum as any);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children } : any) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [transaction, setTransaction] = useState<TransactionInterface[]>();
    const [formData, setFormData] = useState<TransactionInput>({
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e: any, name: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const transactionContract = await getEthereumContract();
            const transactions  = await transactionContract.getAllTransactions();
            const structuredTransaction : TransactionInterface[] = transactions.map((x: any) => {
                const sender = x.sender;
                const receiver = x.receiver;
                const amount = parseInt(x.amount) / (10 ** 18);
                const message = x.message;
                const timestamp = new Date(parseInt(x.timestamp) * 1000).toLocaleString();
                const keyword = x.keyword;

                return {
                    sender,
                    receiver,
                    amount,
                    message,
                    timestamp,
                    keyword,
                };
            });
            setTransaction(structuredTransaction);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
        
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            
            if(accounts.length){
                // at the start of the single task run this function called
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }
            else{
                console.log('No accounts found');
            }
        }
        catch(error){
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = await getEthereumContract();
            const transactionCount = await transactionContract.getAllTransactionCount();
            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        }
        catch(error){
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try{
            if(!ethereum) return alert("Please install metamask");
            // get data from form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = await getEthereumContract();
            const parsedAmount = ethers.parseEther(amount);

            // send eth from one acc to another acc
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: parsedAmount.toString(16) // 0.00001 need to be in hex
                }]
            });
            
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getAllTransactionCount();
            setTransactionCount(transactionCount);
        }
        catch(error){
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    // run at the beginning when the context is called
    useEffect(() =>{
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, [transactionCount]);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transaction, isLoading }}>
            { children }
        </TransactionContext.Provider>
    )
}