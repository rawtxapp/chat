export default interface Message {
    nickname: string;
    settled: boolean;
    message: string;
    invoice: string;
    withMicro: boolean;
};