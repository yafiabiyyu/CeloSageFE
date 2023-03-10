import { useCall, useContractFunction,  } from "@usedapp/core";
import { constants, ethers } from "ethers";
import { escrowContract } from "./contract";


export function useCreateEscrow() {
    const { state, send } = useContractFunction(escrowContract, "createEscrow");
    const create = send;
    const successCreate = state.status === "Success";
    const errorCreate = state.status === "Fail" || state.status === "Exception";
    return {
        create,
        successCreate,
        errorCreate,
    };
}

export function usePayEscrow() {
    const { state, send } = useContractFunction(escrowContract, "payEscrow");
    const pay = send;
    const successPay = state.status === "Success";
    const errorPay = state.status === "Fail" || state.status === "Exception";
    return {
        pay,
        successPay,
        errorPay,
    };
}

export function useCancleEscrow() {
    const { state, send } = useContractFunction(escrowContract, "cancleEscrow");
    const cancle = send;
    const successCancle = state.status === "Success";
    const errorCancle = state.status === "Fail" || state.status === "Exception";
    return {
        cancle,
        successCancle,
        errorCancle,
    };
}

export function useRejectEscrow(){
    const { state, send } = useContractFunction(escrowContract, "rejectEscrow");
    const reject = send;
    const successReject = state.status === "Success";
    const errorReject = state.status === "Fail" || state.status === "Exception";
    return {
        reject,
        successReject,
        errorReject
    };
}

export function useGetTxId(seller: string | undefined, buyer: string, nftAddress: string, secret: string) {
    const test = ethers.utils.formatBytes32String(Math.random().toString())
    const { value, error } = useCall(
        seller && buyer && nftAddress && secret &&{
            contract: escrowContract,
            method: "generateTxId",
            args:[seller, buyer, nftAddress, secret],
        }
    ) ?? {};
    if(error) {
        console.error(error.message);
        return "Error";
    }
    // console.log();
    return value?.[0].toString();
}

export function useOrderData(escrowId:string) {
    const { value, error } = useCall(
        escrowId && {
            contract: escrowContract,
            method: "escrow",
            args: [escrowId]
        }
    )?? {};
    if(error) {
        return "Error";
    }
    if(value?.[3] === constants.AddressZero){
        return "Null"
    }else {
        return value;
    }
}