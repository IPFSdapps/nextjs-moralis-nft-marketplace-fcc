import { Form, useNotification } from "web3uikit"
import { ethers } from "ethers"
import { useMoralis, useWeb3Contract } from "react-moralis"
import nftAbi from "../constants/BasicNft.json"
import NftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"

const sellNft = () => {
    const { chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace.at(0)

    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()

    const approveAndList = async (formData) => {
        console.log("Approving...")
        const nftAddress = formData.data.at(0).inputResult
        const tokenId = formData.data.at(1).inputResult
        const price = ethers.utils.parseUnits(formData.data.at(2).inputResult, "ether").toString()

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: handleApproveSuccess(nftAddress, tokenId, price),
            onError: (e) => console.error(e),
        })
    }

    const handleApproveSuccess = async (nftAddress, tokenId, price) => {
        console.log("Listing NFT")

        const listOptions = {
            abi: NftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress,
                tokenId,
                price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: handleListSuccess,
            onError: (e) => console.error(e),
        })
    }

    const handleListSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "NFT listed!",
            title: "NFT listed!",
            position: "topR",
        })
    }
    return (
        <div>
            <Form
                onSubmit={approveAndList}
                data={[
                    {
                        name: "NFT Address",
                        type: "text",
                        value: "",
                        key: "nftAddress",
                    },
                    {
                        name: "Token ID",
                        type: "number",
                        value: "",
                        key: "tokenId",
                    },
                    {
                        name: "Price (in ETH)",
                        type: "number",
                        value: "",
                        key: "price",
                    },
                ]}
                title="Sell your NFT 🔮"
                id="main-form"
            />
        </div>
    )
}

export default sellNft
