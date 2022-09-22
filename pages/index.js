import { list } from "postcss"
import { useMoralisQuery } from "react-moralis"

export default function Home() {
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )

    console.log("Listed Nfts: ", listedNfts)
    return (
        <div>
            {fetchingListedNfts ? (
                <div>Loading...</div>
            ) : (
                listedNfts.map((nft) => {
                    const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                        nft.attributes

                    return (
                        <div>
                            Price: {price} . NftAddress: {nftAddress}. TokenId: {tokenId}. Seller:{" "}
                            {seller}. Marketplace Address: {marketplaceAddress}
                        </div>
                    )
                })
            )}
            Home Page
        </div>
    )
}
