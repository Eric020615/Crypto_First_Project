export interface TransactionInput{
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
}

export interface Transaction{
    sender: string;
    receiver: string;
    amount: number;
    message: string;
    timestamp: number;
    keyword: string;
}